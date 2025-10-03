"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        router.push("/");

        setIsLoading(false);
    };

    return (
        <main className="mx-auto max-w-2xl px-4 py-8 pt-20 bg-white text-gray-900 min-h-screen flex items-start">
            <section className="w-full">
                <div className="mx-auto max-w-md bg-white border border-gray-100 rounded-lg shadow-sm p-6">
                    <h1 className="text-2xl font-bold mb-4">Sign in</h1>
                    {error && <p className="text-red-500 mb-2">{error}</p>}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="example@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full box-border border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            required
                        />

                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full box-border border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            required
                        />

                        <div className="mt-4 flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
                                disabled={isLoading}
                            >
                                {isLoading ? "Loading..." : "Sign in"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}