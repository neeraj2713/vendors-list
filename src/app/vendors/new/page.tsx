'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateVendorPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    vendorName: '',
    bankAccountNumber: '',
    bankName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    zipCode: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/vendors', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' }
    });

    setLoading(false);

    if (res.ok) {
      alert('Vendor created!');
      router.push('/vendors');
    } else {
      alert('Failed to create vendor');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.push('/vendors')}
        className="mb-6 text-sm text-blue-600 hover:underline flex items-center"
      >
        ← Back to Vendors
      </button>

      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Vendor</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-md rounded-lg p-6 border"
      >
        {[
          { name: 'vendorName', label: 'Vendor Name', required: true },
          { name: 'bankAccountNumber', label: 'Bank Account Number', required: true },
          { name: 'bankName', label: 'Bank Name', required: true },
          { name: 'addressLine1', label: 'Address Line 1' },
          { name: 'addressLine2', label: 'Address Line 2' },
          { name: 'city', label: 'City' },
          { name: 'country', label: 'Country' },
          { name: 'zipCode', label: 'Zip Code' }
        ].map((field) => (
          <div key={field.name}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500"> *</span>}
            </label>
            <input
              type="text"
              name={field.name}
              required={field.required}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={field.label}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all"
        >
          {loading ? 'Creating...' : 'Create Vendor'}
        </button>
      </form>
    </div>
  );
}
