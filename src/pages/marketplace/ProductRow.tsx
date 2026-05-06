import React from "react";
import { Checkbox, Button } from "antd";
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { StatusDot } from "../../components/common/StatusDot";

interface ProductRowProps {
  product: {
    id: string;
    display_name: string;
    item_id: string;
    price: string;
    material: string;
    dimensions: string;
    category: string;
    thumbnail_url?: string;
  };
  showDivider: boolean;
  onDelete?: () => void;
}

export const ProductRow: React.FC<ProductRowProps> = ({ product, showDivider, onDelete }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "16px 20px",
        borderBottom: showDivider ? "1px solid #E8E8E8" : "none",
        gap: 16,
      }}
    >
      <Checkbox />
      <div
        style={{
          width: 100,
          height: 100,
          backgroundColor: "#F5F5F5",
          borderRadius: 8,
          overflow: "hidden",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {product.thumbnail_url ? (
          <img
            src={product.thumbnail_url}
            alt={product.display_name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          <div style={{ color: "#9B9B9B", fontSize: 12 }}>No image</div>
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: 0.5 }}>
          Display name
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#0D3D2B" }}>{product.display_name}</div>
        <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: 0.5, marginTop: 8 }}>
          Item ID
        </div>
        <div style={{ fontSize: 14, fontWeight: 500, color: "#1A1A1A" }}>{product.item_id}</div>
        <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: 0.5, marginTop: 8 }}>
          Price
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#0D3D2B" }}>{product.price}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px", minWidth: 300 }}>
        <div>
          <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Material
          </div>
          <div style={{ fontSize: 14, color: "#0D3D2B" }}>{product.material}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Dimensions
          </div>
          <div style={{ fontSize: 13, color: "#1A1A1A" }}>{product.dimensions}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Category
          </div>
          <div style={{ fontSize: 14, color: "#0D3D2B" }}>{product.category}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => window.location.href = `/marketplace/edit/${product.id}`}
          style={{ width: 28, height: 28 }}
        />
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={onDelete}
          style={{ width: 28, height: 28 }}
        />
      </div>
    </div>
  );
};
