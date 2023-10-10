import { NextResponse } from 'next/server';
import prisma from 'lib/prisma';

export async function POST(req: Request) {
  try {
    const { bolumAdi } = await req.json();

    await prisma.bolumler.create({
      data: {
        bolumAdi: bolumAdi,
      },
    });
    const Yenilenmisbolumler = await prisma.bolumler.findMany({
      orderBy: {
        id: 'desc',
      },
    });
    return new NextResponse(JSON.stringify(Yenilenmisbolumler), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
