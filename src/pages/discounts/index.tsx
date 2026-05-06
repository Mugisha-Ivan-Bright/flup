import React from "react";
import { Table, Button, Tag } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { LiveBadge } from "../../components/common/LiveBadge";

const sampleDiscounts = [
  { id: "1", code: "SUMMER20", type: "Percentage", value: "20%", expires_at: "2026-08-31", status: "Active" },
  { id: "2", code: "WELCOME10", type: "Fixed", value: "$10", expires_at: "2026-12-31", status: "Active" },
  { id: "3", code: "CLEAR50", type: "Percentage", value: "50%", expires_at: "2025-12-31", status: "Expired" },
];

const statusColors: Record<string, string> = {
  Active: "#2ECC8F",
  Expired: "#E24B4A",
  Scheduled: "#5B9BD5",
};

export const DiscountsPage: React.FC = () => {
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
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#0D3D2B", margin: 0 }}>Discounts</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <LiveBadge />
          <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: "#2ECC8F", borderColor: "#2ECC8F" }}>
            Add discount
          </Button>
        </div>
      </div>

      <Table
        dataSource={sampleDiscounts}
        rowKey="id"
        style={{ backgroundColor: "#FFFFFF", borderRadius: 12 }}
        bordered
        columns={[
          { title: "Code", dataIndex: "code", key: "code", render: (text: string) => <span style={{ fontWeight: 600, color: "#0D3D2B" }}>{text}</span> },
          { title: "Type", dataIndex: "type", key: "type" },
          { title: "Value", dataIndex: "value", key: "value" },
          { title: "Expires", dataIndex: "expires_at", key: "expires_at" },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
              <Tag style={{ backgroundColor: statusColors[status] + "20", color: statusColors[status], border: `1px solid ${statusColors[status]}` }}>
                {status}
              </Tag>
            ),
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
