import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

const PAGE_SIZE = 5;


export async function POST(req: NextRequest) {
  const body = await req.json();

  const { vendorName, bankAccountNumber, bankName } = body;
  if (!vendorName || !bankAccountNumber || !bankName) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const vendor = await prisma.vendor.create({ data: body });

  return NextResponse.json({ vendor });
}

export async function GET(req: NextRequest) {
  const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
  const skip = (page - 1) * PAGE_SIZE;

  const [vendors, total] = await Promise.all([
    prisma.vendor.findMany({
      skip,
      take: PAGE_SIZE,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.vendor.count(),
  ]);

  return NextResponse.json({ vendors, total });
}