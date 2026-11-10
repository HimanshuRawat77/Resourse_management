import db from '../config/db.js';
export const notificationRepository = {
  async create(userId,message,executor=db) { const [r] = await executor.query('INSERT INTO notifications (user_id,message) VALUES (?,?)',[userId,message]); const [rows] = await executor.query('SELECT * FROM notifications WHERE id=?',[r.insertId]); return rows[0]; },
  async list(userId) { const [r] = await db.query('SELECT * FROM notifications WHERE user_id=? ORDER BY created_at DESC',[userId]); return r; },
  async markRead(id,userId) { const [r] = await db.query('UPDATE notifications SET is_read=TRUE WHERE id=? AND user_id=?',[id,userId]); return r.affectedRows > 0; }
};
