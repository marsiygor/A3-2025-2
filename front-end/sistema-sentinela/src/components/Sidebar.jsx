import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column text-white"
      style={{ width: "240px", backgroundColor: "#1E293B" }}
    >
      <div className="d-flex flex-row gap-2 justify-content-center p-4">
       <i class="bi bi-shield-shaded" style={{ color: "#38B4A6", display: "flex", fontSize: "25px" }}></i>
        <h4>Sentinela</h4>
      </div>
      <Nav className="flex-column gap-2">
        <div
          className="border-bottom mb-3"
          style={{ backgroundColor: "#334155", width: "100%" }}
        ></div>

        <Nav.Item className="mb-2">
          <NavLink
            to="/"
            className="nav-link text-white d-flex align-items-center gap-4"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#38B4A6" : "transparent",
              borderRadius: "4px",
              padding: "8px 12px",
            })}
          >
            <i class="bi bi-graph-up" style={{ fontSize: "20px" }}></i>
            Dashboard
          </NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink
            to="/ocorrencias"
            className="nav-link text-white d-flex align-items-center gap-4"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#38B4A6" : "transparent",
              borderRadius: "4px",
              padding: "8px 12px",
            })}
          >
            <i class="bi bi-exclamation-triangle" style={{fontSize: "20px" }}></i>
            Novas Ocorrências
          </NavLink>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
