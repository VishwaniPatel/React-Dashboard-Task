import { Divider, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import {
  IconLayoutDashboard,
  IconLogout,
  IconMoon,
  IconShoppingCartCog,
  IconSun,
  IconTemplate
} from "@tabler/icons-react";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import classes from "./Sidebar.module.css";
  const data = [
    { link: "/", label: "Dashboard", icon: IconLayoutDashboard  },
    { link: "/products", label: "Manage Products", icon: IconTemplate },
    { link: "/orders", label: "Manage Orders", icon: IconShoppingCartCog },
  ];

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    const links = data.map((item, index) => (
        // For navigation routes added link
        <Link to={item.link} key={index}>
          <li
            className={classes.link}
            data-active={item.label === active || undefined}
            key={item.label}
            onClick={() => {
              setActive(item.label);
            }}
          >
            <item.icon className={classes.linkIcon} size={20} stroke={1.3} />
            <span>{item.label}</span>
          </li>
        </Link>
      ));
      const handleLogout = () => {
        localStorage.removeItem("token"); // Remove the token from storage
        window.location.href = "/login"; // Redirect to login page
      };
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <ul style={{ paddingLeft: "0" }}>{links}</ul>
      </div>
      <div className={classes.footer}>
        <Divider my="md" />
      {/* Set color theme */}
        <div className={classes.link} style={{ cursor: "pointer" }} onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}>
          {computedColorScheme === "dark" ? (
            <>
              <IconSun className={classes.linkIcon} stroke={1.5} />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <IconMoon className={classes.linkIcon} stroke={1.5} />
              <span>Dark Mode</span>
            </>
          )}
        </div>
          {/* Logout */}
        <a
          href="#"
          className={classes.link}
          onClick={handleLogout}
        >
          <IconLogout
            className={classes.linkIcon}
            stroke={1.5}

          />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  )
}

export default Sidebar