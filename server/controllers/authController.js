import { authService } from '../services/authService.js';
export const register=async(req,res)=>res.status(201).json({success:true,data:await authService.register(req.body)});
export const login=async(req,res)=>res.json({success:true,data:await authService.login(req.body)});
