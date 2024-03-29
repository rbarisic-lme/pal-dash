// add your new actions to 'routes.ts'
import { env } from '@/config.ts';
import { generateToken } from '@/boot/passport-init.ts';
import express, { Router, Request, Response } from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const jsonResponse = { message: 'hello world!' };
  res.json(jsonResponse);
});

// Login route for JSON API
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // In a more complex scenario, we would check the username and password against a database
  // For simplicity, we're assuming the username and password from env match
  const passwordMatches = await bcrypt.compare(password, env.admin.password);

  if (username === env.admin.username && passwordMatches) {
    console.info(`[${new Date().toLocaleString()}] User ${env.admin.username} logged in with IP: ${req.ip}`)

    // Generate JWT token
    const token = generateToken(username)

    res.json({ token });
  } else {
    console.warn(`[${new Date().toLocaleString()}] Failed login for user ${env.admin.username} with IP: ${req.ip}`)
    res.status(401).json({ message: 'Invalid credentials' });
  }
});


export default router;