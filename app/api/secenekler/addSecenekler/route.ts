import { NextResponse } from 'next/server';
import prisma from 'lib/prisma';

export async function POST(req: Request) {
  try {
    const { value, valueName } = await req.json();

    await prisma.secenekler.create({
      data: {
        valueName: valueName,
        value: value,
      },
    });

    const YenilenmisSecenekler = await prisma.secenekler.findMany({
      where: {
        valueName: valueName.toString(),
      },
      orderBy: {
        id: 'desc',
      },
    });
    return new NextResponse(JSON.stringify(YenilenmisSecenekler), {
      status: 200,
    });
    
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
