import React, { useState, useEffect } from "react";
import { Button, Input, message, Modal, Drawer } from "antd";
import { SearchOutlined, SlidersOutlined, PlusOutlined } from "@ant-design/icons";
import { TrackingCard } from "./TrackingCard";
import { LiveBadge } from "../../components/common/LiveBadge";
import { useList, useDelete } from "@refinedev/core";
import { GET_TRACKING, DELETE_TRACKING } from "../../graphql/tracking";

// Sample data for fallback when API is not available
const sampleDeliveries = [
  {
    id: "1",
    tracking_id: "UL-158902NH",
    status: "On route",
    origin_city: "Madrid",
    destination_city: "Malaga",
    time_left: "1 h 36 min left",
    distance_km: 529,
    estimated_time: "5 h 27 min",
    stops: [
      { zip: "18001", city: "Granada" },
      { zip: "18600", city: "Motril" },
      { zip: "29001", city: "Málaga" },
    ],
  },
  {
    id: "2",
    tracking_id: "KO-158454PO",
    status: "On route",
    origin_city: "Warszawa",
    destination_city: "Kraków",
    time_left: "3 h 09 min left",
    distance_km: 290,
    estimated_time: "3 h 35 min",
    stops: [
      { zip: "00-006", city: "Warszawa" },
      { zip: "26-600", city: "Radom" },
      { zip: "25-004", city: "Kielce" },
      { zip: "30-000", city: "Kraków" },
    ],
  },
  {
    id: "3",
    tracking_id: "UK-568742NK",
    status: "Waiting",
    origin_city: "Madrid",
    destination_city: "Roma",
    time_left: "19 h 59 min left",
    distance_km: 1959,
    estimated_time: "20 h 34 min",
    stops: [
      { zip: "28001", city: "Madrid" },
      { zip: "16121", city: "Genova" },
      { zip: "50100", city: "Firenze" },
      { zip: "00100", city: "Roma" },
    ],
  },
];

export const TrackingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const whereClause: any = {};
  if (activeTab === "on-route") {
    whereClause.status = { _eq: "On route" };
  } else if (activeTab === "waiting") {
    whereClause.status = { _eq: "Waiting" };
  } else if (activeTab === "inactive") {
    whereClause.status = { _eq: "Inactive" };
  }

  if (search) {
    whereClause._or = [
      { tracking_id: { _ilike: `%${search}%` } },
      { origin_city: { _ilike: `%${search}%` } },
      { destination_city: { _ilike: `%${search}%` } },
      { status: { _ilike: `%${search}%` } },
    ];
  }

  const { result, query } = useList({
    resource: "tracking",
    meta: {
      gqlQuery: GET_TRACKING,
      variables: { where: whereClause },
    },
  });

  const { mutate: deleteTracking } = useDelete();

  // Use API data if available, otherwise fall back to sample data
  const apiDeliveries = result?.data || [];
  const totalCount = result?.total || 0;
  const deliveries = apiDeliveries.length > 0 ? apiDeliveries : sampleDeliveries;
  const displayTotal = apiDeliveries.length > 0 ? totalCount : sampleDeliveries.length;
  const isLoading = query.isLoading;

  const handleDelete = (id: string, trackingId: string) => {
    Modal.confirm({
      title: "Delete Tracking",
      content: `Are you sure you want to delete tracking "${trackingId}"?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        deleteTracking(
          { resource: "tracking", id, meta: { gqlMutation: DELETE_TRACKING } },
          {
            onSuccess: () => {
              message.success("Tracking deleted successfully");
              query.refetch?.();
            },
            onError: () => message.error("Failed to delete tracking"),
          }
        );
      },
    });
  };

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
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: "#0D3D2B", margin: 0 }}>Tracking</h1>
          <span style={{ fontSize: 14, color: "#9B9B9B" }}>{displayTotal} deliveries</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <LiveBadge />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ backgroundColor: "#2ECC8F", borderColor: "#2ECC8F" }}
            onClick={() => setDrawerOpen(true)}
          >
            Add new track
          </Button>
        </div>
      </div>

      {/* Custom Tab Pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <div
          onClick={() => setActiveTab("all")}
          style={{
            padding: "8px 16px",
            borderRadius: 20,
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 500,
            backgroundColor: activeTab === "all" ? "#2ECC8F" : "#F5F5F5",
            color: activeTab === "all" ? "white" : "#1A1A1A",
            transition: "all 0.2s",
          }}
        >
          All 76
        </div>
        <div
          onClick={() => setActiveTab("on-route")}
          style={{
            padding: "8px 16px",
            borderRadius: 20,
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 500,
            backgroundColor: activeTab === "on-route" ? "#2ECC8F" : "#F5F5F5",
            color: activeTab === "on-route" ? "white" : "#1A1A1A",
            transition: "all 0.2s",
          }}
        >
          On route 34
        </div>
        <div
          onClick={() => setActiveTab("waiting")}
          style={{
            padding: "8px 16px",
            borderRadius: 20,
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 500,
            backgroundColor: activeTab === "waiting" ? "#2ECC8F" : "#F5F5F5",
            color: activeTab === "waiting" ? "white" : "#1A1A1A",
            transition: "all 0.2s",
          }}
        >
          Waiting 28
        </div>
        <div
          onClick={() => setActiveTab("inactive")}
          style={{
            padding: "8px 16px",
            borderRadius: 20,
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 500,
            backgroundColor: activeTab === "inactive" ? "#2ECC8F" : "#F5F5F5",
            color: activeTab === "inactive" ? "white" : "#1A1A1A",
            transition: "all 0.2s",
          }}
        >
          Inactive 14
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        <Input
          placeholder="Search for track ID, customer, delivery status, destination"
          prefix={<SearchOutlined style={{ color: "#9B9B9B" }} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, height: 40, borderRadius: 8 }}
        />
        <Button icon={<SlidersOutlined />} style={{ height: 40 }}>
          Filters
        </Button>
        <Button style={{ height: 40 }}>
          Time
        </Button>
      </div>

      {isLoading ? (
        <div style={{ padding: 32, textAlign: "center" }}>Loading...</div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: 16,
          }}
        >
          {deliveries.map((delivery: any) => (
            <TrackingCard
              key={delivery.id}
              delivery={delivery}
              onDelete={() => handleDelete(delivery.id, delivery.tracking_id)}
            />
          ))}
        </div>
      )}

      {/* Add New Track Drawer */}
      <Drawer
        title="Add new track"
        placement="right"
        width={420}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        styles={{
          body: { padding: "16px 20px" },
          header: { padding: "16px 20px", borderBottom: "1px solid #E8E8E8" },
        }}
      >
        <div style={{ padding: 20, textAlign: "center", color: "#9B9B9B" }}>
          Add new tracking form would go here
        </div>
      </Drawer>
    </div>
  );
};
