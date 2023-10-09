import { NextResponse } from 'next/server';
import prisma from 'lib/prisma';

export async function DELETE(req: Request, route: { params: { id: string } }) {
  try {
    const id: number = Number(route.params.id);

    await prisma.cihazlar.delete({
      where: {
        id: Number(id),
      },
    });

    const tumGorevler = await prisma.cihazlar.findMany();
    return new NextResponse(JSON.stringify(tumGorevler), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
