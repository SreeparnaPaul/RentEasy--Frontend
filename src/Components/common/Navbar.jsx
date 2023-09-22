import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import logo from "../../Images/RentEasylogo.png";
import MenuItem from "@mui/material/MenuItem";
import ProfileDrawer from "./ProfileDrawer";
import AddProperty from "../../Modals/AddProperty";
import { SweetAlert } from "../../Utils/SweetAlert";

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [openAddProperty, setOpenAddProperty] = React.useState(false);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const token = JSON.parse(localStorage.getItem("token"));
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [rightOpen, setRightOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setRightOpen(open);
  };

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#ffffff", color: "black" }}
    >
      <Container maxWidth="l">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{ margin: "10px" }}
              height="60px"
              width="250px"
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/listProperty");
                }}
              >
                <Typography
                  textAlign="center"
                  component="a"
                  href="/listProperty"
                >
                  <b> Properties</b>
                </Typography>
              </MenuItem>
              {/* <MenuItem
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/brokers");
                }}
              >
                <Typography textAlign="center" component="a" href="/brokers">
                  <b>Brokers</b>
                </Typography>
              </MenuItem> */}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{ margin: "10px" }}
              height="50px"
              width="150px"
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate("/listProperty");
              }}
              sx={{ my: 2, color: "black", display: "block" }}
            >
              <b> Properties</b>
            </Button>
            {/* <Button
              onClick={(e) => {
                e.preventDefault();
                navigate("/brokers");
              }}
              sx={{ my: 2, color: "black", display: "block" }}
            >
              <b>Brokers</b>
            </Button> */}
          </Box>
          {openAddProperty && (
            <AddProperty
              openModal={true}
              onClick={() => setOpenAddProperty(false)}
              // setFetchProperty={setFetchProperty}
            />
          )}
          <Button
            style={{
              color: "white",
              backgroundColor: "#3566AE",
              borderRadius: "20px",
              marginRight: "5px",
            }}
            onClick={() => {
              if (token) {
                if (userData?.role === "Landlord") {
                  if (userData?.isKycApproved) {
                    setOpenAddProperty(true);
                  } else {
                    SweetAlert(
                      "Warning!",
                      "Please verify your KYC ",
                      "warning"
                    );
                    navigate("/kycVerification");
                  }
                } else {
                  SweetAlert(
                    "Oops!",
                    "Only Landlord's can list properties",
                    "error"
                  );
                }
              } else {
                SweetAlert("Warning!", "Please Login first", "warning");
                navigate("/login");
              }
            }}
          >
            <b>List your Property</b>
          </Button>
          {rightOpen && (
            <ProfileDrawer toggleDrawer={toggleDrawer} rightOpen={rightOpen} />
          )}
          {!token ? (
            <Button
              style={{ color: "black" }}
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              <b>Sign In</b>
            </Button>
          ) : (
            <Avatar onClick={toggleDrawer(true)} />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
