// add your new actions to 'routes.ts'
import { env } from '@/config.ts';
import { generateToken } from '@/passport-init.ts';
import express, { Router, Request, Response } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';

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

  console.error(env.admin.password)

  if (username === env.admin.username && passwordMatches) {
    // Generate JWT token
    const token = generateToken(username)

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});


export default router;