import { Router } from "express";
import { checkUserDetails, getAllEmployees, loginEmployee, registerEmployee, viewAssignedProjects, assignProject, updateProjectCompletion } from "../controller/employeesController";
import { verifyToken } from "../middleware/verifyToken";

const employee_router = Router();

employee_router.post('/register', registerEmployee);
employee_router.post('/login', loginEmployee);
employee_router.get('/', verifyToken, getAllEmployees);
employee_router.post('/setDone',updateProjectCompletion)
employee_router.get('/check_user_details', verifyToken, checkUserDetails);
employee_router.get('/assigned-projects', verifyToken, viewAssignedProjects);
employee_router.put('/projects/:projectId/complete', verifyToken, updateProjectCompletion); 

// Additional routes for managing projects
// employee_router.post('/assign-project', verifyToken, assignProject); 


export default employee_router;
