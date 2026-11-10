import { resourceRepository } from '../repositories/resourceRepository.js';
import { AppError } from '../utils/errors.js';
import { bookingRepository } from '../repositories/bookingRepository.js';
const types=['AUDITORIUM','LIBRARY_HALL','MULTIPURPOSE_HALL'];
export const resourceService = {
  list:()=>resourceRepository.list(),
  async get(id) { const r=await resourceRepository.find(id); if(!r) throw new AppError('Resource not found.',404); return r; },
  async schedule(id,date) { const resource=await this.get(id); if(!/^\d{4}-\d{2}-\d{2}$/.test(date||'') || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) throw new AppError('Provide a valid schedule date (YYYY-MM-DD).'); const bookings=await bookingRepository.schedule(id,date); return {resource:{id:resource.id,name:resource.name,type:resource.type},bookings:bookings.map(b=>({...b,start_time:String(b.start_time).replace(' ','T'),end_time:String(b.end_time).replace(' ','T')}))}; },
  async save(data,id) { if(!data.name?.trim() || !types.includes(data.type) || !data.location?.trim() || !Number.isInteger(Number(data.capacity)) || Number(data.capacity)<1 || !['AVAILABLE','UNAVAILABLE'].includes(data.status || 'AVAILABLE')) throw new AppError('Provide valid resource details.'); return id ? resourceRepository.update(id,{...data,capacity:Number(data.capacity)}) : resourceRepository.create({...data,capacity:Number(data.capacity)}); },
  async remove(id) { try { if(!await resourceRepository.remove(id)) throw new AppError('Resource not found.',404); } catch(e) { if(e.code==='ER_ROW_IS_REFERENCED_2') throw new AppError('Resource has bookings and cannot be deleted.',409); throw e; } }
};
