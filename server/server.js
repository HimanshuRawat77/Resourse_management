import 'dotenv/config';
import express from 'express'; import cors from 'cors';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import authRoutes from './routes/authRoutes.js'; import resourceRoutes from './routes/resourceRoutes.js'; import bookingRoutes from './routes/bookingRoutes.js'; import adminBookingRoutes from './routes/adminBookingRoutes.js'; import notificationRoutes from './routes/notificationRoutes.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import db from './config/db.js';
const app=express();
const allowedOrigins=(process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map(origin=>origin.trim()).filter(Boolean);
app.use(cors({origin:(origin,callback)=>callback(null,!origin||allowedOrigins.includes(origin))})); app.use(express.json());
app.get('/api/health',async(_req,res)=>{await db.query('SELECT 1');res.json({success:true,message:'URMS API is ready.'});});
app.use('/api/auth',authRoutes); app.use('/api/resources',resourceRoutes); app.use('/api/bookings',bookingRoutes); app.use('/api/admin/bookings',adminBookingRoutes); app.use('/api/notifications',notificationRoutes);
const clientBuild = resolve(dirname(fileURLToPath(import.meta.url)), 'public');
if (existsSync(resolve(clientBuild, 'index.html'))) {
  app.use(express.static(clientBuild));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(resolve(clientBuild, 'index.html'), error => error && next(error));
  });
}
app.use((req,res)=>res.status(404).json({success:false,message:`Route not found: ${req.method} ${req.path}`})); app.use(errorMiddleware);
const port=Number(process.env.PORT || 5000); app.listen(port,()=>console.log(`URMS API listening on ${port}`));
