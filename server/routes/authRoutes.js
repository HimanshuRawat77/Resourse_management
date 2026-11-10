import { Router } from 'express'; import { login,register } from '../controllers/authController.js'; import { asyncHandler } from '../utils/errors.js';
const r=Router(); r.post('/register',asyncHandler(register)); r.post('/login',asyncHandler(login)); export default r;
