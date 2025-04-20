import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

type Props = {
  params: {
    id: string;
  };
};

export async function PUT(
  request: NextRequest,
  props: Props
) {
  const body = await request.json();

  const updated = await prisma.vendor.update({
    where: { id: props.params.id },
    data: body
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  props: Props
) {
  await prisma.vendor.delete({ where: { id: props.params.id } });
  return NextResponse.json({ success: true });
}