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
        <main className="mx-auto max-w-2xl px-4 py-8 pt-20 bg-white text-secondblack min-h-screen flex items-start">
            <section className="w-full">
                <div className="mx-auto max-w-md bg-white border border-handgray-light rounded-lg shadow-sm p-6">
                    <h1 className="text-2xl font-bold mb-4">Sign in</h1>
                    {error && <p className="text-red-500 mb-2">{error}</p>}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <label className="text-sm font-medium text-secondblack">Email</label>
                        <input
                            type="email"
                            placeholder="example@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full box-border border border-handgray rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-discount"
                            required
                        />

                        <label className="text-sm font-medium text-secondblack">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full box-border border border-handgray rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-discount"
                            required
                        />

                        <div className="mt-4 flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-md bg-discount text-white hover:bg-discount-dark disabled:opacity-60"
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