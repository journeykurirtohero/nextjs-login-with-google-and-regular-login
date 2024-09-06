// app/api/complete-profile/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { username, namaRekening, nomorRekening, namaBank, nohp } = await req.json();

  await dbConnect();

  try {
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        username,
        namaRekening,
        nomorRekening,
        namaBank,
        nohp,
        profileCompleted: true
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Profile completion error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}