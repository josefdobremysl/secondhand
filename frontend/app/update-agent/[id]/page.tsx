"use client"

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Same as Emils /agent page but used for updating an agent. With some tinkering probably could be the same page as /agent, but for now I made another copy
// -----------------------------------------------------------------------------

export default function UpdateAgentPage({ params }: { params: Promise<{ id: string }> }) {

    // Get agent data from localStorage by using ID from the dynamic route
    const { id } = React.use(params);
    const raw = localStorage.getItem(`agent:${id}`);
    const agent = raw ? JSON.parse(raw) : undefined;

    // Populate with existing information
    const [keywords, setKeywords] = useState(agent.keywords);
    const [minPrice, setMinPrice] = useState(agent.minPrice);
    const [maxPrice, setMaxPrice] = useState(agent.maxPrice);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <main className="mx-auto max-w-2xl px-4 py-8 pt-20 bg-white text-gray-900">
            <h2 className="text-2xl font-bold mb-6">Agent configuration</h2>
            <div className="flex flex-col gap-4">
                <label className="font-medium">Keywords</label>
                <input
                    type="text"
                    placeholder="Keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="border border-gray-300 rounded-md p-2"
                />

                <div className="flex justify-between">
                    <label className="font-medium">Min price</label>
                    <label className="font-medium">Max price</label>
                </div>

               <div className="flex flex-row sm:flex-row gap-4">
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="w-full box-border border border-gray-300 rounded-md p-2"
                    />
                    <span className="self-center text-l">-</span>
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full box-border border border-gray-300 rounded-md p-2"
                    />
                </div>
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                    onClick={async () => {
                    setIsLoading(true);
                    try {

                        const agent = {
                            id,
                            keywords,
                            minPrice,
                            maxPrice,
                            createdAt: new Date().toISOString(),
                        };

                        // Store the updated agent
                        localStorage.setItem(`agent:${id}`, JSON.stringify(agent));

                        router.push(`/manage-agents`);
                    } catch (err) {
                        console.error("Failed to update agent in localStorage", err);
                    } finally {
                        setIsLoading(false);
                    }
                }}
                >
                {isLoading ? "Loading..." : "Update Agent"}
                </button>
            </div>
        </main>
    );
}