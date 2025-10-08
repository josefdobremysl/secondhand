"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function AgentPage() {
  const [keywords, setKeywords] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // only allows numbers
    if (/^\d*$/.test(newValue)) {
      if (e.target.placeholder === "Max Price") {
        setMaxPrice(newValue === "" ? 0 : Number(newValue));
      } else {
        setMinPrice(newValue === "" ? 0 : Number(newValue));
      }
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 bg-white text-secondblack">
      <div className="flex flex-row items-center mb-6">
          <button className="mr-4 p-2 rounded-md bg-handgray text-secondblack hover:bg-handgray-light"
              onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-1" />
          </button>
          <h2 className="text-2xl font-bold">Agent configuration</h2>
      </div>
      <div className="flex flex-col gap-4">
        <label className="font-medium">Keywords</label>
        <input
          type="text"
          placeholder="Keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="w-full box-border border border-handgray rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-discount"
        />

        <div className="flex justify-between">
          <label className="font-medium">Min price</label>
          <label className="font-medium">Max price</label>
        </div>

        <div className="flex flex-row sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-full box-border border border-gray-300 rounded-md p-2"
          />
          <span className="self-center text-l">-</span>
          <input
            type="text"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full box-border border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 rounded-md bg-discount text-white hover:bg-discount-dark"
          onClick={async () => {
            setIsLoading(true);
            try {
              const id =
                typeof crypto !== "undefined" && "randomUUID" in crypto
                  ? (crypto as any).randomUUID()
                  : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

              const agent = { id, keywords, minPrice, maxPrice, createdAt: new Date().toISOString() };
              localStorage.setItem(`agent:${id}`, JSON.stringify(agent));

              const raw = localStorage.getItem("agents");
              const agentsIndex: string[] = raw ? JSON.parse(raw) : [];
              if (!agentsIndex.includes(id)) {
                agentsIndex.push(id);
                localStorage.setItem("agents", JSON.stringify(agentsIndex));
              }

                router.back();
            } catch (err) {
                console.error("Failed to create agent in localStorage", err);
            } finally {
                setIsLoading(false);
            }
        }}
        >
                {isLoading ? "Loading..." : "Create Agent"}
            </button>
            </div>
        </main>
    );
}
