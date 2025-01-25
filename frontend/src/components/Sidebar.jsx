import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import "./Sidebar.css";
import logo from "./images/TruthLens.png";
import image from "./images/manImg.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { auth } from "../firebase/firebase";

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  // const { userLoggedIn } = useAuth();
  const fetchUserData = async () => {
    auth.onAuthStateChanged((user) => {
      console.log("User: ", user);
      if (user) {
        console.log("User is signed in");
      } else {
        console.log("No user is signed in");
      }
    });
  };

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  }
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    fetchUserData();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = (e) => {
    const navLinks = document.querySelectorAll(".sidebar-nav a");
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  };

  return (
    <>
      <nav
        id="sidebar"
        className={`sidebar ${isMobileMenuOpen ? "mobile-open" : ""}`}
      >
        <div className="bg-[#212A31] sidebar-header">
          <img src={logo} alt="Logo" className="sidebar-logo" />
          <span className="sidebar-title">TruthLens</span>
        </div>

        <div className="bg-[#212A31] sidebar-nav">
          {/* Using Link to navigate to different pages */}
          <Link to="/dashboard" onClick={handleNavLinkClick} className="active">
            <i className="fas fa-file-alt"></i>
            <span>Overview</span>
          </Link>
          <Link to="/input" onClick={handleNavLinkClick} className="active">
            <i className="fas fa-file-alt"></i>
            <span>Input</span>
          </Link>
          {/* <Link to="/content-analysis" onClick={handleNavLinkClick}>
            <i className="fas fa-file-alt"></i>
            <span>Content</span>
          </Link> */}
          <Link to="/analytics" onClick={handleNavLinkClick}>
            <i className="fas fa-file-alt"></i>
            <span>Analytics</span>
          </Link>
          <Link to="/trend-and-report" onClick={handleNavLinkClick}>
            <i className="fas fa-chart-bar"></i>
            <span>Trends And Reports</span>
          </Link>
          <Link to="/settings" onClick={handleNavLinkClick}>
            <i className="fas fa-brain"></i>
            <span>Settings</span>
          </Link>
        </div>

        <div className="sidebar-footer">
          <div classname="user-info">
            <button className="btn-logout" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"> Logout</i>
            </button>
          </div>
          <div>
            <div className="user-info">
              {userLoggedIn ? (
                <div>
                  <img
                    className="user-avatar"
                    src={currentUser.photoURL}
                    alt="Profile"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                  <div className="user-details">
                    <p className="user-name">{currentUser.displayName}</p>
                    <p className="user-email">{currentUser.email}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="user-details">
                    <p className="user-name">Authenticoders</p>
                    <p className="user-email">Authenticoders.ai</p>
                  </div>
                  <img
                    className="user-avatar"
                    src={image}
                    alt="Profile"
                    loading="lazy"
                    id="el-amo17jis"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="mobile-menu">
        <button id="menu-toggle" onClick={toggleMobileMenu}>
          <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
