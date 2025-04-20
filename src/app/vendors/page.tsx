'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useEffect, useState } from 'react';

const PAGE_SIZE = 5;

interface Vendor {
  id: string;
  vendorName: string;
  bankAccountNumber: string;
  bankName: string;
}

export default function VendorListPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [total, setTotal] = useState(0);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const router = useRouter();
  const [, startTransition] = useTransition();

  if (page < 1) redirect('/vendors?page=1');

  const totalPages = Math.ceil(total / PAGE_SIZE);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/vendors?page=${page}`);
      const { vendors, total } = await res.json();
      setVendors(vendors);
      setTotal(total);
    }
    fetchData();
  }, [page]);

  const handleDelete = async (id: string) => {
    const ok = confirm('Are you sure you want to delete this vendor?');
    if (!ok) return;

    await fetch(`/api/vendors/${id}`, { method: 'DELETE' });

    // Refresh data
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="p-4">
      {/* Header with Sign Out */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Vendors</h1>
        <Button variant="outline" onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>

      <table className="w-full border text-left bg-white shadow-sm rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Vendor Name</th>
            <th className="px-4 py-2">Bank Account No.</th>
            <th className="px-4 py-2">Bank Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id} className="border-t">
              <td className="px-4 py-2">{vendor.vendorName}</td>
              <td className="px-4 py-2">{vendor.bankAccountNumber}</td>
              <td className="px-4 py-2">{vendor.bankName}</td>
              <td className="px-4 py-2">
                <Link href={`/vendors/${vendor.id}/edit`} className="text-blue-500 mr-4">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(vendor.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Create Vendor button */}
      <div className="flex justify-end mt-6">
        <Link
          href="/vendors/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Create Vendor
        </Link>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <Link
            key={i}
            href={`/vendors?page=${i + 1}`}
            className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-gray-300' : 'bg-white hover:bg-gray-100'}`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
