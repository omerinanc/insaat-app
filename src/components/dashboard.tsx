import React, { useState } from "react";
import { Layout, Menu, FloatButton } from "antd";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import TaseronFirmalar from "./taseronfirmalar";
import Daireler from "./daireler";
import Createtaseron from "./createtaseron";
import Createdaire from "./createdaire";

import { Route, Link, Routes } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: "taseron-firmalar",
    icon: <UserOutlined />,
    label: "Taşeron Firmalar",
  },
  {
    key: "daireler",
    icon: <HomeOutlined />,
    label: "Daireler",
  },
];

const Dashboard: React.FC = () => {
  const [selectedItemKey, setSelectedItemKey] = useState("taseron-firmalar");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleMenuItemClick = ({ key }: { key: string }) => {
    setSelectedItemKey(key);
    setIsFormOpen(false); // Close the form when switching between menu items
  };

  const handleCreateButtonClick = () => {
    setIsFormOpen(true); // Open the form when the "Create" button is clicked
  };
  const handleCreateDaireButtonClick = () => {
    setIsFormOpen(true); // Open the form when the "Create" button is clicked
  };

  return (
    <div>
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedItemKey]}
            onClick={handleMenuItemClick}
            items={items}
          />
        </Sider>

        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            {/* <h1>Status: {loggedInStatus}</h1>

          <button
            onClick={() => handleLogoutClick()}
            className="btn btn-primary btn-sm"
          >
            Logout
          </button> */}
            <Routes>
              <Route path="/createtaseron" element={<Createtaseron />} />
              <Route path="/createdaire" element={<Createdaire />} />
            </Routes>
            {selectedItemKey === "taseron-firmalar" && !isFormOpen && (
              <TaseronFirmalar />
            )}
            {selectedItemKey === "daireler" && !isFormOpen && <Daireler />}
            {isFormOpen ? null : ( // Render nothing when the form is open
              <Link to="/createtaseron">
                <FloatButton
                  tooltip={<div> Taseron Firma</div>}
                  onClick={handleCreateButtonClick}
                  icon={<UserOutlined />}
                />
              </Link>
            )}
            {isFormOpen ? null : ( // Render nothing when the form is open
              <Link to="/createdaire">
                <FloatButton
                  tooltip={<div> Daire</div>}
                  onClick={handleCreateDaireButtonClick}
                  icon={<HomeOutlined />}
                  style={{ right: 90 }}
                />
              </Link>
            )}
            <FloatButton.BackTop />
          </Content>
          <Footer style={{ textAlign: "center" }}> </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
