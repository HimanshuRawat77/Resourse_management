import db from '../config/db.js';
export const resourceRepository = {
  async list() { const [r] = await db.query(`SELECT r.*,
    (SELECT JSON_OBJECT('id',b.id,'start_time',b.start_time,'end_time',b.end_time,'purpose',b.purpose,'status',b.status)
      FROM bookings b WHERE b.resource_id=r.id AND b.status IN ('PENDING','APPROVED') AND b.start_time<=NOW() AND b.end_time>NOW() ORDER BY b.start_time LIMIT 1) AS current_booking,
    (SELECT JSON_OBJECT('id',b.id,'start_time',b.start_time,'end_time',b.end_time,'purpose',b.purpose,'status',b.status)
      FROM bookings b WHERE b.resource_id=r.id AND b.status IN ('PENDING','APPROVED') AND b.start_time>NOW() ORDER BY b.start_time LIMIT 1) AS next_booking
    FROM resources r ORDER BY r.name`); return r.map(row=>({...row,current_booking:typeof row.current_booking==='string'?JSON.parse(row.current_booking):row.current_booking,next_booking:typeof row.next_booking==='string'?JSON.parse(row.next_booking):row.next_booking})); },
  async find(id, executor = db) { const [r] = await executor.query('SELECT * FROM resources WHERE id=?', [id]); return r[0]; },
  async create(v) { const [r] = await db.query('INSERT INTO resources (name,type,location,capacity,status,description) VALUES (?,?,?,?,?,?)', [v.name,v.type,v.location,v.capacity,v.status || 'AVAILABLE',v.description || null]); return this.find(r.insertId); },
  async update(id,v) { await db.query('UPDATE resources SET name=?,type=?,location=?,capacity=?,status=?,description=? WHERE id=?', [v.name,v.type,v.location,v.capacity,v.status,v.description || null,id]); return this.find(id); },
  async remove(id) { const [r] = await db.query('DELETE FROM resources WHERE id=?', [id]); return r.affectedRows > 0; }
};
