import React from "react";
import { FilterChip } from "../../components/common/FilterChip";
import { DeleteOutlined } from "@ant-design/icons";

interface FilterChipsProps {
  filters: string[];
  onRemove: (filter: string) => void;
  onClearAll: () => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({ filters, onRemove, onClearAll }) => {
  if (filters.length === 0) return null;

  return (
    <div style={{
      display: "flex",
      gap: 8,
      marginBottom: 16,
      flexWrap: "wrap",
      alignItems: "center"
    }}>
      {filters.map((f) => (
        <FilterChip key={f} label={f} onDismiss={() => onRemove(f)} />
      ))}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          fontSize: 13,
          color: "#9B9B9B",
          cursor: "pointer",
          marginLeft: 8,
        }}
        onClick={onClearAll}
      >
        <DeleteOutlined style={{ fontSize: 12 }} />
        <span>Clear all filters</span>
      </div>
    </div>
  );
};
