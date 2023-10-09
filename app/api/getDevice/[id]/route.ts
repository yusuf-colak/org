import { NextResponse } from 'next/server';
import prisma from 'lib/prisma';

export async function GET(req: Request, route: { params: { id: string } }) {
  try {
    const id: number = Number(route.params.id);

    const cihaz = await prisma.cihazlar.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (cihaz) {
      return new NextResponse(JSON.stringify(cihaz), {
        status: 200,
      });
    } else {
      return new NextResponse('Belirtilen ID ile eşleşen görev bulunamadı', {
        status: 404,
      });
    }
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
