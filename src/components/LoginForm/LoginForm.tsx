import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
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

  const shema = Yup.object().shape({
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
    validationSchema: shema,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values: LoginFormValues) => {
      console.log("Form submitted with values: ", values);
    },
  });

  return (
    <LoginFormComponent
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Form submit event triggered");
        formik.handleSubmit(e);
      }}
    >
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
