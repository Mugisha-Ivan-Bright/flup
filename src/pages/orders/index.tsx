import React, { useState } from "react";
import { Table, Button, Tag, Input, Tabs, Checkbox } from "antd";
import { SearchOutlined, FilterOutlined, ExportOutlined } from "@ant-design/icons";
import { EditOrderDrawer } from "./EditOrderDrawer";
import { LiveBadge } from "../../components/common/LiveBadge";
import { useList } from "@refinedev/core";
import { GET_ORDERS } from "../../graphql/orders";

const statusColors: Record<string, string> = {
  "In progress": "#5B9BD5",
  "Completed": "#2ECC8F",
  "Returned": "#EF9F27",
  "Cancelled": "#E24B4A",
};

const deliveryStatusColors: Record<string, string> = {
  "In checking": "#5B9BD5",
  "Ready to pickup": "#2ECC8F",
  "In transport": "#5B9BD5",
  "Delivered": "#2ECC8F",
  "Cancelled": "#E24B4A",
};

export const OrdersPage: React.FC = () => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const { data, isLoading } = useList({
    resource: "orders",
    meta: {
      gqlQuery: GET_ORDERS,
    },
  });

  const orders = data?.data || [];
  const totalCount = data?.total || 0;

  const handleRowSelect = (orderId: string, selected: boolean) => {
    if (selected) {
      setSelectedRows([...selectedRows, orderId]);
    } else {
      setSelectedRows(selectedRows.filter(id => id !== orderId));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedRows(orders.map((order: any) => order.id));
    } else {
      setSelectedRows([]);
    }
  };

  const tabItems = [
    { key: "all", label: `All orders (${totalCount})` },
    { key: "in-progress", label: "In progress" },
    { key: "completed", label: "Completed" },
    { key: "returned", label: "Returned" },
    { key: "cancelled", label: "Cancelled" },
  ];

  const columns = [
    {
      title: () => (
        <Checkbox
          checked={selectedRows.length === orders.length && orders.length > 0}
          indeterminate={selectedRows.length > 0 && selectedRows.length < orders.length}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
      ),
      dataIndex: "checkbox",
      key: "checkbox",
      width: 50,
      render: (_: any, record: any) => (
        <Checkbox
          checked={selectedRows.includes(record.id)}
          onChange={(e) => handleRowSelect(record.id, e.target.checked)}
        />
      ),
    },
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      sorter: true,
      render: (text: string) => (
        <span style={{ fontWeight: 500, color: "#0D3D2B", fontSize: 13 }}>{text}</span>
      ),
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      sorter: true,
      render: (text: string) => (
        <span style={{ fontSize: 13, color: "#1A1A1A" }}>{text}</span>
      ),
    },
    {
      title: "Departure date",
      dataIndex: "departure_date",
      key: "departure_date",
      sorter: true,
      render: (text: string, record: any) => (
        <div>
          <div style={{ fontSize: 13, color: "#1A1A1A" }}>{text}</div>
          <div style={{ fontSize: 12, color: "#9B9B9B" }}>{record.departure_time}</div>
        </div>
      ),
    },
    {
      title: "Delivery date",
      dataIndex: "delivery_date",
      key: "delivery_date",
      sorter: true,
      render: (text: string, record: any) => (
        <div>
          <div style={{ fontSize: 13, color: "#1A1A1A" }}>{text}</div>
          <div style={{ fontSize: 12, color: "#9B9B9B" }}>{record.delivery_time}</div>
        </div>
      ),
    },
    {
      title: "Order status",
      dataIndex: "order_status",
      key: "order_status",
      render: (status: string) => (
        <Tag
          style={{
            backgroundColor: statusColors[status],
            color: "white",
            border: "none",
            borderRadius: 12,
            fontSize: 11,
            fontWeight: 500,
            padding: "2px 8px",
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Delivery status",
      dataIndex: "delivery_status",
      key: "delivery_status",
      render: (status: string) => {
        if (status === "-" || !status) return <span style={{ color: "#9B9B9B" }}>-</span>;
        return (
          <Tag
            style={{
              backgroundColor: deliveryStatusColors[status] || "#9B9B9B",
              color: "white",
              border: "none",
              borderRadius: 12,
              fontSize: 11,
              fontWeight: 500,
              padding: "2px 8px",
            }}
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
      render: (text: string) => (
        <span style={{ fontSize: 13, color: "#1A1A1A" }}>{text}</span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: true,
      render: (text: string) => (
        <span style={{ fontWeight: 600, color: "#0D3D2B", fontSize: 13 }}>{text}</span>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", height: "calc(100vh - 64px)" }}>
      {/* Left Panel - Orders List */}
      <div style={{ flex: 1, marginRight: selectedOrderId ? 16 : 0 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <h1 style={{ fontSize: 24, fontWeight: 600, color: "#0D3D2B", margin: 0 }}>Orders</h1>
            <span style={{ fontSize: 14, color: "#9B9B9B" }}>{totalCount} orders</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <LiveBadge />
          </div>
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          style={{ marginBottom: 16 }}
          tabBarStyle={{
            marginBottom: 16,
            borderBottom: "1px solid #E8E8E8",
          }}
        />

        <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
          <Input
            placeholder="Search for order ID, customer, order status"
            prefix={<SearchOutlined style={{ color: "#9B9B9B" }} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, height: 40, borderRadius: 8 }}
          />
          <Button icon={<FilterOutlined />} style={{ height: 40 }}>
            Filters
          </Button>
          <Button icon={<ExportOutlined />} style={{ height: 40 }}>
            Export
          </Button>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", borderRadius: 12, border: "1px solid #E8E8E8" }}>
          <Table
            dataSource={orders}
            columns={columns}
            rowKey="id"
            pagination={false}
            showHeader={true}
            size="middle"
            rowSelection={false}
            onRow={(record) => ({
              onClick: () => setSelectedOrderId(record.id),
              style: {
                backgroundColor: selectedOrderId === record.id ? "#E8F7F1" : "transparent",
                cursor: "pointer",
              },
            })}
            className="orders-table"
          />
        </div>
      </div>

      {/* Right Panel - Edit Drawer */}
      {selectedOrderId && (
        <div
          style={{
            width: 420,
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            border: "1px solid #E8E8E8",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <EditOrderDrawer
            orderId={selectedOrderId}
            onClose={() => setSelectedOrderId(null)}
          />
        </div>
      )}
    </div>
  );
};