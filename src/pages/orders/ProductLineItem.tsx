import React from "react";

interface ProductLineItemProps {
  item: {
    id: string;
    display_name: string;
    price: string;
    quantity: number;
    material: string;
    color: string;
    stock: string;
    item_id: string;
    dimensions: string;
    thumbnails: string[];
  };
}

export const ProductLineItem: React.FC<ProductLineItemProps> = ({ item }) => {
  return (
    <div
      style={{
        border: "1px solid #E8E8E8",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
      }}
    >
      <div style={{ display: "flex", gap: 12 }}>
        {/* 4 Thumbnails */}
        <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
          {item.thumbnails.slice(0, 4).map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt=""
              style={{
                width: 60,
                height: 60,
                backgroundColor: "#F5F5F5",
                borderRadius: 6,
                objectFit: "contain"
              }}
            />
          ))}
        </div>

        {/* Product Info */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 11,
            color: "#9B9B9B",
            textTransform: "uppercase",
            letterSpacing: 0.5
          }}>
            Display name
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#0D3D2B" }}>
            {item.display_name}
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4px 16px",
            marginTop: 8
          }}>
            <div>
              <div style={{
                fontSize: 11,
                color: "#9B9B9B",
                textTransform: "uppercase"
              }}>
                Material
              </div>
              <div style={{ fontSize: 13, color: "#1A1A1A" }}>
                {item.material}
              </div>
            </div>
            <div>
              <div style={{
                fontSize: 11,
                color: "#9B9B9B",
                textTransform: "uppercase"
              }}>
                Color
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: item.color
                }} />
              </div>
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <div style={{
                fontSize: 11,
                color: "#9B9B9B",
                textTransform: "uppercase"
              }}>
                Stock
              </div>
              <div style={{ fontSize: 13, color: "#1A1A1A" }}>
                {item.stock}
              </div>
            </div>
          </div>
        </div>

        {/* Quantity & Price */}
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{
            fontSize: 11,
            color: "#9B9B9B",
            textTransform: "uppercase"
          }}>
            Quantity
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, color: "#1A1A1A" }}>
            {item.quantity}
          </div>
          <div style={{
            fontSize: 11,
            color: "#9B9B9B",
            textTransform: "uppercase",
            marginTop: 8
          }}>
            Price
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#0D3D2B" }}>
            {item.price}
          </div>
        </div>
      </div>

      {/* Item Details */}
      <div style={{ fontSize: 13, color: "#9B9B9B", marginTop: 8 }}>
        Item ID {item.item_id}
      </div>
      <div style={{ fontSize: 13, color: "#9B9B9B" }}>
        Dimensions {item.dimensions}
      </div>
    </div>
  );
};
