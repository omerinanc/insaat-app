import React, { useState, useEffect } from "react";
import { Layout, Menu, FloatButton } from "antd";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import TaseronFirmalar from "./taseronfirmalar";
import Daireler from "./daireler";
import Createtaseron from "./createtaseron";
import Createdaire from "./createdaire";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Registration from "./auth/registration";
import Home from "./home";
import Dashboard from "./dashboard"; // Import your Dashboard component

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

const App: React.FC = () => {
  const [selectedItemKey, setSelectedItemKey] = useState("taseron-firmalar");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user's login status

  // You can use useEffect to check if the user is logged in when the component mounts
  useEffect(() => {
    // Check if the user is logged in by looking for a token in local storage
    const userIsLoggedIn = localStorage.getItem("token") !== null;
    console.log("is user logged in?", userIsLoggedIn);
    setIsLoggedIn(userIsLoggedIn); // Use the callback function to update the state
  }, []);

  const handleMenuItemClick = ({ key }: { key: string }) => {
    setSelectedItemKey(key);
    setIsFormOpen(false); // Close the form when switching between menu items
  };

  const handleCreateButtonClick = () => {
    setIsFormOpen(true); // Open the form when the "Create" button is clicked
  };

  return (
    <BrowserRouter>
      <Layout hasSider>
        <Sider
          className="mobile-header"
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
            items={items} // Use the 'items' prop to specify menu items
          />
        </Sider>

        <Layout>
          <Header />
          <Content>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/taseron-firmalar" element={<TaseronFirmalar />} />
              <Route path="/daireler" element={<Daireler />} />
              <Route path="/createtaseron" element={<Createtaseron />} />
              <Route path="/createdaire" element={<Createdaire />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/registration" element={<Registration />} />
              {isLoggedIn ? (
                // If logged in, redirect to Dashboard
                <Route path="/" element={<Navigate to="/dashboard" />} />
              ) : (
                // If not logged in, show Home page
                <Route path="/" element={<Home />} />
              )}
            </Routes>

            {/* {isFormOpen ? null : (
              <Link to="/create">
                <FloatButton
                  tooltip={<div> Create</div>}
                  onClick={handleCreateButtonClick}
                />
              </Link>
            )} */}
            <FloatButton.BackTop />
          </Content>
          <Footer style={{ textAlign: "center" }}> </Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
