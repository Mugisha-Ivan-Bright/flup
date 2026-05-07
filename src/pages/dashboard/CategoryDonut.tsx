import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

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

// Ensure data is ordered descending by value so top-selling categories appear first
const sortedData = [...data].sort((a, b) => b.value - a.value);

// Removed custom slice labels — percentages are shown via Tooltip on hover

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
        Sales by popularity
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ flex: 1 }}>
          {sortedData.map((item) => (
            <div
              key={item.name}
              style={{
                display: "grid",
                gridTemplateColumns: "10px 1fr",
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
              {/* percentage numbers removed from donut legend per design */}
            </div>
          ))}
        </div>
        <div style={{ width: 180, height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip formatter={(value: any, name: any) => [`${value}%`, name]} />
              <Pie
                data={sortedData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                strokeWidth={0}
                labelLine={false}
              >
                {sortedData.map((entry, index) => (
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
