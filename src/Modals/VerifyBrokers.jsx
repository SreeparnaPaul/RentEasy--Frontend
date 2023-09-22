import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { LoadingButton } from "../Utils/LoadingButton";
import { modalStyle } from "../Utils/Common";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";

const VerifyBrokers = (props) => {
  const [open, setOpen] = useState(props.openModal);
  const [loading, setLoading] = useState(false);
  const [brokerData, setBrokerData] = React.useState([]);

  const handleClose = () => {
    setOpen(false);
    props.onClick();
  };

  React.useEffect(() => {
    fetchBrokerDetails();
  }, []);

  const fetchBrokerDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_RENTAL}/user/getUsers?role=Broker`
      );
      console.log("Backend response:", response);
      setBrokerData(response?.data?.userFromDB || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching broker data:", error);
    }
  };
  // const load = <LoadingButton loader={loading} />;

  const modalHeight = brokerData.length * 90 + 150;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper style={{ maxHeight: modalHeight, overflowY: "auto" }}>
          <div>
            <LoadingButton loader={loading} />
            <Box sx={modalStyle}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  marginBottom: "16px",
                  fontWeight: "600",
                }}
              >
                Verified By Brokers
              </Typography>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {brokerData &&
                      brokerData.map((user, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <AccountCircleSharpIcon
                              sx={{
                                color: "#3566AE",
                                marginRight: "8px",
                                verticalAlign: "middle",
                              }}
                            />
                            {user.name}
                          </TableCell>

                          <TableCell>{user.email}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </div>
        </Paper>
      </Modal>
    </div>
  );
};

export default VerifyBrokers;
