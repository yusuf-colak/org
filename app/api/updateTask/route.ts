import { NextResponse } from "next/server";
import prisma from "lib/prisma";

export async function PUT(req: Request) {
  try {
    const { cihazAdi, cihazicerik, id } = await req.json();

    const gorev = await prisma.cihazlar.update({
      where: {
        id: Number(id),
      },
      data: {
        cihazAdi,
        cihazicerik,
      },
    });

    return new NextResponse(JSON.stringify(gorev), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
