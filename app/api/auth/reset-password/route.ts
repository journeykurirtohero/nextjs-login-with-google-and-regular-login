//app/auth/reset-password/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { token, newPassword } = await req.json();
    console.log('Received token:', token);

    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as { userId: string };
    console.log('Decoded token:', decoded);

    if (!decoded || !decoded.userId) {
      console.log('Token verification failed');
      return NextResponse.json({ success: false, message: 'Invalid or expired token' }, { status: 400 });
    }

    const user = await User.findOne({
      _id: decoded.userId,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    console.log('Found user:', user);

    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid or expired token' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return NextResponse.json({ success: true, message: 'Password has been reset' });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}