import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailIcon from "@mui/icons-material/Mail";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ListIcon from "@mui/icons-material/List";
import LogoutIcon from "@mui/icons-material/Logout";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import { useNavigate } from "react-router-dom";
import RaisedrentRequest from "../../Modals/RaisedrentRequest";

function ProfileDrawer(props) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const [openRaisedRentRequest, setOpenRaisedRentRequest] = useState(false);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login");
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 350 }}
      role="presentation"
      onKeyDown={props?.toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={userData?.name} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={userData?.email} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LocalPhoneIcon />
            </ListItemIcon>
            <ListItemText primary={userData?.phoneNumber} />
          </ListItemButton>
        </ListItem>
        {userData?.role !== "Broker" ? (
          <ListItem disablePadding>
            <ListItemButton
              onClick={(e) => {
                e.preventDefault();
                if (userData?.role === "Landlord")
                  navigate("/listProperty", {
                    replace: true,
                    state: { landlordEmail: userData?.email },
                  });
                else {
                  navigate("/rentedProperties");
                }
              }}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  userData?.role === "Landlord"
                    ? "My Listed Properties"
                    : "My Rented Properties"
                }
              />
            </ListItemButton>
          </ListItem>
        ) : null}
        {openRaisedRentRequest && (
          <RaisedrentRequest
            openModal={true}
            onClick={() => setOpenRaisedRentRequest(false)}
          />
        )}
        {userData.role === "Tenant" ? (
          <ListItem disablePadding>
            <ListItemButton onClick={() => setOpenRaisedRentRequest(true)}>
              <ListItemIcon>
                <RequestPageIcon />
              </ListItemIcon>
              <ListItemText primary={"Raised Rent Requests"} />
            </ListItemButton>
          </ListItem>
        ) : null}
        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Log Out"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div>
      <Drawer
        anchor="right"
        open={props?.rightOpen}
        onClose={props?.toggleDrawer(false)}
      >
        {list("right")}
      </Drawer>
    </div>
  );
}

export default ProfileDrawer;
