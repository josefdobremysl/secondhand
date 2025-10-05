"use client";

import { useEffect, useState } from "react";

interface Product {
  title: string;
  price: string;
  currency: string;
  image: string;
  url: string;
}

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const storedProduct = localStorage.getItem("currentProduct");
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
  }, []);

  if (!product) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8 pt-20 bg-white text-gray-900">
        <p>Loading product...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 pt-20 bg-white text-gray-900">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto rounded-2xl object-cover shadow"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-700 text-xl">
            {product.price} {product.currency}
          </p>

          {/* Link to original Vinted page as button */}
          <button
            onClick={() => window.open(product.url, "_blank")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 w-max"
          >
            Go to original Vinted page
          </button>

          {/* Additional info box */}
          <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
            <h2 className="font-semibold mb-2">Product Details</h2>
            <p><strong>Title:</strong> {product.title}</p>
            <p><strong>Price:</strong> {product.price} {product.currency}</p>
            <p><strong>URL:</strong> <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{product.url}</a></p>
          </div>
        </div>
      </div>
    </main>
  );
}
