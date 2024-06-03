import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";

import Button from "components/Button/Button.tsx";
import InputPassword from "components/InputPassword/InputPassword.tsx";
import InputWithIcon from "components/InputWithIcon/InputWithIcon.tsx";

import {
  LoginFormComponent,
  LoginFormName,
  InputsContainer,
  ButtonWrapper,
} from "./styles.ts";
import { LoginFormValues, LOGIN_FIELD_NAMES } from "./types.ts";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

      try {
        const response = await fetch(
          "https://second-life-app-y2el9.ondigitalocean.app/api/v1/auth/user/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
          },
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Login successful:", data);

          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          const from = location.state?.from?.pathname || "/";
          navigate(from, { replace: true });
        } else {
          console.error("Login failed");
          // Обработка ошибки логина
        }
      } catch (error) {
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
      <ButtonWrapper>
        <Button type="submit" name="Sign in" />
      </ButtonWrapper>
    </LoginFormComponent>
  );
}

export default LoginForm;
