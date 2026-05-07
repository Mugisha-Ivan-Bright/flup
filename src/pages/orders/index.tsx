import React, { useState, useMemo, useEffect } from "react";
import { Table, Input, Tabs, Checkbox, Tag, Button, Drawer, Modal, message } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  ExportOutlined,
  MoreOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { OrderDetailDrawer } from "./OrderDetailDrawer";
import { useList, useDelete } from "@refinedev/core";
import { useSearchParams, useNavigate } from "react-router";
import { GET_ORDERS } from "../../graphql/orders";
import "../../styles/orders.css";

const statusBadgeMap: Record<string, { bg: string; text: string }> = {
  "In progress": { bg: "#EBF5FF", text: "#1868C7" },
  "Completed": { bg: "#E8F7F1", text: "#0D6E43" },
  "Returned": { bg: "#FFF3E8", text: "#C25E00" },
  "Canceled": { bg: "#FEF0F0", text: "#C0392B" },
  "Cancelled": { bg: "#FEF0F0", text: "#C0392B" },
};

const deliveryStatusDotMap: Record<string, string> = {
  "In checking": "#9B9B9B",
  "Picked up": "#2ECC8F",
  "Transport": "#2ECC8F",
  "Ready to pickup": "#F59E0B",
  "Delivered": "#2ECC8F",
  "Canceled": "#E24B4A",
  "Cancelled": "#E24B4A",
};

const sampleOrders = [
  {
    id: "1",
    order_id: "DSD15879",
    products: "Warm, Earth",
    departure_date: "16 July 2022",
    departure_time: "07:00 AM",
    delivery_date: "17 July 2022",
    delivery_time: "08:00 PM",
    order_status: "In progress",
    delivery_status: "In transport",
    destination: "France, Paris, 75016",
    price: "$3,763.20",
    customer: { name: "Alina", surname: "Carter", email: "alina.carter@gmail.com", phone: "(338)-123-4567", flag: "🇮🇹" },
  },
  {
    id: "2",
    order_id: "DSD15880",
    products: "Luna, Breeze",
    departure_date: "18 July 2022",
    departure_time: "09:00 AM",
    delivery_date: "19 July 2022",
    delivery_time: "02:00 PM",
    order_status: "Completed",
    delivery_status: "Delivered",
    destination: "France, Lyon, 69002",
    price: "$2,150.00",
    customer: { name: "Marco", surname: "Rossi", email: "marco.rossi@gmail.com", phone: "(339)-987-6543", flag: "🇮🇹" },
  },
  {
    id: "3",
    order_id: "DSD15881",
    products: "Warm",
    departure_date: "20 July 2022",
    departure_time: "10:00 AM",
    delivery_date: "–",
    delivery_time: "–",
    order_status: "In progress",
    delivery_status: "Ready to pickup",
    destination: "France, Marseille, 13001",
    price: "$412.00",
    customer: { name: "Sophie", surname: "Martin", email: "sophie.martin@gmail.com", phone: "(340)-111-2233", flag: "🇫🇷" },
  },
  {
    id: "4",
    order_id: "DSD15882",
    products: "Earth, Luna",
    departure_date: "21 July 2022",
    departure_time: "08:30 AM",
    delivery_date: "22 July 2022",
    delivery_time: "05:00 PM",
    order_status: "Returned",
    delivery_status: "Canceled",
    destination: "France, Toulouse, 31000",
    price: "$1,824.00",
    customer: { name: "Pierre", surname: "Dubois", email: "pierre.dubois@gmail.com", phone: "(341)-444-5566", flag: "🇫🇷" },
  },
  {
    id: "5",
    order_id: "DSD15883",
    products: "Breeze",
    departure_date: "23 July 2022",
    departure_time: "11:00 AM",
    delivery_date: "24 July 2022",
    delivery_time: "03:00 PM",
    order_status: "Canceled",
    delivery_status: "Canceled",
    destination: "France, Nice, 06000",
    price: "$850.00",
    customer: { name: "Luca", surname: "Bianchi", email: "luca.bianchi@gmail.com", phone: "(342)-777-8899", flag: "🇮🇹" },
  },
];

