import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import dataProvider, {
  GraphQLClient,
  graphqlWS,
  liveProvider,
} from "@refinedev/hasura";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { authProvider } from "./providers/auth";
import { Layout } from "./components/layout/Layout";

import { DashboardPage } from "./pages/dashboard";
import { MarketplacePage } from "./pages/marketplace";
import { TrackingPage } from "./pages/tracking";
import { OrdersPage } from "./pages/orders";
import { CustomersPage } from "./pages/customers";
import { DiscountsPage } from "./pages/discounts";
import { LedgerPage } from "./pages/ledger";
import { TaxesPage } from "./pages/taxes";
import { SettingsPage } from "./pages/settings";
import { AuthPage } from "./pages/auth/AuthPage";

const API_URL = "https://flowing-mammal-24.hasura.app/v1/graphql";
const WS_URL = "ws://flowing-mammal-24.hasura.app/v1/graphql";

const client = new GraphQLClient(API_URL, {
  headers: {
    "x-hasura-role": "public",
  },
});

const webSocketClient = graphqlWS.createClient({
  url: WS_URL,
});

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider(client)}
                liveProvider={liveProvider(webSocketClient)}
                notificationProvider={useNotificationProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}
                resources={[
                  {
                    name: "dashboard",
                    list: "/dashboard",
                    meta: { label: "Dashboard", hideInMenu: true },
                  },
                  {
                    name: "products",
                    list: "/marketplace",
                    create: "/marketplace/create",
                    edit: "/marketplace/edit/:id",
                    show: "/marketplace/show/:id",
                    meta: { label: "Marketplace" },
                  },
                  {
                    name: "tracking",
                    list: "/tracking",
                    create: "/tracking/create",
                    edit: "/tracking/edit/:id",
                    meta: { label: "Tracking" },
                  },
                  {
                    name: "orders",
                    list: "/orders",
                    edit: "/orders/edit/:id",
                    meta: { label: "Orders" },
                  },
                  {
                    name: "customers",
                    list: "/customers",
                    create: "/customers/create",
                    edit: "/customers/edit/:id",
                    meta: { label: "Customers" },
                  },
                  {
                    name: "discounts",
                    list: "/discounts",
                    create: "/discounts/create",
                    edit: "/discounts/edit/:id",
                    meta: { label: "Discounts" },
                  },
                  {
                    name: "ledger",
                    list: "/ledger",
                    meta: { label: "Ledger" },
                  },
                  {
                    name: "taxes",
                    list: "/taxes",
                    create: "/taxes/create",
                    edit: "/taxes/edit/:id",
                    meta: { label: "Taxes" },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "vH4lu7-F2B7De-PUygJN",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/marketplace" element={<MarketplacePage />} />
                    <Route path="/tracking" element={<TrackingPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/orders/edit/:id" element={<OrdersPage />} />
                    <Route path="/customers" element={<CustomersPage />} />
                    <Route path="/discounts" element={<DiscountsPage />} />
                    <Route path="/ledger" element={<LedgerPage />} />
                    <Route path="/taxes" element={<TaxesPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/" element={<DashboardPage />} />
                  </Route>
                  <Route path="/login" element={<AuthPage />} />
                  <Route path="/register" element={<AuthPage />} />
                  <Route path="/forgot-password" element={<AuthPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
