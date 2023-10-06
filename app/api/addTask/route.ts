import { NextResponse } from 'next/server';
import prisma from 'lib/prisma';

export async function POST(req: Request) {
  try {
    const {
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

    const gorev = await prisma.cihazlar.create({
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

    return new NextResponse(JSON.stringify(gorev), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
