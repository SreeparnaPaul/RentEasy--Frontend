import React, { useState } from "react";
import { Button, Fab } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Form, Formik } from "formik";
import { initialValues, validation } from "../Validation/KycValidation";
import TextFieldCompo from "../Components/formFields/TextFieldCompo";
import { MuiFileInput } from "mui-file-input";
import { LoadingButton } from "../Utils/LoadingButton";
import axios from "axios";
import { SweetAlert } from "../Utils/SweetAlert";
import { useNavigate } from "react-router-dom";
import Back from "../Utils/Back";

const KycVerification = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleSubmit = async (values) => {
    console.log(values);
    console.log(aadharFile.name);
    console.log(panFile);
    try {
      const isValid = await validation.isValid(values);

      if (isValid && aadharFile !== "" && panFile.length !== "") {
        setLoader(true);

        const data = {
          aadharNumber: values.aadharNumber,
          panNumber: values.panNumber,
          aadharFile: aadharFile.name,
          panFile: panFile.name,
        };
        const headers = {
          "Content-Type": "application/json",
        };

        const response = await axios.put(
          `${process.env.REACT_APP_RENTAL}/user/kycVerification?userId=${userData?._id}`,
          data,
          { headers }
        );

        console.log("Backend response:", response.data);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        setLoader(false);
        SweetAlert("Success", "Kyc verified successfully", "success");
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
  const [aadharFile, setAadharFile] = useState(null);
  const [panFile, setPanFile] = useState(null);

  const handleAadharChange = (newValue) => {
    setAadharFile(newValue);
  };

  const handlePanChange = (newValue) => {
    setPanFile(newValue);
  };

  return (
    <div className="wrap">
      <div className="registrationCard">
        <Back />
        <div className="card-body">
          <LoadingButton loader={loader} />
          <Fab color="primary" aria-label="add">
            <PermIdentityIcon />
          </Fab>
          <h4 style={{ marginTop: "10px" }}>KYC Verification</h4>
          <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={() => {}}
          >
            {(formik) => (
              <Form>
                <TextFieldCompo
                  label="Aadhar Number*"
                  type="text"
                  name="aadharNumber"
                />
                <MuiFileInput
                  variant="standard"
                  sx={{ m: 1, width: "90%" }}
                  label="Aadhar File*"
                  type="file"
                  name="aadharFile"
                  value={aadharFile}
                  onChange={handleAadharChange}
                />
                <TextFieldCompo
                  label="Pan Number*"
                  type="text"
                  name="panNumber"
                />

                <MuiFileInput
                  variant="standard"
                  sx={{ m: 1, width: "90%" }}
                  label="Pan File*"
                  type="file"
                  name="panFile"
                  value={panFile}
                  onChange={handlePanChange}
                />

                <div style={{ margin: "10px" }}>
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={() => {
                      const formValues = formik.values;
                      handleSubmit(formValues);
                    }}
                  >
                    Verification
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

export default KycVerification;
