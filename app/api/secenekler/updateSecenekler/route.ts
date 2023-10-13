import { NextResponse } from 'next/server';
import prisma from 'lib/prisma';

export async function PUT(req: Request) {
  try {
    const { id, value, valueName } = await req.json();
    await prisma.secenekler.update({
      where: {
        id: Number(id),
      },
      data: {
        value: value,
      },
    });
    const secenekler = await prisma.secenekler.findMany({
      where: {
        valueName: valueName,
      },
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
