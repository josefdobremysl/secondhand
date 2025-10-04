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

interface Agent {
  id: string;
  keywords: string;
  minPrice: number;
  maxPrice: number;
}

export default function Page() {
  const searchParamsHook = useSearchParams();
  const router = useRouter();

  const keywords = searchParamsHook.get("keywords") || "vetements";
  const min_price = parseFloat(searchParamsHook.get("min_price") || "0");
  const max_price = parseFloat(searchParamsHook.get("max_price") || "1000");

  const [items, setItems] = useState<VintedItem[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);

  // Load saved agents from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("agents");
    if (raw) {
      const ids: string[] = JSON.parse(raw);
      const loadedAgents: Agent[] = ids
        .map((id) => {
          const data = localStorage.getItem(`agent:${id}`);
          return data ? JSON.parse(data) : null;
        })
        .filter(Boolean);
      setAgents(loadedAgents);
    }
  }, []);

  // Fetch items from backend
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
    <main className="mx-auto max-w-7xl px-4 py-4 pt-4 bg-white text-gray-900">

      {/* Header title */}
      <h2 className="text-xl font-bold mb-2">Search Items</h2>

      {/* Dropdown Options */}
      <div className="w-full flex flex-col mb-4">
        <button
          className="w-full px-4 py-3 text-center bg-gray-600 text-white hover:bg-gray-800 focus:outline-none"
          onClick={() => setDropdownOpen(prev => !prev)}
        >
          Agents
        </button>

        {dropdownOpen && (
          <div className="mt-0 w-full bg-gray-300 p-2 flex flex-col gap-2 rounded-md">
            <div className="flex gap-2">
              <button
                className="flex-1 px-4 py-3 bg-gray-600 text-white hover:bg-gray-800"
                onClick={() => router.push("/agent")}
              >
                Create Agent
              </button>

              <button
                className="flex-1 px-4 py-3 bg-gray-600 text-white hover:bg-gray-800"
                onClick={() => router.push("/manage-agents")}
              >
                Manage
              </button>
            </div>

            {/* Render saved agents */}
            {agents.map((agent) => (
              <button
                key={agent.id}
                className="w-full px-4 py-3 bg-indigo-600 text-white hover:bg-indigo-700 rounded"
                onClick={() =>
                  router.push(
                    `/?keywords=${encodeURIComponent(agent.keywords)}&min_price=${agent.minPrice}&max_price=${agent.maxPrice}`
                  )
                }
              >
                {agent.keywords} ({agent.minPrice} - {agent.maxPrice})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid of search results */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div key={index} className="overflow-hidden rounded-2xl shadow hover:shadow-lg transition">
            <button
              onClick={() => {
                localStorage.setItem("currentProduct", JSON.stringify(item));
                router.push("/product");
              }}
              className="w-full"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 sm:h-48 md:h-44 lg:h-40 object-cover hover:opacity-90 transition"
              />
            </button>
            <div className="p-2 sm:p-4">
              <h3 className="text-sm sm:text-base font-semibold text-gray-700">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.price} {item.currency}</p>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}
