"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

interface Product {
  id: string
  title: string
  thumbnail: string
  description?: string
  variants?: {
    prices?: {
      amount: number
    }[]
  }[]
}

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:9000/store/products/${id}`, {
      headers: {
        "x-publishable-api-key": "pk_cc80fa97fa885540255a85091ded517f87ab2c01cd294715b4a8963423aa7977",
      },
    })
      .then((res) => res.json())
      .then((data) => setProduct(data.product))
  }, [id])

  if (!product) {
    return <p>Cargando...</p>
  }

  return (
    <div style={{ padding: "2rem" }}>
      {/* Contenedor principal en "flex" para imagen izquierda + texto derecha */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
        {/* Imagen a la izquierda */}
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{
            width: "400px",
            height: "auto",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />

        {/* Sección de texto a la derecha */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
            {product.title}
          </h1>

          {/* Si querés mostrar el precio, descomenta: 
          <p style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "1rem" }}>
            {((product.variants?.[0]?.prices?.[0]?.amount ?? 0) / 100).toFixed(2)} €
          </p> 
          */}

          <p style={{ lineHeight: "1.5" }}>{product.description}</p>
        </div>
      </div>
    </div>
  )
}
