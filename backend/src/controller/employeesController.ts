import { Request, Response } from 'express'
import mssql from 'mssql'
import {v4} from 'uuid'
import bcrypt from 'bcrypt'
import { sqlConfig } from '../config/sqlConfig'
import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv'
import { LoginEmployee } from '../interfaces/employee'
import { ExtendedEmployee } from '../middleware/verifyToken'
import Connection from '../dbhelpers/dbhelpers'

const dbhelper = new Connection

export const registerEmployee = async(req:Request, res: Response) =>{
    try {
        let {name, email, password} = req.body

        let employee_id = v4()

        const hashedPwd = await bcrypt.hash(password, 5)

        const pool = await mssql.connect(sqlConfig)

        // let result = await pool.request()
        // .input("employee_id", mssql.VarChar, employee_id) 
        // .input("name", mssql.VarChar, name)
        // .input("email", mssql.VarChar, email)

        // .input("password", mssql.VarChar, hashedPwd)
        // .execute('registerEmployee')
        
        let result = dbhelper.execute('registerEmployee', {
            employee_id, name, email,password: hashedPwd
        })
        

        return res.status(200).json({
            message: 'Employee registered successfully'
        })
        
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export const loginEmployee = async(req:Request, res: Response) =>{
    try {
        const {email, password} = req.body

        const pool = await mssql.connect(sqlConfig)

        let user = await (await pool.request().input("email", email).input("password", password).execute('loginEmployee')).recordset
        
        if(user[0]?.email  == email){
            const CorrectPwd = await bcrypt.compare(password, user[0]?.password)

            if(!CorrectPwd){
                return res.status(401).json({
                    message: "Incorrect password"
                })
            }

            const LoginCredentials = user.map(records =>{
                const { ...rest}=records

                return rest
            })

            console.log(LoginCredentials);

            // dotenv.config()
            const token = jwt.sign(LoginCredentials[0], process.env.SECRET as string, {
                expiresIn: '1hr'
            })

            return res.status(200).json({
                message: "Logged in successfully", token
            })
            
        }else{
            return res.json({
                message: "Email not found"
            })
        }

    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export const getAllEmployees = async(req:Request, res:Response)=>{
    try {

        const pool = await mssql.connect(sqlConfig)

        let employees = (await pool.request().execute('fetchAllEmployees')).recordset
        // let employees = (await pool.request().query('SELECT * FROM Employees')).recordset

        return res.status(200).json({
            employees: employees
        })
        
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export const checkUserDetails = async (req:ExtendedEmployee, res:Response)=>{
    
    if(req.info){


        return res.json({
            info: req.info
        })
    }
}

export const viewAssignedProjects = async (req: ExtendedEmployee, res: Response) => {
    try {
        
        const userId = req.info?.employee_id;

        const pool = await mssql.connect(sqlConfig);

       
        const result = await pool.request()
            .input('userId', mssql.Int, userId)
            .query('SELECT * FROM Projects WHERE userId = @userId');

        const assignedProjects = result.recordset;

        if (assignedProjects.length === 0) {
            return res.status(404).json({ message: 'No projects assigned' });
        }

        return res.status(200).json({ assignedProjects });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



export const assignProject = async (req: Request, res: Response) => {
    try {
        // Assuming the project ID and user ID are sent in the request body
        const { projectId, userId } = req.body;

        // Call the service function to assign the project to the user
        const assignmentResult = await assignProject(userId, projectId);

        if (assignmentResult) {
            return res.status(200).json({ message: 'Project assigned successfully' });
        } else {
            return res.status(404).json({ message: 'Project or user not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to assign project' });
    }
};




export const updateProjectCompletion = async (req: ExtendedEmployee, res: Response) => {
    try {
        const projectId = req.body.projectId; // Assuming projectId is sent in the request body
        const completed = req.body.completed; // Assuming completed status is sent in the request body

        if (!projectId || completed === undefined) {
            return res.status(400).json({ message: 'Invalid request. Project ID or completion status missing.' });
        }

        const pool = await mssql.connect(sqlConfig);

        // Update the project completion status in the database
        const result = await pool.request()
            .input('projectId', mssql.Int, projectId)
            .input('completed', mssql.Bit, completed)
            .query('UPDATE Projects SET completed = @completed WHERE projectId = @projectId');

        if (result.rowsAffected && result.rowsAffected[0] > 0) {
            if (completed) {
                // Notify the admin on project completion via email
                const adminEmail = 'admin@example.com'; // Replace with actual admin email
                const emailContent = `The project with ID ${projectId} has been completed.`;

                // Code to send an email to the admin
                // You might use a service or library to send the email
                // emailService.sendEmail(adminEmail, 'Project Completion Notification', emailContent);
            }

            return res.status(200).json({ message: 'Project completion status updated.' });
        } else {
            return res.status(404).json({ message: 'Project not found or update failed.' });
        }
    } catch (error) {
        console.error('Error: ', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
