import { NextResponse } from "next/server";
import prisma from "lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const gorev = await prisma.cihazlar.findFirst({
      where: {
        id: Number(data.id),
      },
    });

    if (gorev) {
      return new NextResponse(JSON.stringify(gorev), {
        status: 200,
      });
    } else {
      return new NextResponse("Belirtilen ID ile eşleşen görev bulunamadı", { status: 404 });
    }
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
