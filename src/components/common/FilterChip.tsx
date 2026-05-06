import React from "react";
import { CloseOutlined } from "@ant-design/icons";

interface FilterChipProps {
  label: string;
  onDismiss: () => void;
}

export const FilterChip: React.FC<FilterChipProps> = ({ label, onDismiss }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 12px",
        backgroundColor: "#F0EFF4",
        border: "1px solid #E8E8E8",
        borderRadius: 20,
        fontSize: 13,
        color: "#0D3D2B",
        cursor: "default",
      }}
    >
      {label}
      <CloseOutlined
        style={{ fontSize: 10, cursor: "pointer" }}
        onClick={onDismiss}
      />
    </div>
  );
};
