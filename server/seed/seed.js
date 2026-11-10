import 'dotenv/config';
import bcrypt from 'bcryptjs';
import db from '../config/db.js';
const run=async()=>{
  const adminHash=await bcrypt.hash('admin123',10),studentHash=await bcrypt.hash('student123',10);
  await db.query("INSERT INTO users (name,email,password,role) VALUES ('University Admin','admin@university.com',?,'ADMIN'),('Himanshu Rawat','student@university.com',?,'USER') ON DUPLICATE KEY UPDATE password=VALUES(password)",[adminHash,studentHash]);
  const resources=[['Main Auditorium','AUDITORIUM','Main Campus',500,'Annual events and performances'],['Central Library Hall','LIBRARY_HALL','Central Library',150,'Talks and guest lectures'],['Multipurpose Hall','MULTIPURPOSE_HALL','Student Activity Center',250,'Workshops and student activities']];
  for(const r of resources) await db.query('INSERT INTO resources (name,type,location,capacity,description) SELECT ?,?,?,?,? WHERE NOT EXISTS (SELECT 1 FROM resources WHERE name=?)',[...r,r[0]]);
  console.log('Seeded demo users and resources.'); await db.end();
};
run().catch(async e=>{console.error(e.message);await db.end();process.exit(1);});
