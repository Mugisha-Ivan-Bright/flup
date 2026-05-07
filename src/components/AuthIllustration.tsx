import React from 'react';

export const AuthIllustration: React.FC = () => {
    return (
        <div className="auth-illustration">
            <svg
                width="320"
                height="320"
                viewBox="0 0 320 320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="illustration-svg"
            >
                {/* Background arch */}
                <path
                    d="M40 280 Q160 200 280 280"
                    stroke="#E5E7EB"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.3"
                />

                {/* Delivery Truck */}
                <g transform="translate(80, 200)">
                    {/* Truck cab */}
                    <rect x="0" y="20" width="40" height="30" fill="#1A6B4A" rx="4" />
                    {/* Truck cargo */}
                    <rect x="40" y="15" width="80" height="35" fill="#2ECC8F" rx="4" />
                    {/* Wheels */}
                    <circle cx="15" cy="55" r="8" fill="#374151" />
                    <circle cx="105" cy="55" r="8" fill="#374151" />
                    {/* Wheel rims */}
                    <circle cx="15" cy="55" r="4" fill="#9CA3AF" />
                    <circle cx="105" cy="55" r="4" fill="#9CA3AF" />
                    {/* Truck details */}
                    <rect x="5" y="25" width="8" height="6" fill="#FFFFFF" rx="1" />
                    <rect x="18" y="25" width="8" height="6" fill="#FFFFFF" rx="1" />
                    <rect x="50" y="25" width="60" height="15" fill="#FFFFFF" rx="2" opacity="0.8" />
                </g>

                {/* Furniture Items */}
                {/* Chair */}
                <g transform="translate(50, 140)">
                    <rect x="0" y="20" width="25" height="30" fill="#D97706" rx="2" />
                    <rect x="0" y="15" width="25" height="8" fill="#D97706" rx="2" />
                    <rect x="5" y="50" width="4" height="20" fill="#92400E" />
                    <rect x="16" y="50" width="4" height="20" fill="#92400E" />
                </g>

                {/* Table */}
                <g transform="translate(200, 150)">
                    <ellipse cx="25" cy="15" rx="25" ry="8" fill="#7C2D12" />
                    <rect x="5" y="15" width="4" height="25" fill="#92400E" />
                    <rect x="41" y="15" width="4" height="25" fill="#92400E" />
                    <rect x="23" y="15" width="4" height="25" fill="#92400E" />
                </g>

                {/* Sofa */}
                <g transform="translate(120, 160)">
                    <rect x="0" y="10" width="50" height="20" fill="#059669" rx="4" />
                    <rect x="0" y="5" width="50" height="8" fill="#059669" rx="4" />
                    <rect x="0" y="5" width="8" height="25" fill="#047857" rx="2" />
                    <rect x="42" y="5" width="8" height="25" fill="#047857" rx="2" />
                </g>

                {/* Delivery boxes */}
                <g transform="translate(160, 120)">
                    <rect x="0" y="0" width="20" height="20" fill="#F59E0B" rx="2" />
                    <rect x="25" y="5" width="18" height="18" fill="#EF4444" rx="2" />
                    <rect x="10" y="25" width="22" height="22" fill="#8B5CF6" rx="2" />
                    {/* Box tape lines */}
                    <line x1="0" y1="10" x2="20" y2="10" stroke="#D97706" strokeWidth="2" />
                    <line x1="25" y1="14" x2="43" y2="14" stroke="#DC2626" strokeWidth="2" />
                    <line x1="10" y1="36" x2="32" y2="36" stroke="#7C3AED" strokeWidth="2" />
                </g>

                {/* Route line */}
                <path
                    d="M40 240 Q160 180 280 240"
                    stroke="#2ECC8F"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="8,4"
                    opacity="0.6"
                />

                {/* Location pins */}
                <g transform="translate(35, 225)">
                    <circle cx="5" cy="10" r="8" fill="#2ECC8F" />
                    <circle cx="5" cy="10" r="3" fill="#FFFFFF" />
                </g>
                <g transform="translate(275, 225)">
                    <circle cx="5" cy="10" r="8" fill="#EF4444" />
                    <circle cx="5" cy="10" r="3" fill="#FFFFFF" />
                </g>
            </svg>
        </div>
    );
};