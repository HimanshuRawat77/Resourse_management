import { bookingRepository } from '../repositories/bookingRepository.js';
import { resourceRepository } from '../repositories/resourceRepository.js';
import { notificationService } from './notificationService.js';
import { AppError } from '../utils/errors.js';
import db from '../config/db.js';
const date = (v) => v && !Number.isNaN(new Date(v).getTime()) ? new Date(v) : null;
const conflictMessage=(resource,booking)=>`${resource.name} is already booked from ${new Date(booking.start_time).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})} to ${new Date(booking.end_time).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})} on ${new Date(booking.start_time).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}.`;
export const bookingService = {
  async check(data) {
    const resource=await resourceRepository.find(Number(data.resourceId)); if(!resource) throw new AppError('Resource not found.',404);
    const start=date(data.startTime),end=date(data.endTime); if(!start||!end||start>=end) throw new AppError('Start time must be before end time.');
    if(start<=new Date()) throw new AppError('Booking cannot start in the past.');
    if(resource.status!=='AVAILABLE') throw new AppError('Resource is unavailable.',409);
    const conflict=await bookingRepository.findConflict(resource.id,start,end); if(conflict) throw new AppError(conflictMessage(resource,conflict),409);
    return {available:true};
  },
  async create(userId,data) {
    const resource=await resourceRepository.find(Number(data.resourceId)); if(!resource) throw new AppError('Resource not found.',404);
    const start=date(data.startTime),end=date(data.endTime),attendees=Number(data.expectedAttendees);
    if(!start||!end||start>=end) throw new AppError('Start time must be before end time.');
    if(start<=new Date()) throw new AppError('Booking cannot start in the past.');
    if(resource.status!=='AVAILABLE') throw new AppError('Resource is unavailable.',409);
    if(!Number.isInteger(attendees)||attendees<=0) throw new AppError('Expected attendees must be greater than zero.');
    if(attendees>resource.capacity) throw new AppError('Expected attendees exceed resource capacity.');
    if(!data.purpose?.trim()) throw new AppError('Purpose is required.');
    const result=await bookingRepository.create({userId,resourceId:resource.id,startTime:start,endTime:end,purpose:data.purpose.trim(),expectedAttendees:attendees});
    if(!result) throw new AppError('Resource not found.',404); if(result.conflict) {const conflict=await bookingRepository.findConflict(resource.id,start,end); throw new AppError(conflict?conflictMessage(resource,conflict):'Resource is already booked during the selected time.',409);} return result;
  },
  myBookings:(userId)=>bookingRepository.listForUser(userId),
  all:()=>bookingRepository.listAll(),
  async cancel(id,userId) { const b=await bookingRepository.find(id); if(!b) throw new AppError('Booking not found.',404); if(b.user_id!==userId) throw new AppError('You cannot cancel another user’s booking.',403); if(!['PENDING','APPROVED'].includes(b.status)) throw new AppError(`Cannot cancel a ${b.status.toLowerCase()} booking.`,409); return bookingRepository.updateStatus(id,'CANCELLED'); },
  async decide(id,status) {
    const connection=await db.getConnection();
    try {
      await connection.beginTransaction();
      const booking=await bookingRepository.find(id,connection,true);
      if(!booking) throw new AppError('Booking not found.',404);
      if(booking.status!=='PENDING') throw new AppError(`Cannot ${status.toLowerCase()} a ${booking.status.toLowerCase()} booking.`,409);
      if(status==='APPROVED') {
        await connection.query('SELECT id FROM resources WHERE id=? FOR UPDATE',[booking.resource_id]);
        const conflict=await bookingRepository.findConflict(booking.resource_id,booking.start_time,booking.end_time,id,connection);
        if(conflict) throw new AppError('This booking now conflicts with another pending or approved booking and cannot be approved.',409);
      }
      const updated=await bookingRepository.updateStatus(id,status,connection);
      await notificationService.notify(booking.user_id,`Your booking for ${booking.resource_name} has been ${status.toLowerCase()}.`,connection);
      await connection.commit();
      return updated;
    } catch(error) { await connection.rollback(); throw error; }
    finally { connection.release(); }
  }
};
