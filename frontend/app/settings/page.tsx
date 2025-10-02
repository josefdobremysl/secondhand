"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [keywords, setKeywords] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const router = useRouter();

  const handleSubmit = () => {
    // Přesměruj na hlavní stránku s query parametry
    router.push(`/` +
      `?keywords=${encodeURIComponent(keywords)}` +
      `&min_price=${minPrice}&max_price=${maxPrice}`);
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 pt-20 bg-white text-gray-900">
      <h2 className="text-2xl font-bold mb-6">Set Search Parameters</h2>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(parseFloat(e.target.value))}
          className="px-4 py-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
          className="px-4 py-2 border rounded-md"
        />

        <button
          className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
    </main>
  );
}
