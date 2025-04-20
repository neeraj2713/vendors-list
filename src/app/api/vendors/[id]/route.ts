import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();

  const updated = await prisma.vendor.update({
    where: { id: params.id },
    data: body
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.vendor.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}