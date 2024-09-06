// api/auth/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import logger from '@/lib/logger';

const loginSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const loginLimiter = new RateLimiterMemory({
  points: 5, // 5 points
  duration: 15 * 60, // Per 15 minutes
});

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { username, password } = await req.json();

    try {
      await loginSchema.validate({ username, password });
    } catch (validationError) {
      return NextResponse.json({ success: false, message: validationError.message }, { status: 400 });
    }

    try {
      await loginLimiter.consume(req.ip); // Consume 1 point
    } catch (rateLimiterRes) {
      return NextResponse.json(
        { success: false, message: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 400 });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      },
      token
    });

    logger.info(`Successful login for user: ${user.username}`);

    // Set HTTP-only cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 86400,
      path: '/',
    });

    return response;
  } catch (error) {
    logger.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}