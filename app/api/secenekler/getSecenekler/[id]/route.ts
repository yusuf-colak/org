import { NextResponse } from 'next/server';
import prisma from 'lib/prisma';

export async function GET(req: Request, route: { params: { id: string } }) {
  try {
    const id: string = route.params.id;

    const secenekler = await prisma.secenekler.findMany({
      where: {
        valueName: id.toString(),
      },
      orderBy: {
        id: 'desc',
      },
    });

    if (secenekler) {
      return new NextResponse(JSON.stringify(secenekler), {
        status: 200,
      });
    } else {
      return new NextResponse('Secenek Bulunamadı', {
        status: 404,
      });
    }
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
