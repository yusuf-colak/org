import { NextResponse } from 'next/server';
import prisma from 'lib/prisma';

export async function GET(req: Request) {
  try {
    const bolumler = await prisma.bolumler.findMany({
      orderBy: {
        id: 'desc', 
      },
    });
    return new NextResponse(JSON.stringify(bolumler), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
