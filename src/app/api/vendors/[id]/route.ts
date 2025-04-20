import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { parse } from 'url';

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop(); // gets the last part of the URL

  if (!id) {
    return NextResponse.json({ error: 'Vendor ID is required' }, { status: 400 });
  }

  const updated = await prisma.vendor.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop(); // gets the last part of the URL

  if (!id) {
    return NextResponse.json({ error: 'Vendor ID is required' }, { status: 400 });
  }

  await prisma.vendor.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
