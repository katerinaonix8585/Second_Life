import React, { useState } from "react";
import { FilterOutlined, HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "Home",
    "home",
    <Link to="/admin">
      <HomeOutlined />
    </Link>,
  ),
  getItem("Categories", "categories", <FilterOutlined />, [
    getItem(<Link to="categories/all">List category</Link>, "listCategory"),
    getItem(<Link to="categories">New category</Link>, "newCategory"),
  ]),
  getItem("Offers", "offers", <FilterOutlined />, [
    getItem(<Link to="offers/all">Verification</Link>, "verification"),
    getItem(<Link to="offers/all">Rejected</Link>, "rejected"),
    getItem(<Link to="offers/all">Auction started</Link>, "auction_started"),
    getItem(<Link to="offers/all">Qualification</Link>, "qualification"),
    getItem(<Link to="offers/all">Completed</Link>, "completed"),
    getItem(<Link to="offers/all">Cancelled</Link>, "cancelled"),
    getItem(<Link to="offers/all">Blocked</Link>, "blocked_by_admin"),
  ]),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "85vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ background: "rgb(171 166 239)" }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          style={{ background: "rgb(171 166 239)" }}
        ></Menu>
      </Sider>
      <Layout style={{ background: "white" }}>
        <Content style={{ margin: "0 16px", background: "white" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              borderRadius: borderRadiusLG,
              background: "white",
            }}
          ></div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