export const OrdersPage: React.FC = () => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutate: deleteOrder } = useDelete();

  useEffect(() => {
    const action = searchParams.get("action");
    const orderId = searchParams.get("orderId");
    if (action === "view" && orderId) {
      setSelectedOrderId(orderId);
    } else if (!action && !orderId) {
      setSelectedOrderId(null);
    }
  }, [searchParams]);

  const handleRowClick = (orderId: string) => {
    setSearchParams({ action: "view", orderId });
  };

  const handleDrawerClose = () => {
    setSelectedOrderId(null);
    setSearchParams({});
  };

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const filteredOrders = useMemo(() => {
    let result = sampleOrders;
    if (activeTab !== "all") {
      const statusMap: Record<string, string> = {
        "in-progress": "In progress",
        "completed": "Completed",
        "returned": "Returned",
        "canceled": "Canceled",
      };
      const status = statusMap[activeTab];
      if (status) {
        result = result.filter((order) => order.order_status === status);
      }
    }
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter((order) => {
        const searchFields = [
          order.order_id,
          order.products,
          order.order_status,
          order.delivery_status,
          order.destination,
          order.customer?.name,
          order.customer?.surname,
          order.customer?.email,
        ].filter(Boolean).map((f) => f!.toLowerCase());
        return searchFields.some((field) => field.includes(searchLower));
      });
    }
    if (sortConfig) {
      const { key, direction } = sortConfig;
      result = [...result].sort((a: any, b: any) => {
        let aVal = a[key] || "";
        let bVal = b[key] || "";
        if (key === "order_id" || key === "price") {
          aVal = String(aVal);
          bVal = String(bVal);
        }
        const comparison = aVal.localeCompare(bVal);
        return direction === "asc" ? comparison : -comparison;
      });
    }
    return result;
  }, [search, activeTab, sortConfig]);

  const orders = filteredOrders;
  const totalCount = 152;

  const handleRowSelect = (orderId: string, selected: boolean) => {
    if (selected) {
      setSelectedRows([...selectedRows, orderId]);
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== orderId));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedRows(orders.map((order: any) => order.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleDelete = (orderId: string) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        deleteOrder(
          { resource: "orders", id: orderId },
          {
            onSuccess: () => {
              message.success("Order deleted successfully");
              if (selectedOrderId === orderId) setSelectedOrderId(null);
            },
          }
        );
      },
    });
  };

  const tabItems = [
    { key: "all", label: `All orders (${totalCount})` },
    { key: "in-progress", label: "In progress (54)" },
    { key: "completed", label: "Completed (77)" },
    { key: "returned", label: "Returned (15)" },
    { key: "canceled", label: "Canceled (6)" },
  ];

  const allColumns = [
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
      width: 40,
      render: (_: any, record: any) => (
        <Checkbox
          checked={selectedRows.includes(record.id)}
          onChange={(e) => handleRowSelect(record.id, e.target.checked)}
        />
      ),
    },
    {
      title: () => (
        <span style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }} onClick={() => handleSort("order_id")}>
          Order ID
          {sortConfig?.key === "order_id" && (
            sortConfig.direction === "asc" ? <SortAscendingOutlined style={{ fontSize: 12 }} /> : <SortDescendingOutlined style={{ fontSize: 12 }} />
          )}
        </span>
      ),
      dataIndex: "order_id",
      key: "order_id",
      width: 110,
      render: (text: string) => (
        <span style={{ fontWeight: 500, color: "#0D3D2B", fontSize: 13 }}>{text}</span>
      ),
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      width: 140,
      render: (text: string) => (
        <span style={{ fontSize: 13, color: "#1A1A1A" }}>{text}</span>
      ),
    },
    {
      title: () => (
        <span style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }} onClick={() => handleSort("departure_date")}>
          Departure date
          {sortConfig?.key === "departure_date" && (
            sortConfig.direction === "asc" ? <SortAscendingOutlined style={{ fontSize: 12 }} /> : <SortDescendingOutlined style={{ fontSize: 12 }} />
          )}
        </span>
      ),
      dataIndex: "departure_date",
      key: "departure_date",
      width: 130,
      render: (text: string, record: any) => (
        <div>
          <div style={{ fontSize: 13, color: "#1A1A1A" }}>{text}</div>
          <div style={{ fontSize: 12, color: "#9B9B9B" }}>{record.departure_time}</div>
        </div>
      ),
    },
    {
      title: () => (
        <span style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }} onClick={() => handleSort("delivery_date")}>
          Delivery date
          {sortConfig?.key === "delivery_date" && (
            sortConfig.direction === "asc" ? <SortAscendingOutlined style={{ fontSize: 12 }} /> : <SortDescendingOutlined style={{ fontSize: 12 }} />
          )}
        </span>
      ),
      dataIndex: "delivery_date",
      key: "delivery_date",
      width: 130,
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
      width: 120,
      render: (status: string) => {
        const colors = statusBadgeMap[status] || { bg: "#F0F0F0", text: "#1A1A1A" };
        return (
          <span
            style={{
              backgroundColor: colors.bg,
              color: colors.text,
              padding: "3px 10px",
              borderRadius: 12,
              fontSize: 12,
              fontWeight: 500,
              display: "inline-block",
            }}
          >
            {status}
          </span>
        );
      },
    },
    {
      title: "Delivery status",
      dataIndex: "delivery_status",
      key: "delivery_status",
      width: 130,
      render: (status: string) => {
        if (status === "-" || !status) return <span style={{ color: "#9B9B9B" }}>–</span>;
        const dotColor = deliveryStatusDotMap[status] || "#9B9B9B";
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: dotColor,
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: 13, color: "#1A1A1A" }}>{status}</span>
          </div>
        );
      },
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
      width: 160,
      render: (text: string) => (
        <span style={{ fontSize: 13, color: "#1A1A1A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>{text}</span>
      ),
    },
    {
      title: () => (
        <span style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }} onClick={() => handleSort("price")}>
          Price
          {sortConfig?.key === "price" && (
            sortConfig.direction === "asc" ? <SortAscendingOutlined style={{ fontSize: 12 }} /> : <SortDescendingOutlined style={{ fontSize: 12 }} />
          )}
        </span>
      ),
      dataIndex: "price",
      key: "price",
      width: 90,
      render: (text: string) => (
        <span style={{ fontWeight: 500, color: "#0D3D2B", fontSize: 13, textAlign: "right", display: "block" }}>{text}</span>
      ),
    },
    {
      title: "",
      key: "actions",
      width: 40,
      render: (_: any, record: any) => (
        <MoreOutlined
          style={{ color: "#9B9B9B", fontSize: 16 }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedOrderId(record.id);
          }}
        />
      ),
    },
  ];

  const visibleColumns = useMemo(() => {
    if (selectedOrderId) {
      const hiddenKeys = ["order_status", "delivery_status", "destination", "price", "actions"];
      return allColumns.filter((col) => !hiddenKeys.includes(col.key as string));
    }
    return allColumns;
  }, [selectedOrderId]);

  return (
    <div style={{ height: "calc(100vh - 64px)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Page Header */}
      <div style={{ padding: "24px 24px 0 24px", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <h1 style={{ fontSize: 20, fontWeight: 600, color: "#0D3D2B", margin: 0 }}>Orders</h1>
            <span style={{ fontSize: 13, color: "#9B9B9B" }}>{totalCount} orders</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          style={{ marginBottom: 12 }}
          tabBarStyle={{ marginBottom: 0 }}
          className="orders-pill-tabs"
        />

        {/* Toolbar */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center" }}>
          <Input
            placeholder="Search for order ID, customer, order status"
            prefix={<SearchOutlined style={{ color: "#9B9B9B" }} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 340, height: 36, borderRadius: 8, border: "1px solid #E8E8E8" }}
          />
          <Button
            icon={<FilterOutlined />}
            style={{ height: 34, borderRadius: 8, border: "1px solid #E8E8E8", background: "#FFFFFF" }}
          >
            Filters
          </Button>
          <Button
            icon={<ExportOutlined />}
            style={{ height: 34, borderRadius: 8, border: "1px solid #E8E8E8", background: "#FFFFFF" }}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Master Table */}
      <div style={{ flex: 1, overflow: "auto", padding: "0 24px 24px 24px" }}>
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            border: "1px solid #E8E8E8",
            height: "100%",
          }}
        >
          <Table
            dataSource={orders}
            columns={visibleColumns}
            rowKey="id"
            pagination={false}
            size="middle"
            className="flup-orders-table"
            onRow={(record) => ({
                onClick: () => handleRowClick(record.id),
                style: {
                  backgroundColor: selectedOrderId === record.id ? "#E8F7F1" : "transparent",
                  borderLeft: selectedOrderId === record.id ? "3px solid #2ECC8F" : "3px solid transparent",
                  cursor: "pointer",
                },
            })}
          />
        </div>
      </div>

      {/* Order Detail Drawer */}
      <Drawer
        title={null}
        placement="right"
        width={400}
        open={!!selectedOrderId}
        onClose={handleDrawerClose}
        bodyStyle={{ padding: 0, overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}
        headerStyle={{ display: "none" }}
        style={{ borderLeft: "1px solid #E8E8E8" }}
        className="order-detail-drawer"
      >
        {selectedOrderId && (
          <OrderDetailDrawer
            orderId={selectedOrderId}
            orderData={orders.find((o) => o.id === selectedOrderId)}
            onClose={handleDrawerClose}
            onDelete={() => handleDelete(selectedOrderId)}
          />
        )}
      </Drawer>
    </div>
  );
};
