import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Jul 1", grossMargin: 45000, revenue: 52000 },
  { day: "Jul 2", grossMargin: 38000, revenue: 48000 },
  { day: "Jul 3", grossMargin: 52000, revenue: 61000 },
  { day: "Jul 4", grossMargin: 41000, revenue: 55000 },
  { day: "Jul 5", grossMargin: 47000, revenue: 58000 },
  { day: "Jul 6", grossMargin: 53000, revenue: 65000 },
  { day: "Jul 7", grossMargin: 42000, revenue: 50000 },
  { day: "Jul 8", grossMargin: 48000, revenue: 57000 },
  { day: "Jul 9", grossMargin: 55000, revenue: 68000 },
  { day: "Jul 10", grossMargin: 46000, revenue: 54000 },
  { day: "Jul 11", grossMargin: 50000, revenue: 62000 },
  { day: "Jul 12", grossMargin: 52000, revenue: 64000 },
];

export const SalesChart: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E8E8E8",
        borderRadius: 12,
        padding: "16px 20px",
        marginTop: 16,
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 600, color: "#0D3D2B", marginBottom: 16 }}>
        Product sales
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barGap={2} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E8E8" />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9B9B9B" }} axisLine={{ stroke: "#E8E8E8" }} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9B9B9B" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0D3D2B",
              border: "none",
              borderRadius: 8,
              color: "white",
              fontSize: 12,
            }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value: string) => (
              <span style={{ fontSize: 12, color: "#1A1A1A" }}>{value === "grossMargin" ? "Gross margin" : "Revenue"}</span>
            )}
          />
          <Bar dataKey="grossMargin" fill="#378ADD" radius={[4, 4, 0, 0]} />
          <Bar dataKey="revenue" fill="#EF9F27" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
