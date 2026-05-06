import React from "react";
import { Table, Button, Tag } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { LiveBadge } from "../../components/common/LiveBadge";

const sampleCustomers = [
  { id: "1", name: "Alina Carter", email: "alina.carter@gmail.com", phone: "(338)-123-4567", orders_count: 3 },
  { id: "2", name: "Marco Rossi", email: "marco.rossi@example.com", phone: "+39 123 456 7890", orders_count: 7 },
  { id: "3", name: "Sarah Connor", email: "sarah.c@example.com", phone: "+1 555 0123", orders_count: 12 },
  { id: "4", name: "Jan Kowalski", email: "jan.k@wp.pl", phone: "+48 500 123 456", orders_count: 5 },
];

export const CustomersPage: React.FC = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#0D3D2B", margin: 0 }}>Customers</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <LiveBadge />
          <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: "#2ECC8F", borderColor: "#2ECC8F" }}>
            Add customer
          </Button>
        </div>
      </div>

      <Table
        dataSource={sampleCustomers}
        rowKey="id"
        style={{ backgroundColor: "#FFFFFF", borderRadius: 12 }}
        bordered
        columns={[
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text: string) => <span style={{ fontWeight: 500, color: "#0D3D2B" }}>{text}</span>,
          },
          { title: "Email", dataIndex: "email", key: "email" },
          { title: "Phone", dataIndex: "phone", key: "phone" },
          {
            title: "Orders",
            dataIndex: "orders_count",
            key: "orders_count",
            render: (count: number) => <Tag>{count}</Tag>,
          },
          {
            title: "Action",
            key: "action",
            render: () => (
              <span style={{ display: "flex", gap: 8 }}>
                <Button type="text" icon={<EditOutlined />} />
                <Button type="text" icon={<DeleteOutlined />} danger />
              </span>
            ),
          },
        ]}
      />
    </div>
  );
};
