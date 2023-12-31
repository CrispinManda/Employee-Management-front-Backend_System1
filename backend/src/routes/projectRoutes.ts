import { Router } from "express";
import { checkUserRole, completeProjects, createProject, pendingProjects, projectAssign, projectDelete } from "../controller/projectController";
import { verifyToken } from "../middleware/verifyToken";

const router = Router()

router.post('/create', createProject)
router.post('/delete', projectDelete)
router.post('/assignProject',verifyToken, projectAssign)
router.get('/check', verifyToken, checkUserRole)
router.post('/pendingProjects', pendingProjects)
router.post('/completeProjects', completeProjects)


export default router