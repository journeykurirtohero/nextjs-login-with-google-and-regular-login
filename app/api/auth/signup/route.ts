// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import * as yup from 'yup';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const signupSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  namaRekening: yup.string().required('Nama Rekening is required'),
  nomorRekening: yup.string().required('Nomor Rekening is required'),
  namaBank: yup.string().required('Nama Bank is required'),
  nohp: yup.string().required('No HP is required'),
});

const signupLimiter = new RateLimiterMemory({
  points: 10,
  duration: 60 * 60,
});

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { username, password, email, namaRekening, nomorRekening, namaBank, nohp } = await req.json();

    console.log('Received data:', { username, password, email, namaRekening, nomorRekening, namaBank, nohp });

    try {
      await signupSchema.validate({ username, password, email, namaRekening, nomorRekening, namaBank, nohp });
    } catch (validationError) {
      return NextResponse.json({ success: false, message: validationError.message }, { status: 400 });
    }

    try {
      await signupLimiter.consume(req.ip || 'localhost');
    } catch (rateLimiterRes) {
      return NextResponse.json(
        { success: false, message: 'Too many signup attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'Username or email already exists' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      namaRekening,
      nomorRekening,
      namaBank,
      nohp,
      role: 'user'
    });

    console.log('Saving new user:', newUser);

    await newUser.save();

    console.log('User saved successfully:', newUser);

    return NextResponse.json({ 
      success: true, 
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

