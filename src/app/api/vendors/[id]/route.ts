import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const body = await req.json();

  const updated = await prisma.vendor.update({
    where: { id: context.params.id },
    data: body
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _: NextRequest,
  context: { params: { id: string } }
) {
  await prisma.vendor.delete({ where: { id: context.params.id } });
  return NextResponse.json({ success: true });
}