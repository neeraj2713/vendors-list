import { prisma } from '@/app/lib/prisma';
import { notFound } from 'next/navigation';
import EditVendorForm from '@/app/components/EditVendorForm';

interface Props {
  params: {
    id: string;
  };
}

export default async function EditVendorPage(props: Props) {
  const id = props.params.id;

  const vendor = await prisma.vendor.findUnique({ where: { id } });

  if (!vendor) return notFound();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Vendor</h1>
      <EditVendorForm vendor={vendor} />
    </div>
  );
}
