"use client";

import { useState } from "react";
import {
  PRODUCTS,
  CATEGORY_TABS,
  type ShopCategory,
  type Product,
} from "@/constants/shop";
import { ProductMedia } from "./product-media";
import { useCart } from "@/lib/cart";

function ProductTile({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <article className="product">
      <ProductMedia media={product.media} name={product.name} />
      {product.badge ? (
        <span className={`badge${product.badge.kind ? ` ${product.badge.kind}` : ""}`}>
          {product.badge.text}
        </span>
      ) : null}
      <div className="info">
        <div className="cat">{product.cat}</div>
        <h3 className="pname">{product.name}</h3>
        <p className="desc">{product.desc}</p>
        {product.colors ? (
          <div className="colors">
            {product.colors.map((c, i) => (
              <span key={i} className="swatch" style={{ background: c }} />
            ))}
          </div>
        ) : null}
        <div className="price-row">
          <span className="price">€{product.price}</span>
          <button
            type="button"
            className="add"
            onClick={() =>
              add({ id: product.id, name: product.name, price: product.price })
            }
          >
            Aggiungi →
          </button>
        </div>
      </div>
    </article>
  );
}

export function ShopCatalog() {
  const [cat, setCat] = useState<ShopCategory | "all">("all");
  const products =
    cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  // Counts per category for the tab labels.
  const counts: Record<string, number> = {
    all: PRODUCTS.length,
    kit: PRODUCTS.filter((p) => p.category === "kit").length,
    accessori: PRODUCTS.filter((p) => p.category === "accessori").length,
    merch: PRODUCTS.filter((p) => p.category === "merch").length,
  };

  return (
    <>
      <div className="cat-tabs">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            className={`cat-tab${cat === tab.value ? " active" : ""}`}
            onClick={() => setCat(tab.value)}
          >
            {tab.label}{" "}
            <span className="count">· {counts[tab.value]}</span>
          </button>
        ))}
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
