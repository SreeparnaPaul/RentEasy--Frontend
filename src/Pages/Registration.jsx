import React, { useState } from "react";
import { Button, Fab } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import { Form, Formik } from "formik";
import {
  initialValues,
  validationSchema,
} from "../Validation/RegisterValidation";
import axios from "axios";
import TextFieldCompo from "../Components/formFields/TextFieldCompo";
import SelectCompo from "../Components/formFields/SelectCompo";
import PasswordField from "../Components/formFields/PasswordField";
import { SweetAlert } from "../Utils/SweetAlert";
import { LoadingButton } from "../Utils/LoadingButton";
import Back from "../Utils/Back";

const Registration = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    console.log({ values });
    try {
      const isValid = await validationSchema.isValid(values);

      if (isValid) {
        const filteredValues = { ...values };
        if (!values?.presentAddress) {
          delete filteredValues?.presentAddress;
        }
        if (!values?.permanentAddress) {
          delete filteredValues?.permanentAddress;
        }

        console.log("Form values:", filteredValues);
        setLoader(true);

        const headers = {
          "Content-Type": "application/json",
        };

        const response = await axios.post(
          `${process.env.REACT_APP_RENTAL}/user/signup`,
          filteredValues,
          { headers }
        );

        console.log("Backend response:", response.data);
        setLoader(false);
        SweetAlert("Success", "User registered successfully", "success");
        navigate("/login");
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
    <>
      <div className="wrap">
        <div className="registrationCard">
          <Back />
          <div className="card-body">
            <LoadingButton loader={loader} />
            <Fab color="primary" aria-label="add">
              <LockIcon />
            </Fab>
            <h4 style={{ marginTop: "10px" }}>Sign up to INT. RentEasy</h4>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={() => {}}
            >
              {(formik) => (
                <Form>
                  <TextFieldCompo label="Name*" type="text" name="name" />
                  <SelectCompo
                    label="Role*"
                    name="role"
                    type="text"
                    option1="Landlord"
                    option2="Tenant"
                    option3="Broker"
                  />
                  {formik.values.role === "Broker" ? (
                    <TextFieldCompo label="Area*" type="text" name="area" />
                  ) : null}
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
                  <TextFieldCompo
                    label="Phone Number*"
                    type="text"
                    name="phoneNumber"
                  />
                  <TextFieldCompo
                    label="Present Address"
                    type="text"
                    name="presentAddress"
                  />
                  <TextFieldCompo
                    label="Permanent Address"
                    type="text"
                    name="permanentAddress"
                  />
                  <TextFieldCompo label="City" type="text" name="city" />
                  <TextFieldCompo
                    label="Pincode"
                    type="number"
                    name="pincode"
                  />
                  <TextFieldCompo label="State" type="text" name="state" />
                  <div style={{ margin: "12px" }}>
                    Already have an account?{" "}
                    <Link
                      to="/login"
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
                        const formValues = { ...formik.values };

                        if (formValues.role !== "Broker") {
                          delete formValues.area;
                        }
                        handleSubmit(formValues);
                      }}
                    >
                      Register
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
