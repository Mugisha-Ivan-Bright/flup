import React, { useState } from "react";
import { Tabs, Input, Select, Avatar, Button, Modal, Form } from "antd";
import {
  EditOutlined,
  PrinterOutlined,
  DeleteOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  MessageOutlined,
} from "@ant-design/icons";

const orderDetailsDb: Record<string, any> = {
  "1": {
    order_id: "DSD15879",
    customer: { name: "Alina", surname: "Carter", email: "alina.carter@gmail.com", phone: "(338)-123-4567", flag: "🇮🇹" },
    departure: { date: "16 July 2022", time: "07:00 AM" },
    delivery: { date: "17 July 2022", time: "08:00 PM" },
    items: [
      { id: "1", display_name: "Warm", price: "$412.00", quantity: 1, material: "Acacia, velour, brass", color: "#8B4513", stock: "France, Paris, stock #11", item_id: "dA27sC36", dimensions: "H 1050 mm, W 870 mm, D 960 mm", thumbnails: ["https://picsum.photos/seed/warm1/64/64", "https://picsum.photos/seed/warm2/64/64", "https://picsum.photos/seed/warm3/64/64", "https://picsum.photos/seed/warm4/64/64"] },
    ],
    driver: { name: "Drew Cano", id: "2156-85-7458", avatar: "https://picsum.photos/seed/driver1/36/36" },
    shipping: { country: "France", zip: "75016", flag: "🇫🇷" },
    total: "$3,763.20",
  },
  "2": {
    order_id: "DSD15880",
    customer: { name: "Marco", surname: "Rossi", email: "marco.rossi@gmail.com", phone: "(339)-987-6543", flag: "🇮🇹" },
    departure: { date: "18 July 2022", time: "09:00 AM" },
    delivery: { date: "19 July 2022", time: "02:00 PM" },
    items: [
      { id: "2", display_name: "Luna, Breeze", price: "$2,150.00", quantity: 2, material: "Walnut, brass, granite", color: "#696969", stock: "France, Lyon, stock #2", item_id: "dP26sCO6", dimensions: "H 735 mm, W 600 mm, D 500 mm", thumbnails: ["https://picsum.photos/seed/earth1/64/64", "https://picsum.photos/seed/earth2/64/64", "https://picsum.photos/seed/earth3/64/64", "https://picsum.photos/seed/earth4/64/64"] },
    ],
    driver: { name: "Drew Cano", id: "2156-85-7458", avatar: "https://picsum.photos/seed/driver1/36/36" },
    shipping: { country: "France", zip: "69002", flag: "🇫🇷" },
    total: "$2,150.00",
  },
  "3": {
    order_id: "DSD15881",
    customer: { name: "Sophie", surname: "Martin", email: "sophie.martin@gmail.com", phone: "(340)-111-2233", flag: "🇫🇷" },
    departure: { date: "20 July 2022", time: "10:00 AM" },
    delivery: { date: "–", time: "–" },
    items: [
      { id: "3", display_name: "Warm", price: "$412.00", quantity: 1, material: "Acacia, velour, brass", color: "#8B4513", stock: "France, Marseille, stock #3", item_id: "dA27sC37", dimensions: "H 1050 mm, W 870 mm, D 960 mm", thumbnails: ["https://picsum.photos/seed/warm1/64/64", "https://picsum.photos/seed/warm2/64/64", "https://picsum.photos/seed/warm3/64/64", "https://picsum.photos/seed/warm4/64/64"] },
    ],
    driver: { name: "Drew Cano", id: "2156-85-7458", avatar: "https://picsum.photos/seed/driver1/36/36" },
    shipping: { country: "France", zip: "13001", flag: "🇫🇷" },
    total: "$412.00",
  },
  "4": {
    order_id: "DSD15882",
    customer: { name: "Pierre", surname: "Dubois", email: "pierre.dubois@gmail.com", phone: "(341)-444-5566", flag: "🇫🇷" },
    departure: { date: "21 July 2022", time: "08:30 AM" },
    delivery: { date: "22 July 2022", time: "05:00 PM" },
    items: [
      { id: "4", display_name: "Earth, Luna", price: "$1,824.00", quantity: 2, material: "Walnut, brass, granite", color: "#696969", stock: "France, Toulouse, stock #4", item_id: "dP26sCO7", dimensions: "H 735 mm, W 600 mm, D 500 mm", thumbnails: ["https://picsum.photos/seed/earth1/64/64", "https://picsum.photos/seed/earth2/64/64", "https://picsum.photos/seed/earth3/64/64", "https://picsum.photos/seed/earth4/64/64"] },
    ],
    driver: { name: "Drew Cano", id: "2156-85-7458", avatar: "https://picsum.photos/seed/driver1/36/36" },
    shipping: { country: "France", zip: "31000", flag: "🇫🇷" },
    total: "$1,824.00",
  },
  "5": {
    order_id: "DSD15883",
    customer: { name: "Luca", surname: "Bianchi", email: "luca.bianchi@gmail.com", phone: "(342)-777-8899", flag: "🇮🇹" },
    departure: { date: "23 July 2022", time: "11:00 AM" },
    delivery: { date: "24 July 2022", time: "03:00 PM" },
    items: [
      { id: "5", display_name: "Breeze", price: "$850.00", quantity: 1, material: "Oak, steel, marble", color: "#8B7355", stock: "France, Nice, stock #5", item_id: "dP27sC08", dimensions: "H 800 mm, W 700 mm, D 600 mm", thumbnails: ["https://picsum.photos/seed/breeze1/64/64", "https://picsum.photos/seed/breeze2/64/64", "https://picsum.photos/seed/breeze3/64/64", "https://picsum.photos/seed/breeze4/64/64"] },
    ],
    driver: { name: "Drew Cano", id: "2156-85-7458", avatar: "https://picsum.photos/seed/driver1/36/36" },
    shipping: { country: "France", zip: "06000", flag: "🇫🇷" },
    total: "$850.00",
  },
};

