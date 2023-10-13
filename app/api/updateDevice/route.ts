import { NextResponse } from 'next/server';
import prisma from 'lib/prisma';

export async function PUT(req: Request) {
  try {
    const {
      id,
      cihazAdi,
      demirbasNo,
      marka,
      model,
      seriNo,
      uretimYili,
      mulkiyetDurumu,
      kat,
      bolum,
      kalibrasyonTarihi,
      pdfURL,
      sonrakiKalibrasyonTarihi,
    } = await req.json();

    await prisma.cihazlar.update({
      where: {
        id: Number(id),
      },
      data: {
        cihazAdi: cihazAdi,
        demirbasNo: demirbasNo,
        marka: marka,
        model: model,
        seriNo: seriNo,
        uretimYili: uretimYili,
        mulkiyetDurumu: mulkiyetDurumu,
        kat: kat,
        bolum: bolum,
        kalibrasyonTarihi: kalibrasyonTarihi,
        pdfURL: pdfURL,
        sonrakiKalibrasyonTarihi: sonrakiKalibrasyonTarihi,
      },
    });
    const cihazlar = await prisma.cihazlar.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    return new NextResponse(JSON.stringify(cihazlar), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
