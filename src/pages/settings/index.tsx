import React, { useState, useContext } from "react";
import { Button, Input, Card, Switch, Form, message, Divider } from "antd";
import { ColorModeContext } from "../../contexts/color-mode";

export const SettingsPage = () => {
  const colorMode = useContext(ColorModeContext);
  const setMode = colorMode?.setMode || ((_: string) => {});
  const [isDark, setIsDark] = useState(colorMode?.mode === "dark");

  const [formData, setFormData] = useState({
    name: "Harper Nelson",
    email: "harper.nelson@flup.com",
    phone: "+1 (555) 123-4567",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleDarkModeToggle = () => {
    setIsDark(!isDark);
    setMode(isDark ? "light" : "dark");
  };

  const handleSaveAccount = () => {
    message.success("Account settings updated successfully");
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      message.error("New passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      message.error("Password must be at least 8 characters");
      return;
    }
    message.success("Password updated successfully");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F0EFF4", padding: 32 }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#0D3D2B", marginBottom: 24 }}>Settings</h1>

        {/* Account Settings */}
        <Card style={{ marginBottom: 24, borderRadius: 12 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0D3D2B", marginBottom: 20 }}>Account Settings</h2>
          <Form layout="vertical" onFinish={handleSaveAccount}>
            <Form.Item label="Name">
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ height: 40, borderRadius: 8 }}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                type="email"
                style={{ height: 40, borderRadius: 8 }}
              />
            </Form.Item>
            <Form.Item label="Phone">
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                type="tel"
                style={{ height: 40, borderRadius: 8 }}
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#2ECC8F", borderColor: "#2ECC8F" }}
            >
              Save Changes
            </Button>
          </Form>
        </Card>

        {/* Display Settings */}
        <Card style={{ marginBottom: 24, borderRadius: 12 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0D3D2B", marginBottom: 20 }}>Display Settings</h2>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 500, color: "#0D3D2B" }}>Dark Mode</div>
              <div style={{ fontSize: 14, color: "#9B9B9B" }}>Toggle dark mode for the dashboard</div>
            </div>
            <Switch
              checked={isDark}
              onChange={handleDarkModeToggle}
              style={{ backgroundColor: isDark ? "#2ECC8F" : undefined }}
            />
          </div>
        </Card>

        {/* Change Password */}
        <Card style={{ marginBottom: 24, borderRadius: 12 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0D3D2B", marginBottom: 20 }}>Change Password</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#0D3D2B" }}>Current Password</label>
              <Input.Password
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                style={{ height: 40, borderRadius: 8, marginTop: 4 }}
              />
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#0D3D2B" }}>New Password</label>
              <Input.Password
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                style={{ height: 40, borderRadius: 8, marginTop: 4 }}
              />
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 500, color: "#0D3D2B" }}>Confirm New Password</label>
              <Input.Password
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                style={{ height: 40, borderRadius: 8, marginTop: 4 }}
              />
            </div>
            <Button
              type="primary"
              onClick={handlePasswordChange}
              style={{ backgroundColor: "#2ECC8F", borderColor: "#2ECC8F", width: 200 }}
            >
              Update Password
            </Button>
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card style={{ borderRadius: 12 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0D3D2B", marginBottom: 20 }}>Notification Preferences</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 500, color: "#0D3D2B" }}>Order Updates</div>
                <div style={{ fontSize: 14, color: "#9B9B9B" }}>Get notified about order status changes</div>
              </div>
              <Switch defaultChecked style={{ backgroundColor: "#2ECC8F" }} />
            </div>
            <Divider style={{ margin: "8px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 500, color: "#0D3D2B" }}>Delivery Notifications</div>
                <div style={{ fontSize: 14, color: "#9B9B9B" }}>Get notified about delivery schedules</div>
              </div>
              <Switch defaultChecked style={{ backgroundColor: "#2ECC8F" }} />
            </div>
            <Divider style={{ margin: "8px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 500, color: "#0D3D2B" }}>System Alerts</div>
                <div style={{ fontSize: 14, color: "#9B9B9B" }}>Get notified about system updates</div>
              </div>
              <Switch defaultChecked style={{ backgroundColor: "#2ECC8F" }} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
