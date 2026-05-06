import React from "react";
import { Table, Button, Tag } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { LiveBadge } from "../../components/common/LiveBadge";

const sampleTaxes = [
  { id: "1", name: "VAT Standard", rate: "23%", region: "EU", status: "Active" },
  { id: "2", name: "VAT Reduced", rate: "8%", region: "EU", status: "Active" },
  { id: "3", name: "Sales Tax", rate: "7.5%", region: "US", status: "Active" },
  { id: "4", name: "GST", rate: "18%", region: "IN", status: "Inactive" },
];

const statusColors: Record<string, string> = {
  Active: "#2ECC8F",
  Inactive: "#C4C4C4",
};

export const TaxesPage: React.FC = () => {
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
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#0D3D2B", margin: 0 }}>Taxes</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <LiveBadge />
          <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: "#2ECC8F", borderColor: "#2ECC8F" }}>
            Add tax
          </Button>
        </div>
      </div>

      <Table
        dataSource={sampleTaxes}
        rowKey="id"
        style={{ backgroundColor: "#FFFFFF", borderRadius: 12 }}
        bordered
        columns={[
          { title: "Name", dataIndex: "name", key: "name", render: (text: string) => <span style={{ fontWeight: 500, color: "#0D3D2B" }}>{text}</span> },
          { title: "Rate", dataIndex: "rate", key: "rate", render: (text: string) => <span style={{ fontWeight: 600, color: "#0D3D2B" }}>{text}</span> },
          { title: "Region", dataIndex: "region", key: "region" },
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
