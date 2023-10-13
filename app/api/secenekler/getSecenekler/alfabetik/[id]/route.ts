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
        value: 'asc', // Alfabetik sıraya göre artan sıralama (büyük küçük harf duyarlılığı)
      },
    });

    // Büyük küçük harf duyarlılığını kaldırmak için alfabetik sıralamayı düzenleyin
    secenekler.sort((a, b) =>
      a.value.toLowerCase().localeCompare(b.value.toLowerCase())
    );

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
