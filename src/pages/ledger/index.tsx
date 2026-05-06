import React from "react";
import { Table, Tag } from "antd";
import { LiveBadge } from "../../components/common/LiveBadge";

const sampleLedger = [
  { id: "1", date: "2026-05-01", description: "Order #DSD15879", amount: "+$1,856.00", type: "Income", balance: "$12,456.00" },
  { id: "2", date: "2026-05-02", description: "Shipping fee", amount: "+$120.00", type: "Income", balance: "$12,576.00" },
  { id: "3", date: "2026-05-03", description: "Refund #DSD15874", amount: "-$429.00", type: "Expense", balance: "$12,147.00" },
  { id: "4", date: "2026-05-04", description: "Order #DSD15880", amount: "+$429.00", type: "Income", balance: "$12,576.00" },
];

const typeColors: Record<string, string> = {
  Income: "#2ECC8F",
  Expense: "#E24B4A",
};

export const LedgerPage: React.FC = () => {
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
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#0D3D2B", margin: 0 }}>Ledger</h1>
        <LiveBadge />
      </div>

      <Table
        dataSource={sampleLedger}
        rowKey="id"
        style={{ backgroundColor: "#FFFFFF", borderRadius: 12 }}
        bordered
        columns={[
          { title: "Date", dataIndex: "date", key: "date", render: (text: string) => <span style={{ color: "#9B9B9B", fontSize: 13 }}>{text}</span> },
          { title: "Description", dataIndex: "description", key: "description", render: (text: string) => <span style={{ fontWeight: 500, color: "#0D3D2B" }}>{text}</span> },
          {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (text: string) => <span style={{ fontWeight: 600, color: text.startsWith("+") ? "#2ECC8F" : "#E24B4A" }}>{text}</span>,
          },
          {
            title: "Type",
            dataIndex: "type",
            key: "type",
            render: (type: string) => (
              <Tag style={{ backgroundColor: typeColors[type] + "20", color: typeColors[type], border: `1px solid ${typeColors[type]}` }}>
                {type}
              </Tag>
            ),
          },
          { title: "Balance", dataIndex: "balance", key: "balance", render: (text: string) => <span style={{ fontWeight: 600, color: "#0D3D2B" }}>{text}</span> },
        ]}
      />
    </div>
  );
};
