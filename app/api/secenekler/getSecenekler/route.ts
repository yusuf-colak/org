import { NextResponse } from 'next/server';
import prisma from 'lib/prisma';

export async function GET(req: Request) {
  try {
    const secenekler = await prisma.secenekler.findMany({
      orderBy: {
        id: 'desc',
      },
    });
    return new NextResponse(JSON.stringify(secenekler), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
