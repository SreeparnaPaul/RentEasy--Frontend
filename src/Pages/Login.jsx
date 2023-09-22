import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Fab } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Form, Formik } from "formik";
import { initialValues, validation } from "../Validation/LoginValidation";
import axios from "axios";
import TextFieldCompo from "../Components/formFields/TextFieldCompo";
import SelectCompo from "../Components/formFields/SelectCompo";
import PasswordField from "../Components/formFields/PasswordField";
import { SweetAlert } from "../Utils/SweetAlert";
import { LoadingButton } from "../Utils/LoadingButton";
import Back from "../Utils/Back";

const Login = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const isValid = await validation.isValid(values);

      if (isValid) {
        setLoader(true);

        const headers = {
          "Content-Type": "application/json",
        };

        const response = await axios.post(
          `${process.env.REACT_APP_RENTAL}/user/login`,
          values,
          { headers }
        );

        console.log("Backend response:", response.data);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        setLoader(false);
        // SweetAlert("Success", "User logged in successfully", "success");
        navigate("/");
      } else {
        console.log("Form validation not satisfied, API call not made.");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoader(false);
      SweetAlert("Failed!", error.message, "error");
    }
  };

  return (
    <div className="wrap">
      <div className="registrationCard">
        <Back />
        <div className="card-body">
          <LoadingButton loader={loader} />
          <Fab color="primary" aria-label="add">
            <LockOpenIcon />
          </Fab>
          <h4 style={{ marginTop: "10px" }}>Login to INT. RentEasy</h4>
          <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={() => {}}
          >
            {(formik) => (
              <Form>
                <SelectCompo
                  label="Role*"
                  name="role"
                  type="text"
                  option1="Landlord"
                  option2="Tenant"
                 
                />
                <TextFieldCompo
                  label="Email Address*"
                  type="email"
                  name="email"
                />
                <PasswordField
                  label="Password*"
                  type="password"
                  name="password"
                />
                <div style={{ margin: "10px" }}>
                  Don't have an account?{" "}
                  <Link
                    to="/registration"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <b>Click here</b>
                  </Link>
                </div>
                <div style={{ margin: "10px" }}>
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={() => {
                      const formValues = formik.values;
                      handleSubmit(formValues);
                    }}
                  >
                    Login
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
