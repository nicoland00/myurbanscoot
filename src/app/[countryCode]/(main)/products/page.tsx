"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface Product {
  id: string
  title: string
  thumbnail: string
  description?: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch("http://localhost:9000/store/products", {
      headers: {
        "x-publishable-api-key":
          "pk_cc80fa97fa885540255a85091ded517f87ab2c01cd294715b4a8963423aa7977",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        console.log("API response:", data)
        setProducts(data.products)
      })
      .catch((err) => {
        console.error("Fetch error:", err)
      })
  }, [])

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      {/* Contenedor centrado con ancho máximo */}
      <div style={{ width: "100%", maxWidth: "1200px", padding: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
          Productos
        </h1>

        {/* Grid con tarjetas adaptables */}
        <div
          style={{
            display: "grid",
            gap: "2rem", // más espacio entre tarjetas
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          }}
        >
          {products.map((product) => (
            <Link href={`/dk/products/${product.id}`} key={product.id}>
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "1rem",
                  height: "350px" ,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "box-shadow 0.2s",
                }}
              >
                {/* Imagen que ocupa todo el ancho de la tarjeta */}
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />

                {/* Título */}
                <h2 style={{ marginTop: "0.5rem", textAlign: "center" }}>
                  {product.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
