import React, { useState } from "react";
import { Card, Select, Modal } from "antd";
import {
  UserOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  SwapOutlined,
  PlusOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { KpiCard } from "./KpiCard";
import { SalesChart } from "./SalesChart";
import { CategoryDonut } from "./CategoryDonut";
import { CountriesTable } from "./CountriesTable";
import { LiveBadge } from "../../components/common/LiveBadge";
import { useGetIdentity } from "@refinedev/core";
import { useNavigate } from "react-router";

export const DashboardPage: React.FC = () => {
  const { data: user } = useGetIdentity<any>();
  const navigate = useNavigate();
  const [quickActionOpen, setQuickActionOpen] = useState(false);

  return (
    <div style={{ paddingTop: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: "#0D3D2B", margin: 0, marginBottom: 4 }}>
            Welcome, {user?.name || "User"}
          </h1>
          <p style={{ fontSize: 14, color: "#9B9B9B", margin: 0 }}>
            Here's what's happening with your store today.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <LiveBadge />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, color: "#9B9B9B" }}>Time period:</span>
            <Select
              defaultValue="Jul 1-12"
              style={{ width: 140 }}
              suffixIcon={<CalendarOutlined style={{ color: "#9B9B9B" }} />}
              options={[
                { label: "Jul 1-12", value: "jul1-12" },
                { label: "Last 30 days", value: "30d" },
                { label: "Last 90 days", value: "90d" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* KPI Cards Row - 5 cards including Add data */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 16,
        marginBottom: 16,
      }}>
        <KpiCard
          icon={<UserOutlined />}
          label="Total customers"
          value="567,899"
          trend={2.5}
        />
        <KpiCard
          icon={<DollarOutlined />}
          label="Total revenue"
          value="$3.465M"
          trend={0.5}
        />
        <KpiCard
          icon={<ShoppingCartOutlined />}
          label="Total orders"
          value="1.136M"
          trend={-0.2}
        />
        <KpiCard
          icon={<SwapOutlined />}
          label="Total returns"
          value="1,789"
          trend={0.12}
        />
        {/* Add Data Card */}
        <Card
          style={{
            border: "1px dashed #E8E8E8",
            borderRadius: 12,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 120,
          }}
          styles={{
            body: {
              padding: "16px 20px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }
          }}
          onClick={() => setQuickActionOpen(true)}
        >
          <PlusOutlined style={{ fontSize: 24, color: "#9B9B9B", marginBottom: 8 }} />
          <div style={{ fontSize: 13, color: "#9B9B9B" }}>Add data</div>
        </Card>
      </div>

        <SalesChart />

      {/* Quick Action Modal */}
      <Modal
        title="Quick Actions"
        open={quickActionOpen}
        onCancel={() => setQuickActionOpen(false)}
        footer={null}
        centered
        width={400}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "16px 0" }}>
          <div
            style={{ padding: "16px 20px", backgroundColor: "#FAFAFA", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
            onClick={() => { setQuickActionOpen(false); navigate("/customers?action=add"); }}
          >
            <UserOutlined style={{ fontSize: 20, color: "#2ECC8F" }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#0D3D2B" }}>Add Customer</div>
              <div style={{ fontSize: 12, color: "#9B9B9B" }}>Create a new customer profile</div>
            </div>
          </div>
          <div
            style={{ padding: "16px 20px", backgroundColor: "#FAFAFA", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
            onClick={() => { setQuickActionOpen(false); navigate("/sales?action=add"); }}
          >
            <DollarOutlined style={{ fontSize: 20, color: "#2ECC8F" }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#0D3D2B" }}>Add Sale</div>
              <div style={{ fontSize: 12, color: "#9B9B9B" }}>Record a new sale transaction</div>
            </div>
          </div>
          <div
            style={{ padding: "16px 20px", backgroundColor: "#FAFAFA", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
            onClick={() => { setQuickActionOpen(false); navigate("/ledger?action=add"); }}
          >
            <PlusOutlined style={{ fontSize: 20, color: "#2ECC8F" }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#0D3D2B" }}>Add Ledger Entry</div>
              <div style={{ fontSize: 12, color: "#9B9B9B" }}>Create a new ledger entry</div>
            </div>
          </div>
        </div>
      </Modal>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
        marginTop: 16,
      }}>
        <CategoryDonut />
        <CountriesTable />
      </div>
    </div>
  );
};
