import React, { useState } from "react";
import { useList, useDelete } from "@refinedev/core";
import { Card, Input, Button, Modal, message } from "antd";
import { SearchOutlined, SlidersOutlined, DeleteOutlined } from "@ant-design/icons";
import { ProductRow } from "./ProductRow";
import { FilterChips } from "./FilterChips";
import { LiveBadge } from "../../components/common/LiveBadge";
import { GET_PRODUCTS, DELETE_PRODUCT } from "../../graphql/products";

const initialFilters = ["ALPHAWOOD", "Living room", "Dining room", "Bedroom"];

export const MarketplacePage: React.FC = () => {
  const [filters, setFilters] = useState<string[]>(initialFilters);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const whereClause: any = {};
  if (filters.length > 0 && !filters.includes("ALPHAWOOD")) {
    whereClause.category = { _in: filters };
  }
  if (search) {
    whereClause._or = [
      { display_name: { _ilike: `%${search}%` } },
      { item_id: { _ilike: `%${search}%` } },
    ];
  }

  const { result, query } = useList({
    resource: "products",
    meta: {
      gqlQuery: GET_PRODUCTS,
      variables: { where: whereClause },
    },
  });

  const { mutate: deleteProduct } = useDelete();

  const products = result?.data || [];
  const totalCount = result?.total || 0;
  const isLoading = query?.isLoading || false;

  const handleDelete = (id: string, name: string) => {
    Modal.confirm({
      title: "Delete Product",
      content: `Are you sure you want to delete "${name}"?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        deleteProduct(
          { resource: "products", id, meta: { gqlMutation: DELETE_PRODUCT } },
          {
            onSuccess: () => {
              message.success("Product deleted successfully");
            },
            onError: () => message.error("Failed to delete product"),
          }
        );
      },
    });
  };

  const removeFilter = (filter: string) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  const clearAll = () => setFilters([]);

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
          <h1 style={{ fontSize: 24, fontWeight: 600, color: "#0D3D2B", margin: 0 }}>Marketplace</h1>
          <span style={{ fontSize: 14, color: "#9B9B9B" }}>{totalCount} products</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <LiveBadge />
          <Button icon={<SlidersOutlined />} onClick={() => setShowFilters(!showFilters)}>
            Filters
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#2ECC8F", borderColor: "#2ECC8F" }}
            onClick={() => {
              // Open add product drawer instead of navigation
              console.log("Add product");
            }}
          >
            Add Product
          </Button>
        </div>
      </div>

      {showFilters && (
        <FilterChips filters={filters} onRemove={removeFilter} onClearAll={clearAll} />
      )}

      <Input
        placeholder="Search for product"
        prefix={<SearchOutlined style={{ color: "#9B9B9B" }} />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 16, height: 40, borderRadius: 8 }}
      />

      <Card
        styles={{ body: { padding: 0 } }}
        style={{ border: "1px solid #E8E8E8", borderRadius: 12 }}
      >
        {isLoading ? (
          <div style={{ padding: 32, textAlign: "center" }}>Loading...</div>
        ) : (
          products.map((product: any, idx: number) => (
            <ProductRow
              key={product.id}
              product={product}
              showDivider={idx < products.length - 1}
              onDelete={() => handleDelete(product.id, product.display_name)}
            />
          ))
        )}
      </Card>
    </div>
  );
};
