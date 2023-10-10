import { NextResponse } from 'next/server';
import prisma from 'lib/prisma';

export async function DELETE(req: Request, route: { params: { id: string } }) {
  try {
    const id: number = Number(route.params.id);

    await prisma.bolumler.delete({
      where: {
        id: Number(id),
      },
    });

    const bolumler = await prisma.bolumler.findMany();
    return new NextResponse(JSON.stringify(bolumler), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
