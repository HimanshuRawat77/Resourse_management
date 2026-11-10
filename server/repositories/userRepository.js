import db from '../config/db.js';
export const userRepository = {
  async findByEmail(email) { const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]); return rows[0]; },
  async create({ name, email, password }) { const [r] = await db.query('INSERT INTO users (name,email,password) VALUES (?,?,?)', [name,email,password]); return { id:r.insertId,name,email,role:'USER' }; },
  async findPublicById(id) { const [rows] = await db.query('SELECT id,name,email,role,created_at FROM users WHERE id = ?', [id]); return rows[0]; }
};
