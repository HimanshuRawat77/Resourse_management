import 'dotenv/config';
import bcrypt from 'bcryptjs';
import db from '../config/db.js';

const seedUser = async ({ name, email, password, role }) => {
  if (!password) return false;
  const passwordHash = await bcrypt.hash(password, 10);
  await db.query(
    'INSERT INTO users (name,email,password,role) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE password=VALUES(password)',
    [name, email, passwordHash, role]
  );
  return true;
};

const run = async () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const adminPassword = process.env.ADMIN_PASSWORD || (isProduction ? null : 'admin123');
  const studentPassword = process.env.DEMO_USER_PASSWORD || (isProduction ? null : 'student123');

  const seededAdmin = await seedUser({
    name: 'University Admin',
    email: process.env.ADMIN_EMAIL || 'admin@university.com',
    password: adminPassword,
    role: 'ADMIN'
  });
  const seededStudent = await seedUser({
    name: 'Himanshu Rawat',
    email: process.env.DEMO_USER_EMAIL || 'student@university.com',
    password: studentPassword,
    role: 'USER'
  });

  const resources = [
    ['Main Auditorium', 'AUDITORIUM', 'Main Campus', 500, 'Annual events and performances'],
    ['Central Library Hall', 'LIBRARY_HALL', 'Central Library', 150, 'Talks and guest lectures'],
    ['Multipurpose Hall', 'MULTIPURPOSE_HALL', 'Student Activity Center', 250, 'Workshops and student activities']
  ];
  for (const resource of resources) {
    await db.query(
      'INSERT INTO resources (name,type,location,capacity,description) SELECT ?,?,?,?,? WHERE NOT EXISTS (SELECT 1 FROM resources WHERE name=?)',
      [...resource, resource[0]]
    );
  }

  console.log(`Seeded resources${seededAdmin ? ', admin account' : ''}${seededStudent ? ', demo user' : ''}.`);
};

run()
  .catch(error => {
    console.error(`Seed failed: ${error.message}`);
    process.exitCode = 1;
  })
  .finally(() => db.end());
