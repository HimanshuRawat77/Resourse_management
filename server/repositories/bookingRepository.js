import db from '../config/db.js';
const active = "('PENDING','APPROVED')";
export const bookingRepository = {
  async hasConflict(resourceId,start,end,executor=db) { const [r] = await executor.query(`SELECT id FROM bookings WHERE resource_id=? AND status IN ${active} AND start_time < ? AND end_time > ? LIMIT 1`, [resourceId,end,start]); return r.length > 0; },
  async findConflict(resourceId,start,end,excludeId=null,executor=db) { const [r]=await executor.query(`SELECT id,start_time,end_time,purpose,status FROM bookings WHERE resource_id=? AND status IN ${active} AND start_time < ? AND end_time > ? AND (? IS NULL OR id<>?) ORDER BY start_time LIMIT 1`,[resourceId,end,start,excludeId,excludeId]); return r[0]; },
  async schedule(resourceId,date) { const [r]=await db.query(`SELECT b.id,b.start_time,b.end_time,b.purpose,b.status,u.name user_name FROM bookings b JOIN users u ON u.id=b.user_id WHERE b.resource_id=? AND b.status IN ${active} AND b.start_time < DATE_ADD(?, INTERVAL 1 DAY) AND b.end_time > ? ORDER BY b.start_time`,[resourceId,date,date]); return r; },
  async create(data) {
    const conn = await db.getConnection();
    try { await conn.beginTransaction();
      const resource = await (await conn.query('SELECT id FROM resources WHERE id=? FOR UPDATE',[data.resourceId]))[0][0];
      if (!resource) { await conn.rollback(); return null; }
      if (await this.hasConflict(data.resourceId,data.startTime,data.endTime,conn)) { await conn.rollback(); return { conflict:true }; }
      const [result] = await conn.query('INSERT INTO bookings (user_id,resource_id,start_time,end_time,purpose,expected_attendees,status) VALUES (?,?,?,?,?,?,\'PENDING\')', [data.userId,data.resourceId,data.startTime,data.endTime,data.purpose,data.expectedAttendees]);
      await conn.commit(); return this.find(result.insertId);
    } catch(e) { await conn.rollback(); throw e; } finally { conn.release(); }
  },
  async find(id,executor=db,lock=false) { const [r] = await executor.query(`SELECT b.*,r.name resource_name,u.name user_name FROM bookings b JOIN resources r ON r.id=b.resource_id JOIN users u ON u.id=b.user_id WHERE b.id=?${lock?' FOR UPDATE':''}`,[id]); return r[0]; },
  async listForUser(id) { const [r] = await db.query('SELECT b.*,r.name resource_name FROM bookings b JOIN resources r ON r.id=b.resource_id WHERE b.user_id=? ORDER BY b.start_time DESC',[id]); return r; },
  async listAll() { const [r] = await db.query('SELECT b.*,r.name resource_name,u.name user_name FROM bookings b JOIN resources r ON r.id=b.resource_id JOIN users u ON u.id=b.user_id ORDER BY b.created_at DESC'); return r; },
  async updateStatus(id,status,executor=db) { const [result]=await executor.query('UPDATE bookings SET status=? WHERE id=?',[status,id]); if(!result.affectedRows) return null; return this.find(id,executor); }
};
