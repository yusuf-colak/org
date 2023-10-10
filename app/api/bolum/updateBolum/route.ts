import { NextResponse } from 'next/server';
import prisma from 'lib/prisma';

export async function PUT(req: Request) {
  try {
    const { id, bolumAdi } = await req.json();
    await prisma.bolumler.update({
      where: {
        id: Number(id),
      },
      data: {
        bolumAdi: bolumAdi,
      },
    });
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
