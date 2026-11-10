import { notificationRepository } from '../repositories/notificationRepository.js';
export const notificationService = {
  list:(userId)=>notificationRepository.list(userId),
  async markRead(id,userId) { if(!await notificationRepository.markRead(id,userId)) { const {AppError}=await import('../utils/errors.js'); throw new AppError('Notification not found.',404); } },
  notify:(userId,message,executor)=>notificationRepository.create(userId,message,executor)
};
