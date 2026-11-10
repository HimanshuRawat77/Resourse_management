import bcrypt from 'bcryptjs';
import { userRepository } from '../repositories/userRepository.js';
import { signToken } from '../utils/jwt.js';
import { AppError } from '../utils/errors.js';
export const authService = {
  async register({name,email,password}) {
    if (!name?.trim() || !/^\S+@\S+\.\S+$/.test(email || '') || !password || password.length < 6) throw new AppError('Enter a name, valid email, and password of at least 6 characters.');
    if (await userRepository.findByEmail(email.toLowerCase())) throw new AppError('An account with this email already exists.',409);
    const user = await userRepository.create({name:name.trim(),email:email.toLowerCase(),password:await bcrypt.hash(password,10)});
    return { user, token:signToken(user) };
  },
  async login({email,password}) { const user = await userRepository.findByEmail((email || '').toLowerCase()); if (!user || !await bcrypt.compare(password || '',user.password)) throw new AppError('Invalid email or password.',401); const safe={id:user.id,name:user.name,email:user.email,role:user.role}; return {user:safe,token:signToken(safe)}; }
};
