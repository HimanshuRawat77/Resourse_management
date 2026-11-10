import { resourceService } from '../services/resourceService.js';
export const list=async(_req,res)=>res.json({success:true,data:await resourceService.list()});
export const get=async(req,res)=>res.json({success:true,data:await resourceService.get(Number(req.params.id))});
export const schedule=async(req,res)=>{const data=await resourceService.schedule(Number(req.params.id),req.query.date);res.json({success:true,...data});};
export const create=async(req,res)=>res.status(201).json({success:true,data:await resourceService.save(req.body)});
export const update=async(req,res)=>res.json({success:true,data:await resourceService.save(req.body,Number(req.params.id))});
export const remove=async(req,res)=>{await resourceService.remove(Number(req.params.id));res.json({success:true,message:'Resource deleted.'});};
