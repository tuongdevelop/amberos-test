import { Request, Response } from 'express';
import { userRepository } from '../services/user.service';
import * as jwt from 'jsonwebtoken';
import { appConfig } from '../config/app.config';
import { ZodError } from 'zod';
import { registerSchema, loginSchema, updateProfileSchema } from '../validators/user.validator';

export const register = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);
    const existingUser = await userRepository.findOneBy({ email: data.email });
    if (existingUser) return res.status(409).json({ message: "Email already exists" });
    
    const newUser = userRepository.create(data);
    await userRepository.save(newUser);
    
    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    if (error instanceof ZodError) return res.status(400).json({ errors: error.flatten().fieldErrors });
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await userRepository.findByEmailWithPassword(email);
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "The email or password is in-correct!" });
    }
    const token = jwt.sign({ id: user.id }, appConfig.jwt.secret, { expiresIn: appConfig.jwt.expiresIn as any });
    console.log(token);
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof ZodError) return res.status(400).json({ errors: error.flatten().fieldErrors });
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        if (userId !== (req as any).user.id) {
            return res.status(403).json({ message: "Forbidden: You can only view your own profile" });
        }
        const profile = await userRepository.findOneBy({ id: userId });
        if (!profile) return res.status(404).json({ message: "User not found" });
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching profile' });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (userId !== (req as any).user.id) {
        return res.status(403).json({ message: "Forbidden: You can only update your own profile" });
    }
    const data = updateProfileSchema.parse(req.body);
    await userRepository.update(userId, data);
    const updatedProfile = await userRepository.findOneBy({ id: userId });
    res.status(200).json(updatedProfile);
  } catch (error) {
    if (error instanceof ZodError) return res.status(400).json({ errors: error.flatten().fieldErrors });
    res.status(500).json({ message: 'Server error updating profile' });
  }
};
