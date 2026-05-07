import React, { useState, useMemo, useEffect } from "react";
import { Table, Button, Tag, Modal, Form, Input, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, AppstoreOutlined, UnorderedListOutlined, SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";
import { useList, useDelete } from "@refinedev/core";
import { LiveBadge } from "../../components/common/LiveBadge";
import { useSearchParams, useNavigate } from "react-router";
import "../../styles/customers.css";

const sampleCustomers = [
  { id: "1", name: "Alina Carter", email: "alina.carter@gmail.com", phone: "(338)-123-4567", orders_count: 3 },
  { id: "2", name: "Marco Rossi", email: "marco.rossi@example.com", phone: "+39 123 456 7890", orders_count: 7 },
  { id: "3", name: "Sarah Connor", email: "sarah.c@example.com", phone: "+1 555 0123", orders_count: 12 },
  { id: "4", name: "Jan Kowalski", email: "jan.k@wp.pl", phone: "+48 500 123 456", orders_count: 5 },
];

export const CustomersPage: React.FC = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [viewingCustomerId, setViewingCustomerId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutate: deleteCustomer } = useDelete();

  useEffect(() => {
    const action = searchParams.get("action");
    if (action === "add") {
      setEditingCustomer(null);
      setEditModalOpen(true);
    } else if (action === "edit" && searchParams.get("id")) {
      const customerId = searchParams.get("id");
      const customer = sampleCustomers.find(c => c.id === customerId);
      if (customer) {
        setEditingCustomer(customer);
        form.setFieldsValue({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
        });
        setEditModalOpen(true);
      }
    }
  }, [searchParams]);

  const handleAddCustomer = () => {
    setSearchParams({ action: "add" });
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setEditingCustomer(null);
    setSearchParams({});
  };

  const handleDelete = (id: string, name: string) => {
    Modal.confirm({
      title: "Are you sure?",
      content: `Delete customer "${name}"? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        deleteCustomer(
          { resource: "customers", id },
          {
            onSuccess: () => message.success("Customer deleted successfully"),
          }
        );
      },
    });
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      console.log("Saving customer:", editingCustomer?.id, values);
      setEditModalOpen(false);
      message.success("Customer updated successfully");
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

  const sortedCustomers = useMemo(() => {
    let result = [...sampleCustomers];
    if (sortConfig) {
      const { key, direction } = sortConfig;
      result.sort((a: any, b: any) => {
        if (key === "orders_count") {
          const aVal = Number(a[key]);
          const bVal = Number(b[key]);
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

  const viewingCustomer = sampleCustomers.find((c) => c.id === viewingCustomerId);

  if (viewingCustomerId && viewingCustomer) {
    return (
      <div style={{ height: "calc(100vh - 64px)", display: "flex", flexDirection: "column", overflow: "auto" }}>
        <div style={{ padding: "24px 24px 0 24px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <Button onClick={() => setViewingCustomerId(null)} style={{ height: 36, borderRadius: 8 }}>
              ← Back
            </Button>
            <h1 style={{ fontSize: 20, fontWeight: 600, color: "#0D3D2B", margin: 0 }}>{viewingCustomer.name}</h1>
            <span style={{ fontSize: 13, color: "#9B9B9B" }}>{viewingCustomer.email}</span>
          </div>
        </div>

        <div style={{ flex: 1, padding: "0 24px 24px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Customer Info Card */}
            <div style={{ backgroundColor: "#FAFAFA", borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 16 }}>Customer details</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 16px" }}>
                <div>
                  <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em" }}>Name</div>
                  <div style={{ fontSize: 14, color: "#0D3D2B", fontWeight: 500, marginTop: 2 }}>{viewingCustomer.name}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em" }}>Email</div>
                  <div style={{ fontSize: 14, color: "#0D3D2B", fontWeight: 500, marginTop: 2 }}>{viewingCustomer.email}</div>
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em" }}>Phone</div>
                  <div style={{ fontSize: 14, color: "#0D3D2B", fontWeight: 500, marginTop: 2 }}>{viewingCustomer.phone}</div>
                </div>
              </div>
            </div>

            {/* Orders Summary Card */}
            <div style={{ backgroundColor: "#FAFAFA", borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 16 }}>Orders summary</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 36, fontWeight: 700, color: "#0D3D2B" }}>{viewingCustomer.orders_count}</div>
                <div>
                  <div style={{ fontSize: 13, color: "#1A1A1A" }}>Total Orders</div>
                  <div style={{ fontSize: 11, color: "#9B9B9B" }}>Lifetime orders placed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders Section */}
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 13, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 12 }}>Recent orders</div>
            <div style={{ backgroundColor: "#FFFFFF", borderRadius: 12, border: "1px solid #E8E8E8" }}>
              {["DSD15879", "DSD15880", "DSD15881"].map((orderId, idx) => (
                <div key={orderId} style={{ padding: "16px 20px", borderBottom: idx < 2 ? "1px solid #E8E8E8" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, color: "#0D3D2B", fontWeight: 500 }}>{orderId}</span>
                  <Tag>{viewingCustomer.orders_count > 3 ? "Completed" : "In progress"}</Tag>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: "#0D3D2B", margin: 0 }}>Customers</h1>
          <span style={{ fontSize: 13, color: "#9B9B9B" }}>{sampleCustomers.length} customers</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, backgroundColor: "#F0EFF4", borderRadius: 8, padding: "4px" }}>
            <Button
              type={viewMode === "list" ? "primary" : "text"}
              icon={<UnorderedListOutlined />}
              onClick={() => setViewMode("list")}
              size="small"
              style={viewMode === "list" ? { backgroundColor: "#2ECC8F", borderColor: "#2ECC8F" } : {}}
            />
            <Button
              type={viewMode === "grid" ? "primary" : "text"}
              icon={<AppstoreOutlined />}
              onClick={() => setViewMode("grid")}
              size="small"
              style={viewMode === "grid" ? { backgroundColor: "#2ECC8F", borderColor: "#2ECC8F" } : {}}
            />
          </div>
          <LiveBadge />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCustomer} style={{ backgroundColor: "#2ECC8F", borderColor: "#2ECC8F" }}>
            Add customer
          </Button>
        </div>
      </div>

      {viewMode === "list" ? (
        <Table
          dataSource={sortedCustomers}
          rowKey="id"
          style={{ backgroundColor: "#FFFFFF", borderRadius: 12 }}
          bordered
          columns={[
            {
              title: () => (
                <span style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }} onClick={() => handleSort("name")}>
                  Name
                  {sortConfig?.key === "name" && (
                    sortConfig.direction === "asc" ? <SortAscendingOutlined style={{ fontSize: 12 }} /> : <SortDescendingOutlined style={{ fontSize: 12 }} />
                  )}
                </span>
              ),
              dataIndex: "name",
              key: "name",
              render: (text: string) => <span style={{ fontWeight: 500, color: "#0D3D2B" }}>{text}</span>,
            },
            {
              title: () => (
                <span style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }} onClick={() => handleSort("email")}>
                  Email
                  {sortConfig?.key === "email" && (
                    sortConfig.direction === "asc" ? <SortAscendingOutlined style={{ fontSize: 12 }} /> : <SortDescendingOutlined style={{ fontSize: 12 }} />
                  )}
                </span>
              ),
              dataIndex: "email",
              key: "email",
            },
            { title: "Phone", dataIndex: "phone", key: "phone" },
            {
              title: () => (
                <span style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }} onClick={() => handleSort("orders_count")}>
                  Orders
                  {sortConfig?.key === "orders_count" && (
                    sortConfig.direction === "asc" ? <SortAscendingOutlined style={{ fontSize: 12 }} /> : <SortDescendingOutlined style={{ fontSize: 12 }} />
                  )}
                </span>
              ),
              dataIndex: "orders_count",
              key: "orders_count",
              render: (count: number) => <Tag>{count}</Tag>,
            },
            {
              title: "Action",
              key: "action",
              render: (_, record) => (
                <span style={{ display: "flex", gap: 8 }}>
                  <Button type="text" icon={<EyeOutlined />} onClick={() => setViewingCustomerId(record.id)} />
                  <Button type="text" icon={<EditOutlined />} onClick={() => setSearchParams({ action: "edit", id: record.id })} />
                  <Button type="text" icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id, record.name)} />
                </span>
              ),
            },
          ]}
        />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {sortedCustomers.map((customer) => (
            <div key={customer.id} style={{ backgroundColor: "#FFFFFF", borderRadius: 12, border: "1px solid #E8E8E8", padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#0D3D2B" }}>{customer.name}</div>
                  <div style={{ fontSize: 13, color: "#9B9B9B", marginTop: 4 }}>{customer.email}</div>
                </div>
                <span style={{ display: "flex", gap: 4 }}>
                  <Button type="text" icon={<EyeOutlined />} onClick={() => setViewingCustomerId(customer.id)} style={{ width: 28, height: 28 }} />
                  <Button type="text" icon={<EditOutlined />} onClick={() => setSearchParams({ action: "edit", id: customer.id })} style={{ width: 28, height: 28 }} />
                  <Button type="text" icon={<DeleteOutlined />} danger onClick={() => handleDelete(customer.id, customer.name)} style={{ width: 28, height: 28 }} />
                </span>
              </div>
              <div style={{ fontSize: 13, color: "#1A1A1A" }}>{customer.phone}</div>
              <div style={{ marginTop: 12, padding: "8px 12px", backgroundColor: "#FAFAFA", borderRadius: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#0D3D2B" }}>{customer.orders_count}</span>
                <span style={{ fontSize: 12, color: "#9B9B9B", marginLeft: 4 }}>orders</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        title="Add Customer"
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
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input style={{ height: 40, borderRadius: 8 }} />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input style={{ height: 40, borderRadius: 8 }} />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input style={{ height: 40, borderRadius: 8 }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
