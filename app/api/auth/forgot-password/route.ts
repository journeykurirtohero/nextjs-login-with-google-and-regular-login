//app/forgot-password/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { sendResetPasswordEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      // Still return success to prevent email enumeration
      return NextResponse.json({ success: true, message: 'If a user with this email exists, a password reset link has been sent.' });
    }

    const resetToken = jwt.sign(
      { userId: user._id.toString() },
      process.env.NEXTAUTH_SECRET!,
      { expiresIn: '1h' }
    );

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
    await sendResetPasswordEmail(user.email, resetUrl);

    return NextResponse.json({ success: true, message: 'If a user with this email exists, a password reset link has been sent.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}