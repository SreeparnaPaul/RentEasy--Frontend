import TaskAltIcon from "@mui/icons-material/TaskAlt";

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export const tickIcon = (
  <TaskAltIcon
    color="primary"
    fontSize="large"
    style={{ marginRight: "5px", marginLeft: "5px" }}
  />
);
export const labelStyle = {
  marginTop: "5px",
  display: "flex",
  justifyContent: "space-between",
  fontSize: "16px",
  width: "100%",
  textAlign: "left",
  letterSpacing: "1px",
};
export function formatTimestampWithAMPM(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so we add 1
  const day = date.getDate().toString().padStart(2, "0");
  let hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;
  return formattedDateTime;
}
