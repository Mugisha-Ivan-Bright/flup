import React from "react";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { StatusDot } from "../../components/common/StatusDot";

interface Stop {
  zip: string;
  city: string;
}

interface TrackingCardProps {
  delivery: {
    id: string;
    tracking_id: string;
    status: "On route" | "Waiting" | "Inactive";
    origin_city: string;
    destination_city: string;
    time_left: string;
    distance_km: number;
    estimated_time: string;
    stops: Stop[];
  };
  onDelete?: () => void;
}

export const TrackingCard: React.FC<TrackingCardProps> = ({ delivery, onDelete }) => {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E8E8E8",
        borderRadius: 12,
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        transition: "box-shadow 0.3s",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 4 }}>
        <Button
          type="text"
          size="small"
          icon={<EditOutlined />}
          onClick={() => {
            // Could open edit drawer here instead of navigation
            console.log("Edit tracking:", delivery.id);
          }}
        />
        <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={onDelete} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <StatusDot status={delivery.status} />
            <span style={{ fontSize: 13, fontWeight: 500, color: "#0D3D2B" }}>{delivery.status}</span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#0D3D2B", marginBottom: 4 }}>
            {delivery.tracking_id}
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#0D3D2B" }}>
            {delivery.origin_city} – {delivery.destination_city}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, color: "#9B9B9B" }}>{delivery.time_left}</div>
          <div style={{ marginTop: 8, width: 120, height: 60 }}>
            <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Truck Cab */}
              <rect x="90" y="30" width="20" height="18" rx="3" fill="#F0EFF4" />
              <rect x="93" y="33" width="14" height="12" rx="1" fill="#E8E8E8" />
              {/* Truck Cargo */}
              <rect x="10" y="28" width="80" height="24" rx="4" fill="#F0EFF4" />
              <rect x="14" y="32" width="72" height="16" rx="2" fill="#2ECC8F" />
              {/* Wheels */}
              <circle cx="30" cy="54" r="6" fill="#1A1A1A" />
              <circle cx="30" cy="54" r="3" fill="#F0EFF4" />
              <circle cx="80" cy="54" r="6" fill="#1A1A1A" />
              <circle cx="80" cy="54" r="3" fill="#F0EFF4" />
            </svg>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #E8E8E8", paddingTop: 12, display: "flex", gap: 24 }}>
        <div>
          <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Distance
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, color: "#0D3D2B" }}>{delivery.distance_km} km</div>
          <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: 0.5, marginTop: 8 }}>
            Estimated time
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, color: "#0D3D2B" }}>{delivery.estimated_time}</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "#9B9B9B", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>
            Stops
          </div>
          <div style={{ position: "relative" }}>
            {delivery.stops.map((stop, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, position: "relative" }}>
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: idx < delivery.stops.length - 1 ? "#2ECC8F" : "transparent",
                    border: idx === delivery.stops.length - 1 ? "1.5px solid #2ECC8F" : "none",
                    flexShrink: 0,
                    position: "relative",
                    zIndex: 2,
                  }}
                />
                {/* Connecting line */}
                {idx < delivery.stops.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      left: 3,
                      top: 6,
                      width: 0,
                      height: 16,
                      borderLeft: "1.5px dashed #2ECC8F",
                      zIndex: 1,
                    }}
                  />
                )}
                <span style={{ fontSize: 13, color: "#1A1A1A" }}>
                  {stop.zip} {stop.city}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};