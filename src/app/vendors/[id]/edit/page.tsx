import { prisma } from '@/app/lib/prisma';
import { notFound } from 'next/navigation';
import EditVendorForm from '@/app/components/EditVendorForm';

export default async function EditVendorPage({ params }: { params: { id: string } }) {
  const vendor = await prisma.vendor.findUnique({ where: { id: params.id } });

  if (!vendor) return notFound();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Vendor</h1>
      <EditVendorForm vendor={vendor} />
    </div>
  );
}
