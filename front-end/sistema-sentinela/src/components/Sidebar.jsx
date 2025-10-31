import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column vh-100 text-white"
      style={{ width: "240px", backgroundColor: "#1E293B" }}
    >
      <div className="d-flex flex-row gap-2 justify-content-center p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-shield-shaded"
          viewBox="0 0 16 16"
          color="#38B4A6"
        >
          <path
            fill-rule="evenodd"
            d="M8 14.933a1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"
          />
        </svg>
        <h4>Sentinela</h4>
      </div>
      <Nav className="flex-column gap-2">
        <div
          className="border-bottom mb-3"
          style={{ backgroundColor: "#334155", width: "100%" }}
        ></div>

        <Nav.Item className="mb-2">
          <Link
            to="/"
            className="nav-link text-white d-flex align-items-center gap-4"
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#38B4A6")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-graph-up"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"
              />
            </svg>
            Dashboard
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link
            to="/ocorrencias"
            className="nav-link text-white d-flex align-items-center gap-4"
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#38B4A6")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-exclamation-triangle"
              viewBox="0 0 16 16"
            >
              <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
              <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
            </svg>
            Novas Ocorrências
          </Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