export const OrderDetailDrawer: React.FC<{
  orderId: string;
  orderData?: any;
  onClose: () => void;
  onDelete?: () => void;
}> = ({ orderId, orderData, onClose, onDelete }) => {
  const [activeTab, setActiveTab] = useState("order-info");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [form] = Form.useForm();

  const details = orderData?.customer ? orderData : (orderDetailsDb[orderId] || orderDetailsDb["1"]);

  const handleEdit = () => {
    form.setFieldsValue({
      name: details.customer?.name || "",
      surname: details.customer?.surname || "",
      email: details.customer?.email || "",
      phone: details.customer?.phone || "",
    });
    setEditModalOpen(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      console.log("Saving order details:", values);
      setEditModalOpen(false);
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Drawer Header */}
      <div
        style={{
          height: 52,
          padding: "0 20px",
          borderBottom: "1px solid #E8E8E8",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 600, color: "#0D3D2B" }}>{details.order_id || orderId}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={handleEdit}
            style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
          />
            <Button
            type="text"
            icon={<PrinterOutlined />}
            onClick={onClose}
            style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={onDelete}
            style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#E24B4A" }}
          />
        </div>
      </div>

      {/* Tab System */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          { key: "order-info", label: "Order info" },
          { key: "route-info", label: "Route info" },
        ]}
        style={{ padding: "0 20px" }}
        tabBarStyle={{ borderBottom: "1px solid #E8E8E8", marginBottom: 0 }}
        className="order-detail-tabs"
      />

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {activeTab === "order-info" && (
          <div>
            {/* Product Details Section */}
            <div style={{ fontSize: 13, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 12 }}>
              Product details
            </div>

            {(details.items || []).map((item: any) => (
              <div key={item.id} style={{ backgroundColor: "#FAFAFA", borderRadius: 8, padding: 16, marginBottom: 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
                  {(item.thumbnails || []).map((url: string, idx: number) => (
                    <div key={idx} style={{ width: 64, height: 64, borderRadius: 8, backgroundColor: "#F5F5F5", overflow: "hidden" }}>
                      <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 16px" }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em" }}>Display name</div>
                    <div style={{ fontSize: 13, color: "#1A1A1A", fontWeight: 500, marginTop: 2 }}>{item.display_name}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em" }}>Item ID</div>
                    <div style={{ fontSize: 13, color: "#1A1A1A", fontWeight: 500, marginTop: 2 }}>{item.item_id}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em" }}>Material</div>
                    <div style={{ fontSize: 13, color: "#1A1A1A", marginTop: 2 }}>{item.material}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em" }}>Dimensions</div>
                    <div style={{ fontSize: 13, color: "#1A1A1A", marginTop: 2 }}>{item.dimensions}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em" }}>Color</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                      <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: item.color, display: "inline-block", border: "1px solid #E8E8E8" }} />
                      <span style={{ fontSize: 13, color: "#1A1A1A" }}>{item.color}</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em" }}>Quantity</div>
                    <div style={{ fontSize: 13, color: "#1A1A1A", fontWeight: 500, marginTop: 2 }}>{item.quantity}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em" }}>Stock</div>
                    <div style={{ fontSize: 13, color: "#1A1A1A", marginTop: 2 }}>{item.stock}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em" }}>Price</div>
                    <div style={{ fontSize: 13, color: "#0D3D2B", fontWeight: 500, marginTop: 2 }}>{item.price}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Total */}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid #E8E8E8", marginTop: 8 }}>
              <span style={{ fontSize: 14, color: "#1A1A1A" }}>Total</span>
              <span style={{ fontWeight: 700, color: "#0D3D2B", fontSize: 18 }}>{details.total}</span>
            </div>

            {/* Customer Details Section */}
            <div style={{ fontSize: 13, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em", marginTop: 24, marginBottom: 12 }}>
              Customer details
            </div>
            <div style={{ backgroundColor: "#FAFAFA", borderRadius: 8, padding: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 16px", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em" }}>Name</div>
                <div style={{ fontSize: 13, color: "#0D3D2B", fontWeight: 500, marginTop: 2 }}>{details.customer?.name}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em" }}>Surname</div>
                <div style={{ fontSize: 13, color: "#0D3D2B", fontWeight: 500, marginTop: 2 }}>{details.customer?.surname}</div>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em" }}>Email</div>
                <div style={{ fontSize: 13, color: "#0D3D2B", fontWeight: 500, marginTop: 2 }}>{details.customer?.email}</div>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em" }}>Phone number</div>
                <div style={{ fontSize: 13, color: "#0D3D2B", fontWeight: 500, marginTop: 2 }}>{details.customer?.flag} {details.customer?.phone}</div>
              </div>
            </div>

            {/* Dates Section */}
            <div style={{ fontSize: 13, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em", marginTop: 24, marginBottom: 12 }}>Dates</div>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1, backgroundColor: "#FAFAFA", borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>Departure</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <CalendarOutlined style={{ color: "#9B9B9B", fontSize: 12 }} />
                  <span style={{ fontSize: 13, color: "#1A1A1A" }}>{details.departure?.date}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <ClockCircleOutlined style={{ color: "#9B9B9B", fontSize: 12 }} />
                  <span style={{ fontSize: 13, color: "#1A1A1A" }}>{details.departure?.time}</span>
                </div>
              </div>
              <div style={{ flex: 1, backgroundColor: "#FAFAFA", borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>Delivery</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <CalendarOutlined style={{ color: "#9B9B9B", fontSize: 12 }} />
                  <span style={{ fontSize: 13, color: "#1A1A1A" }}>{details.delivery?.date}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <ClockCircleOutlined style={{ color: "#9B9B9B", fontSize: 12 }} />
                  <span style={{ fontSize: 13, color: "#1A1A1A" }}>{details.delivery?.time}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "route-info" && (
          <div>
            <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>Shipping address</div>
            <Select defaultValue="Home" style={{ width: "100%", height: 40, marginBottom: 16 }} options={[{ label: "Home", value: "home" }, { label: "Office", value: "office" }]} />
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em" }}>Country</div>
                <div style={{ height: 40, borderRadius: 8, border: "1px solid #E8E8E8", padding: "0 12px", display: "flex", alignItems: "center", marginTop: 4, backgroundColor: "#FFFFFF" }}>
                  {details.shipping?.flag} {details.shipping?.country}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em" }}>ZIP code</div>
                <div style={{ height: 40, borderRadius: 8, border: "1px solid #E8E8E8", padding: "0 12px", display: "flex", alignItems: "center", marginTop: 4, backgroundColor: "#FFFFFF" }}>
                  {details.shipping?.zip}
                </div>
              </div>
            </div>

            <div style={{ fontSize: 13, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em", marginTop: 24, marginBottom: 12 }}>Driver</div>
            <div style={{ backgroundColor: "#FAFAFA", borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <Avatar src={details.driver?.avatar} size={36} />
                <div>
                  <div style={{ fontSize: 11, color: "#9B9B9B" }}>Driver</div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: "#0D3D2B" }}>{details.driver?.name}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <Button type="primary" icon={<PhoneOutlined />} style={{ backgroundColor: "#2ECC8F", borderColor: "#2ECC8F", height: 36, borderRadius: 8 }}>Call</Button>
                <Button icon={<MessageOutlined />} style={{ height: 36, borderRadius: 8 }}>Chat</Button>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em" }}>ID number</div>
                <div style={{ fontSize: 14, color: "#1A1A1A", marginTop: 2 }}>{details.driver?.id}</div>
              </div>
            </div>

            <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>Route</div>
            <Input.TextArea rows={3} style={{ borderRadius: 8 }} />
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal
        title="Edit Order"
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
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input style={{ height: 40, borderRadius: 8 }} />
          </Form.Item>
          <Form.Item name="surname" label="Surname" rules={[{ required: true }]}>
            <Input style={{ height: 40, borderRadius: 8 }} />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input style={{ height: 40, borderRadius: 8 }} />
          </Form.Item>
          <Form.Item name="phone" label="Phone number" rules={[{ required: true }]}>
            <Input style={{ height: 40, borderRadius: 8 }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
