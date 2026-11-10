import { bookingService } from '../services/bookingService.js';
export const check=async(req,res)=>res.json({success:true,data:await bookingService.check(req.body)});
export const create=async(req,res)=>res.status(201).json({success:true,data:await bookingService.create(req.user.id,req.body)});
export const mine=async(req,res)=>res.json({success:true,data:await bookingService.myBookings(req.user.id)});
export const cancel=async(req,res)=>res.json({success:true,data:await bookingService.cancel(Number(req.params.id),req.user.id)});
export const all=async(_req,res)=>res.json({success:true,data:await bookingService.all()});
export const approve=async(req,res)=>res.json({success:true,data:await bookingService.decide(Number(req.params.id),'APPROVED')});
export const reject=async(req,res)=>res.json({success:true,data:await bookingService.decide(Number(req.params.id),'REJECTED')});
