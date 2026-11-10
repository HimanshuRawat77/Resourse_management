import { Router } from 'express'; import * as c from '../controllers/notificationController.js'; import { authenticate } from '../middleware/authMiddleware.js'; import { asyncHandler } from '../utils/errors.js';
const r=Router(); r.use(authenticate); r.get('/',asyncHandler(c.list)); r.patch('/:id/read',asyncHandler(c.markRead)); export default r;
