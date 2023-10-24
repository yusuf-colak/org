import prisma from 'lib/prisma';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import * as z from 'zod';

const userSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .max(20, 'Username must be less than 20 characters'),

  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .max(8, 'Password must be less than 8 characters'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: 'User with this email...' },
        { status: 409 }
      );
    }
    const existingUserByUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: 'User with this username...' },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json(
      { user: rest, message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong!' },
      { status: 500 }
    );
  }
}
