import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";

import Button from "components/Button/Button.tsx";
import InputPassword from "components/InputPassword/InputPassword.tsx";
import InputWithIcon from "components/InputWithIcon/InputWithIcon.tsx";

import {
  LoginFormComponent,
  LoginFormName,
  InputsContainer,
  ButtonWrapper,
  ErrorsContainer,
} from "./styles.ts";
import { LoginFormValues, LOGIN_FIELD_NAMES } from "./types.ts";

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api/v1";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    [LOGIN_FIELD_NAMES.EMAIL]: Yup.string()
      .required("Field email required")
      .email("Field type email"),
    [LOGIN_FIELD_NAMES.PASSWORD]: Yup.string().required(
      "Field password required",
    ),
  });

  const formik = useFormik({
    initialValues: {
      [LOGIN_FIELD_NAMES.EMAIL]: "",
      [LOGIN_FIELD_NAMES.PASSWORD]: "",
    } as LoginFormValues,
    validationSchema: schema,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values: LoginFormValues) => {
      console.log("Form submitted with values: ", values);

      const loginData = {
        email: values[LOGIN_FIELD_NAMES.EMAIL],
        password: values[LOGIN_FIELD_NAMES.PASSWORD],
      };

      const loginPath = location.pathname.includes("/user/login")
        ? "/auth/user/login"
        : "/auth/admin/login";

      try {
        const response = await fetch(`${BASE_URL}${loginPath}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Login successful:", data);

          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          const event = new CustomEvent("tokenUpdated");
          window.dispatchEvent(event);

          const homePath =
            location.pathname === "/auth/user/login" ? "/" : "/admin";

          console.log(location);
          console.log(homePath);
          navigate(homePath);
        } else {
          const errorData = await response.json();
          if (
            response.status === 400 &&
            errorData.message === "User not found"
          ) {
            setErrorMessage("User not found");
          } else if (
            response.status === 401 &&
            errorData.message === "Password is incorrect"
          ) {
            setErrorMessage("Password is incorrect");
          } else {
            setErrorMessage("Unknown error occurred");
          }
          console.error("Login failed: ", errorData);
        }
      } catch (error) {
        setErrorMessage("Error during login");
        console.error("Error during login:", error);
      }
    },
  });

  return (
    <LoginFormComponent onSubmit={formik.handleSubmit}>
      <LoginFormName>Login to Your Account</LoginFormName>
      <InputsContainer>
        <InputWithIcon
          name={LOGIN_FIELD_NAMES.EMAIL}
          placeholder="Enter your email"
          onInputChange={formik.handleChange}
          value={formik.values[LOGIN_FIELD_NAMES.EMAIL]}
          error={formik.errors[LOGIN_FIELD_NAMES.EMAIL]}
          onBlur={formik.handleBlur}
        />
        <InputPassword
          iconDisable={false}
          name={LOGIN_FIELD_NAMES.PASSWORD}
          type={showPassword ? "text" : "password"}
          icon={<MdOutlineEmail />}
          placeholder="Enter your password"
          onInputChange={formik.handleChange}
          value={formik.values[LOGIN_FIELD_NAMES.PASSWORD]}
          error={formik.errors[LOGIN_FIELD_NAMES.PASSWORD]}
          onBlur={formik.handleBlur}
          onClick={() => setShowPassword(!showPassword)}
        />
      </InputsContainer>
      {errorMessage && <ErrorsContainer>{errorMessage}</ErrorsContainer>}
      <ButtonWrapper>
        <Button type="submit" name="Sign in" />
      </ButtonWrapper>
    </LoginFormComponent>
  );
}

export default LoginForm;
