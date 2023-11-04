import mssql, { pool, RequestError } from 'mssql'
import { sqlConfig } from '../config/sqlConfig';
import { projectUserSchema, projectUserSchema2, taskValidator } from '../dbhelpers/projectValidator';
import { customProject, Project } from '../interfaces/project';
import { Response } from 'express';
import {ExtendedEmployee} from '../middleware/verifyToken';
import {Employee} from '../interfaces/employee';

/**
 * 
 * @param req - Request as customProject
 * @param res - Request as Response
 * @returns 
 */
export const createProject = async (req: customProject, res: Response) => {
    try {
        const { projectName, description, endDate, userId } = req.body;

        const { error, value } = taskValidator.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        const pool = await mssql.connect(sqlConfig);
        if (pool.connected) {
            console.info("db connected");
        }

        const request = pool.request();
        request.input('projectName', mssql.VarChar, projectName);
        request.input('description', mssql.VarChar, description);
        request.input('deadline', mssql.VarChar, endDate);
        request.input('userId', mssql.VarChar, userId);

        
        await request.query('INSERT INTO Projects (projectName, description, deadline, userId, status) VALUES (@projectName, @description, @deadline, @userId, 0)');

        return res.json({ message: "Project created successfully..." });
    } catch (error) {
        if (error instanceof RequestError) {
            return res.status(404).json({
                message: 'Project Exists.'
            });
        }

        return res.status(500).json({
            message: 'Internal Server Error.'
        });
    }
};
//=========DELETING PROJECTS ===============//
/**
 * 
 * @param req as customproject
 * @param res as response
 * @returns deletes projects.
 */

export const projectDelete = async (req: customProject, res: Response) => {
    try {
        const { projectId } = req.body;

        const pool = await mssql.connect(sqlConfig);
        const request = pool.request();

        
        request.input('projectId', mssql.Int, projectId);

        
        await request.query('DELETE FROM Projects WHERE projectId = @projectId');

        return res.json({ message: `Project ${projectId} deleted` });
    } catch (error) {
        if (error instanceof mssql.RequestError) {
            return res.status(404).json({
                message: 'No project with that ID.'
            });
        } else {
            return res.status(500).json({
                message: 'Internal Server Error.'
            });
        }
    }
};

export const projectAssign = async (req: customProject, res: Response) => {
    try {
        const { projectId, userId } = req.body;

        const { error, value } = projectUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        const pool = await mssql.connect(sqlConfig);
        const request = pool.request();

        
        request.input('projectId', mssql.Int, projectId);
        request.input('userId', mssql.Int, userId);

       
        await request.query('UPDATE Projects SET userId = @userId WHERE projectId = @projectId');

        return res.json({ message: `User ${userId} assigned to project ${projectId}` });
    } catch (error) {
        if (error instanceof mssql.RequestError) {
            return res.status(400).json({
                message: 'Error assigning project to user.'
            });
        } else {
            return res.status(500).json({
                message: 'Internal Server Error.'
            });
        }
    }
};


export const homePage = async (req: ExtendedEmployee, res: Response) => {
    try {
        if (req.info) {
            return res.status(200).json({ message: 'Welcome to the homepage' });
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const checkUserRole = async (req: ExtendedEmployee, res: Response) => {
    try {
        if (req.info) {
            const { email, role, employee_id } = req.info; 

            return res.status(200).json({ email, role, employee_id });
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const pendingProjects = async (req: customProject, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);

        
        const result = await pool.request().query('SELECT * FROM Projects WHERE status = 0'); // Assuming status 0 represents pending projects

        const projects = result.recordset; 

        return res.status(200).json({ projects });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



export const completeProjects = async (req: customProject, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);

        
        const result = await pool.request().query('SELECT * FROM Projects WHERE status = 1'); // Assuming status 1 represents completed projects

        const projects = result.recordset; 

        return res.status(200).json({ projects });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
