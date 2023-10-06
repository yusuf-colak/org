import { NextResponse } from 'next/server';
import prisma from 'lib/prisma';

export async function DELETE(req: Request, res: Response) {
  try {
    const { idNumber } = await req.json();

    const silinen = await prisma.cihazlar.delete({
      where: {
        id: Number(idNumber),
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
