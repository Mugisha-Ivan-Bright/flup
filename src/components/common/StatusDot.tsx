import React from "react";

type StatusType = "On route" | "Waiting" | "Inactive";

interface StatusDotProps {
  status: StatusType;
}

const statusColors: Record<StatusType, string> = {
  "On route": "#2ECC8F",
  Waiting: "#5B9BD5",
  Inactive: "#C4C4C4",
};

export const StatusDot: React.FC<StatusDotProps> = ({ status }) => {
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: statusColors[status],
        marginRight: 6,
        verticalAlign: "middle",
      }}
    />
  );
};
