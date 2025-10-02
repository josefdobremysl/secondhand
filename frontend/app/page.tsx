"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface VintedItem {
  title: string;
  price: string;
  currency: string;
  image: string;
  url: string;
}

export default function Page() {
  const searchParamsHook = useSearchParams();
  const router = useRouter();

  // Načteme parametry z URL
  const keywords = searchParamsHook.get("keywords") || "vetements";
  const min_price = parseFloat(searchParamsHook.get("min_price") || "0");
  const max_price = parseFloat(searchParamsHook.get("max_price") || "1000");

  const [items, setItems] = useState<VintedItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keywords, min_price, max_price }),
        });
        const data = await res.json();
        if (Array.isArray(data.results)) setItems(data.results);
        else setItems([]);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };

    fetchItems();
  }, [keywords, min_price, max_price]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 pt-20 bg-white text-gray-900">

      {/* Section with button to open Settings */}
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-xl font-bold">Search Items</h2>
        <button
          className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={() => router.push("/settings")}
        >
          Set Keywords & Price
        </button>
      </div>

      {/* Grid of search results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div key={index} className="overflow-hidden rounded-2xl shadow hover:shadow-lg transition">
            <img
              src={item.image}
              alt={item.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
              <p className="text-gray-500">{item.price} {item.currency}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline text-sm"
              >
                Go to Vinted
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
