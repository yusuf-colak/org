import { NextResponse } from 'next/server';
import prisma from 'lib/prisma';

export async function GET(req: Request) {
  try {
    const gorevler = await prisma.cihazlar.findMany();

    return new NextResponse(JSON.stringify(gorevler), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
