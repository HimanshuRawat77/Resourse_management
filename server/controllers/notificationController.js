import { notificationService } from '../services/notificationService.js';
export const list=async(req,res)=>res.json({success:true,data:await notificationService.list(req.user.id)});
export const markRead=async(req,res)=>{await notificationService.markRead(Number(req.params.id),req.user.id);res.json({success:true,message:'Notification marked as read.'});};
