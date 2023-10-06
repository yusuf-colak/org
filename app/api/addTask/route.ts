import { NextResponse } from "next/server";
import prisma from "lib/prisma";

export async function POST(req: Request) {
  try {
    const { cihazAdi, cihazicerik } = await req.json();

    const gorev = await prisma.cihazlar.create({
      data: {
        cihazAdi: cihazAdi,
        cihazicerik: cihazicerik,
      },
    });

    return new NextResponse(JSON.stringify(gorev), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
