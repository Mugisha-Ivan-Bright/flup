import React, { useState } from "react";
import { Tabs, Input, Button, Select, Avatar } from "antd";
import { PhoneOutlined, CalendarOutlined, ClockCircleOutlined, InfoCircleOutlined, MessageOutlined } from "@ant-design/icons";
import { ProductLineItem } from "./ProductLineItem";

// Sample data matching reference images exactly
const orderDetails = {
  order_id: "DSD15879",
  customer: {
    name: "Alina",
    surname: "Carter",
    email: "alina.carter@gmail.com",
    phone: "(338)-123-4567",
    flag: "🇮🇹"
  },
  departure: { date: "16 July 2022", time: "07:00 AM" },
  delivery: { date: "17 July 2022", time: "08:00 PM" },
  items: [
    {
      id: "1",
      display_name: "Warm",
      price: "$412.00",
      quantity: 1,
      material: "Acacia, velour, brass",
      color: "#8B4513",
      stock: "France, Paris, stock #11",
      item_id: "dA27sC36",
      dimensions: "H 1050 mm, W 870 mm, D 960 mm",
      thumbnails: [
        "https://picsum.photos/seed/warm1/60/60",
        "https://picsum.photos/seed/warm2/60/60",
        "https://picsum.photos/seed/warm3/60/60",
        "https://picsum.photos/seed/warm4/60/60"
      ],
    },
    {
      id: "2",
      display_name: "Earth",
      price: "$1,412.00",
      quantity: 2,
      material: "Walnut, brass, granite",
      color: "#696969",
      stock: "France, Dijon, stock #1",
      item_id: "dP26sCO6",
      dimensions: "H 735 mm, W 600 mm, D 500 mm",
      thumbnails: [
        "https://picsum.photos/seed/earth1/60/60",
        "https://picsum.photos/seed/earth2/60/60",
        "https://picsum.photos/seed/earth3/60/60",
        "https://picsum.photos/seed/earth4/60/60"
      ],
    },
  ],
  driver: {
    name: "Drew Cano",
    id: "2156-85-7458",
    avatar: "https://picsum.photos/seed/driver1/40/40"
  },
  shipping: {
    country: "France",
    zip: "75016",
    flag: "🇫🇷"
  },
  total: "$3,763.20"
};

