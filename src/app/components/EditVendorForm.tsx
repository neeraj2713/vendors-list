'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditVendorForm({ vendor }: { vendor: any }) {
  const router = useRouter();

  const [form, setForm] = useState({
    vendorName: vendor.vendorName,
    bankAccountNumber: vendor.bankAccountNumber,
    bankName: vendor.bankName,
    addressLine1: vendor.addressLine1 || '',
    addressLine2: vendor.addressLine2 || '',
    city: vendor.city || '',
    country: vendor.country || '',
    zipCode: vendor.zipCode || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/vendors/${vendor.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) router.push('/vendors');
    else alert('Update failed');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input name="vendorName" required value={form.vendorName} onChange={handleChange} />
      <input name="bankAccountNumber" required value={form.bankAccountNumber} onChange={handleChange} />
      <input name="bankName" required value={form.bankName} onChange={handleChange} />
      <input name="addressLine1" value={form.addressLine1} onChange={handleChange} />
      <input name="addressLine2" value={form.addressLine2} onChange={handleChange} />
      <input name="city" value={form.city} onChange={handleChange} />
      <input name="country" value={form.country} onChange={handleChange} />
      <input name="zipCode" value={form.zipCode} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
}
