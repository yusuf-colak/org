import { NextResponse } from 'next/server';
import prisma from 'lib/prisma';

export async function DELETE(req: Request, route: { params: { id: string } }) {
  try {
    const id: number = Number(route.params.id);

    const secenek = await prisma.secenekler.findFirst({
      where: {
        id: Number(id),
      },
    });

    await prisma.secenekler.delete({
      where: {
        id: Number(id),
      },
    });

    const secenekler = await prisma.secenekler.findMany({
      where: {
        valueName: secenek?.valueName,
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
