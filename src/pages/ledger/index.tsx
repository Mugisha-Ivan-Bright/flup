import React, { useState, useMemo, useEffect } from "react";
import { Table, Tag, Modal, Form, Input, InputNumber, Select, Button, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";
import { useList, useDelete } from "@refinedev/core";
import { useSearchParams, useNavigate } from "react-router";
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
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<any>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutate: deleteEntry } = useDelete();

  useEffect(() => {
    if (searchParams.get("action") === "add") {
      setEditModalOpen(true);
    }
  }, [searchParams]);

  const handleAdd = () => {
    setSearchParams({ action: "add" });
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setEditingEntry(null);
    setSearchParams({});
  };

  const handleEdit = (entry: any) => {
    setEditingEntry(entry);
    form.setFieldsValue({
      description: entry.description,
      amount: entry.amount,
      type: entry.type,
    });
    setEditModalOpen(true);
  };

  const handleDelete = (id: string, description: string) => {
    Modal.confirm({
      title: "Are you sure?",
      content: `Delete entry "${description}"? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        deleteEntry(
          { resource: "ledger", id },
          {
            onSuccess: () => message.success("Ledger entry deleted successfully"),
          }
        );
      },
    });
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      console.log("Saving ledger entry:", editingEntry?.id, values);
      handleCloseModal();
      message.success("Ledger entry saved successfully");
    });
  };

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedLedger = useMemo(() => {
    let result = [...sampleLedger];
    if (sortConfig) {
      const { key, direction } = sortConfig;
      result.sort((a: any, b: any) => {
        if (key === "amount") {
          const aVal = parseFloat(a[key].replace(/[^0-9.-]+/g, ""));
          const bVal = parseFloat(b[key].replace(/[^0-9.-]+/g, ""));
          return direction === "asc" ? aVal - bVal : bVal - aVal;
        }
        if (key === "balance") {
          const aVal = parseFloat(a[key].replace(/[^0-9.-]+/g, ""));
          const bVal = parseFloat(b[key].replace(/[^0-9.-]+/g, ""));
          return direction === "asc" ? aVal - bVal : bVal - aVal;
        }
        const aVal = String(a[key] || "");
        const bVal = String(b[key] || "");
        const comparison = aVal.localeCompare(bVal);
        return direction === "asc" ? comparison : -comparison;
      });
    }
    return result;
  }, [sortConfig]);

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
        <h1 style={{ fontSize: 20, fontWeight: 600, color: "#0D3D2B", margin: 0 }}>Ledger</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <LiveBadge />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ backgroundColor: "#2ECC8F", borderColor: "#2ECC8F" }}>
            Add entry
          </Button>
        </div>
      </div>

      <Table
        dataSource={sortedLedger}
        rowKey="id"
        style={{ backgroundColor: "#FFFFFF", borderRadius: 12 }}
        bordered
        columns={[
          {
            title: () => (
              <span style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }} onClick={() => handleSort("date")}>
                Date
                {sortConfig?.key === "date" && (
                  sortConfig.direction === "asc" ? <SortAscendingOutlined style={{ fontSize: 12 }} /> : <SortDescendingOutlined style={{ fontSize: 12 }} />
                )}
              </span>
            ),
            dataIndex: "date",
            key: "date",
            render: (text: string) => <span style={{ color: "#9B9B9B", fontSize: 13 }}>{text}</span>,
          },
          {
            title: () => (
              <span style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }} onClick={() => handleSort("description")}>
                Description
                {sortConfig?.key === "description" && (
                  sortConfig.direction === "asc" ? <SortAscendingOutlined style={{ fontSize: 12 }} /> : <SortDescendingOutlined style={{ fontSize: 12 }} />
                )}
              </span>
            ),
            dataIndex: "description",
            key: "description",
            render: (text: string) => <span style={{ fontWeight: 500, color: "#0D3D2B" }}>{text}</span>,
          },
          {
            title: () => (
              <span style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }} onClick={() => handleSort("amount")}>
                Amount
                {sortConfig?.key === "amount" && (
                  sortConfig.direction === "asc" ? <SortAscendingOutlined style={{ fontSize: 12 }} /> : <SortDescendingOutlined style={{ fontSize: 12 }} />
                )}
              </span>
            ),
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
          {
            title: () => (
              <span style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }} onClick={() => handleSort("balance")}>
                Balance
                {sortConfig?.key === "balance" && (
                  sortConfig.direction === "asc" ? <SortAscendingOutlined style={{ fontSize: 12 }} /> : <SortDescendingOutlined style={{ fontSize: 12 }} />
                )}
              </span>
            ),
            dataIndex: "balance",
            key: "balance",
            render: (text: string) => <span style={{ fontWeight: 600, color: "#0D3D2B" }}>{text}</span>,
          },
          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <span style={{ display: "flex", gap: 8 }}>
                <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                <Button type="text" icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id, record.description)} />
              </span>
            ),
          },
        ]}
      />

      <Modal
        title={editingEntry ? "Edit Ledger Entry" : "Add Ledger Entry"}
        open={editModalOpen}
        onCancel={handleCloseModal}
        onOk={handleSave}
        okText="Save"
        cancelText="Cancel"
        okButtonProps={{ style: { backgroundColor: "#2ECC8F", borderColor: "#2ECC8F" } }}
        centered
        width={480}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input style={{ height: 40, borderRadius: 8 }} />
          </Form.Item>
          <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
            <Input style={{ height: 40, borderRadius: 8 }} placeholder="e.g., +$1,000.00 or -$500.00" />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select
              style={{ height: 40, borderRadius: 8 }}
              options={[
                { label: "Income", value: "Income" },
                { label: "Expense", value: "Expense" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
