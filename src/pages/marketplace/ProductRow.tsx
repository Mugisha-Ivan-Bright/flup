import React, { useState } from "react";
import { Checkbox, Button, Modal, Form, Input } from "antd";
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
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = () => {
    form.setFieldsValue({
      display_name: product.display_name,
      price: product.price,
      material: product.material,
      dimensions: product.dimensions,
      category: product.category,
    });
    setEditModalOpen(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      console.log("Saving product:", product.id, values);
      setEditModalOpen(false);
    });
  };

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
          onClick={handleEdit}
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

      <Modal
        title="Edit Product"
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        onOk={handleSave}
        okText="Save"
        cancelText="Cancel"
        okButtonProps={{ style: { backgroundColor: "#2ECC8F", borderColor: "#2ECC8F" } }}
        centered
        width={480}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="display_name" label="Display Name" rules={[{ required: true }]}>
            <Input style={{ height: 40, borderRadius: 8 }} />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input style={{ height: 40, borderRadius: 8 }} />
          </Form.Item>
          <Form.Item name="material" label="Material" rules={[{ required: true }]}>
            <Input style={{ height: 40, borderRadius: 8 }} />
          </Form.Item>
          <Form.Item name="dimensions" label="Dimensions" rules={[{ required: true }]}>
            <Input style={{ height: 40, borderRadius: 8 }} />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Input style={{ height: 40, borderRadius: 8 }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
