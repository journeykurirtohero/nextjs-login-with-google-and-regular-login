// app/api/update-profile/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { username, namaRekening, nomorRekening, namaBank, nohp } = await req.json();

  await dbConnect();

  try {
    let user;
    if (session.user.id.length === 24) {
      user = await User.findByIdAndUpdate(
        session.user.id,
        { username, namaRekening, nomorRekening, namaBank, nohp, profileCompleted: true },
        { new: true, runValidators: true }
      );
    } else {
      user = await User.findOneAndUpdate(
        { googleId: session.user.id },
        { username, namaRekening, nomorRekening, namaBank, nohp, profileCompleted: true },
        { new: true, runValidators: true }
      );
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        namaRekening: user.namaRekening,
        nomorRekening: user.nomorRekening,
        namaBank: user.namaBank,
        nohp: user.nohp,
        role: user.role,
        profileCompleted: user.profileCompleted
      } 
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}