export const EditOrderDrawer: React.FC<{
  orderId?: string | null;
  onClose: () => void;
}> = ({ orderId, onClose }) => {
  const [activeTab, setActiveTab] = useState("1");

  if (!orderId) {
    return (
      <div style={{ padding: 20, textAlign: "center", color: "#9B9B9B" }}>
        Select an order to edit
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{
        padding: "16px 20px",
        borderBottom: "1px solid #E8E8E8",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <span style={{ fontSize: 20, fontWeight: 600, color: "#0D3D2B" }}>Edit order</span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 14, color: "#9B9B9B" }}>{orderDetails.order_id}</span>
          <Button type="text" size="small" style={{ color: "#9B9B9B" }}>Edit</Button>
          <Button type="text" size="small" style={{ color: "#9B9B9B" }}>⋯</Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        style={{ padding: "0 20px" }}
        items={[
          { key: "1", label: "Order info" },
          { key: "2", label: "Route info" },
        ]}
        tabBarStyle={{
          borderBottom: "1px solid #E8E8E8",
          marginBottom: 0,
        }}
      />

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
        {activeTab === "1" && (
          <div>
            {/* Product Details Section */}
            <div style={{
              fontSize: 13,
              color: "#9B9B9B",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginBottom: 12
            }}>
              Product details
            </div>

            {orderDetails.items.map((item) => (
              <ProductLineItem key={item.id} item={item} />
            ))}

            {/* Total */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              fontSize: 14,
              color: "#1A1A1A",
              borderTop: "1px solid #E8E8E8",
              marginTop: 12
            }}>
              <span>
                Total <InfoCircleOutlined style={{ color: "#9B9B9B", marginLeft: 4 }} />
              </span>
              <span style={{ fontWeight: 600, color: "#0D3D2B", fontSize: 16 }}>
                {orderDetails.total}
              </span>
            </div>

            {/* Customer Details */}
            <div style={{
              fontSize: 13,
              color: "#9B9B9B",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginTop: 24,
              marginBottom: 12
            }}>
              Customer details
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase" }}>Name</div>
                <Input
                  value={orderDetails.customer.name}
                  style={{ height: 40, borderRadius: 8, marginTop: 4 }}
                />
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase" }}>Surname</div>
                <Input
                  value={orderDetails.customer.surname}
                  style={{ height: 40, borderRadius: 8, marginTop: 4 }}
                />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase" }}>Email</div>
                <Input
                  value={orderDetails.customer.email}
                  style={{ height: 40, borderRadius: 8, marginTop: 4 }}
                />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase" }}>Phone number</div>
                <Input
                  value={`${orderDetails.customer.flag} ${orderDetails.customer.phone}`}
                  prefix={<PhoneOutlined />}
                  style={{ height: 40, borderRadius: 8, marginTop: 4 }}
                />
              </div>
            </div>

            {/* Departure Date */}
            <div style={{
              fontSize: 13,
              color: "#9B9B9B",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginBottom: 12
            }}>
              Departure date
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <Input
                value={orderDetails.departure.date}
                prefix={<CalendarOutlined />}
                style={{ flex: 1, height: 40, borderRadius: 8 }}
              />
              <Input
                value={orderDetails.departure.time}
                prefix={<ClockCircleOutlined />}
                style={{ flex: 1, height: 40, borderRadius: 8 }}
              />
            </div>

            {/* Delivery Date */}
            <div style={{
              fontSize: 13,
              color: "#9B9B9B",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginBottom: 12
            }}>
              Delivery date
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <Input
                value={orderDetails.delivery.date}
                prefix={<CalendarOutlined />}
                style={{ flex: 1, height: 40, borderRadius: 8 }}
              />
              <Input
                value={orderDetails.delivery.time}
                prefix={<ClockCircleOutlined />}
                style={{ flex: 1, height: 40, borderRadius: 8 }}
              />
            </div>
          </div>
        )}

        {activeTab === "2" && (
          <div>
            {/* Shipping Address */}
            <div style={{
              fontSize: 11,
              color: "#9B9B9B",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginBottom: 4
            }}>
              Shipping address
            </div>
            <Select
              defaultValue="Home"
              style={{ width: "100%", height: 40, marginBottom: 16 }}
            />

            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase" }}>Country</div>
                <Input
                  value={`${orderDetails.shipping.flag} ${orderDetails.shipping.country}`}
                  style={{ height: 40, borderRadius: 8, marginTop: 4 }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase" }}>ZIP code</div>
                <Input
                  value={orderDetails.shipping.zip}
                  style={{ height: 40, borderRadius: 8, marginTop: 4 }}
                />
              </div>
            </div>

            {/* Driver Section */}
            <div style={{
              fontSize: 13,
              color: "#9B9B9B",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginTop: 24,
              marginBottom: 12
            }}>
              Driver
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <Avatar src={orderDetails.driver.avatar} size={40} />
              <div>
                <div style={{ fontSize: 11, color: "#9B9B9B" }}>Driver</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: "#0D3D2B" }}>
                  {orderDetails.driver.name}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <Button
                type="primary"
                icon={<PhoneOutlined />}
                style={{ backgroundColor: "#2ECC8F", borderColor: "#2ECC8F" }}
              >
                Call
              </Button>
              <Button icon={<MessageOutlined />}>Chat</Button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase" }}>ID number</div>
                <div style={{ fontSize: 14, color: "#1A1A1A" }}>{orderDetails.driver.id}</div>
              </div>
            </div>

            {/* Route */}
            <div style={{
              fontSize: 11,
              color: "#9B9B9B",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginTop: 24,
              marginBottom: 4
            }}>
              Route
            </div>
            <Input.TextArea rows={3} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "16px 20px",
          borderTop: "1px solid #E8E8E8",
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
        }}
      >
        <Button
          onClick={onClose}
          style={{ height: 36, borderRadius: 8, border: "1px solid #E8E8E8" }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          style={{ height: 36, borderRadius: 8, backgroundColor: "#2ECC8F", borderColor: "#2ECC8F" }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
