import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Living room", value: 25, color: "#8B5CF6" },
  { name: "Kids", value: 17, color: "#3B82F6" },
  { name: "Office", value: 13, color: "#14B8A6" },
  { name: "Bedroom", value: 12, color: "#F97316" },
  { name: "Kitchen", value: 9, color: "#EF9F27" },
  { name: "Bathroom", value: 8, color: "#EC4899" },
  { name: "Dining room", value: 6, color: "#9CA3AF" },
  { name: "Decor", value: 5, color: "#2ECC8F" },
  { name: "Lighting", value: 3, color: "#EAB308" },
  { name: "Outdoor", value: 2, color: "#EF4444" },
];

const RADIAN = Math.PI / 180;

export const CategoryDonut: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E8E8E8",
        borderRadius: 12,
        padding: "16px 20px",
        flex: 1,
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 600, color: "#0D3D2B", marginBottom: 16 }}>
        Sales by product category
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ flex: 1 }}>
          {data.map((item) => (
            <div
              key={item.name}
              style={{
                display: "grid",
                gridTemplateColumns: "10px 1fr auto",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
                fontSize: 13,
                color: "#1A1A1A",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: item.color,
                  borderRadius: 2,
                }}
              />
              <span>{item.name}</span>
              <span style={{ color: "#9B9B9B" }}>— {item.value}%</span>
            </div>
          ))}
        </div>
        <div style={{ width: 180, height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
