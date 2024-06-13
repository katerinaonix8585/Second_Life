import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import Button from "components/Button/Button.tsx";
import InputPassword from "components/InputPassword/InputPassword.tsx";
import InputWithIcon from "components/InputWithIcon/InputWithIcon.tsx";
import ModalWindowRegistration from "components/ModalWindowRegistration/ModalWindowRegistration.tsx";

import { LoginFormValues, LOGIN_FIELD_NAMES } from "./types.ts";
import {
  LoginFormComponent,
  LoginFormName,
  InputsContainer,
  ButtonWrapper,
  WindowWrapper,
} from "./styles.ts";

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api/v1";

function RegistrationForm() {
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState<{ [key: string]: string }>(
    {},
  );
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const schema = Yup.object().shape({
    [LOGIN_FIELD_NAMES.EMAIL]: Yup.string()
      .required("Field email required")
      .email("Please enter a valid email address")
      .test("email-extension", "Email must contain an extension", (value) => {
        if (!value) return false;
        const [, domain] = value.split("@");
        if (!domain) return false;
        return domain.includes(".");
      })
      .matches(
        /^[a-zA-Z0-9!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]*$/,
        "Email must contain Latin characters, numbers and special symbols",
      ),
    [LOGIN_FIELD_NAMES.PASSWORD]: Yup.string()
      .required("Field password required")
      .test("password", "Password must contain at least one digit", (value) =>
        /\d/.test(value),
      )
      .test("password", "Password must contain at least one letter", (value) =>
        /[a-zA-Z]/.test(value),
      )
      .test(
        "password",
        "Password must contain at least one special character",
        (value) => /[\W_]/.test(value),
      )
      .test(
        "password",
        "Password must not contain spaces",
        (value) => !/\s/.test(value),
      )
      .test(
        "password",
        "Password must be at most 15 characters",
        (value) => value.length <= 15,
      )
      .min(8, "Min 8 symbols")
      .matches(
        /^[a-zA-Z0-9!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]*$/,
        "Password must contain only Latin characters",
      ),
    [LOGIN_FIELD_NAMES.REPEATPASSWORD]: Yup.string()
      .required("Field password required")
      .oneOf([Yup.ref(LOGIN_FIELD_NAMES.PASSWORD)], "Passwords must match"),
    [LOGIN_FIELD_NAMES.FIRSTNAME]: Yup.string()
      .required("Field First name required")
      .matches(/^[a-zA-Z]*$/, "Name must contain only Latin characters")
      .test(
        "no-spaces",
        "Name must not contain spaces",
        (value) => !/\s/.test(value.trim()),
      ),
    [LOGIN_FIELD_NAMES.LASTNAME]: Yup.string()
      .required("Field Last name required")
      .matches(/^[a-zA-Z]*$/, "Lastname must contain only Latin characters")
      .test(
        "no-spaces",
        "Lastname must not contain spaces",
        (value) => !/\s/.test(value.trim()),
      ),
  });

  const formik = useFormik({
    initialValues: {
      [LOGIN_FIELD_NAMES.EMAIL]: "",
      [LOGIN_FIELD_NAMES.PASSWORD]: "",
      [LOGIN_FIELD_NAMES.REPEATPASSWORD]: "",
      [LOGIN_FIELD_NAMES.FIRSTNAME]: "",
      [LOGIN_FIELD_NAMES.LASTNAME]: "",
    } as LoginFormValues,
    validationSchema: schema,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values: LoginFormValues) => {
      console.log("Form submitted with values: ", values);

      const registrationData = {
        firstName: values[LOGIN_FIELD_NAMES.FIRSTNAME],
        lastName: values[LOGIN_FIELD_NAMES.LASTNAME],
        email: values[LOGIN_FIELD_NAMES.EMAIL],
        password: values[LOGIN_FIELD_NAMES.PASSWORD],
      };

      try {
        const response = await fetch(`${BASE_URL}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Registration successful:", data);
          setRegistrationSuccess(true);
        } else {
          const errorData = await response.json();
          if (response.status === 409) {
            setServerErrors({ email: "Email already exists" });
          } else if (response.status === 400 && errorData.errors) {
            const newErrors: { [key: string]: string } = {};
            errorData.errors.forEach(
              (err: { field: string; message: string }) => {
                newErrors[err.field] = err.message;
              },
            );
            setServerErrors(newErrors);
          } else {
            setServerErrors({ general: "Unknown error occurred" });
          }
          console.error("Registration failed: ", errorData);
        }
      } catch (error) {
        setServerErrors({ general: "Error during registration" });
        console.error("Error during registration:", error);
      }
    },
  });

  const handleOkClick = () => {
    setRegistrationSuccess(false);
    navigate("/auth/user/login");
  };

  return (
    <LoginFormComponent
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Form submit event triggered");
        formik.handleSubmit(e);
      }}
    >
      <LoginFormName>Register a New Account</LoginFormName>
      <InputsContainer>
        <InputWithIcon
          iconDisable={true}
          name={LOGIN_FIELD_NAMES.EMAIL}
          placeholder="Email"
          icon={<MdOutlineEmail />}
          onInputChange={formik.handleChange}
          value={formik.values[LOGIN_FIELD_NAMES.EMAIL]}
          error={formik.errors[LOGIN_FIELD_NAMES.EMAIL] || serverErrors.email}
          onBlur={formik.handleBlur}
        />
        <InputPassword
          iconDisable={true}
          name={LOGIN_FIELD_NAMES.PASSWORD}
          type="password"
          placeholder="Password"
          icon={<RiLockPasswordLine />}
          onInputChange={formik.handleChange}
          value={formik.values[LOGIN_FIELD_NAMES.PASSWORD]}
          error={
            formik.errors[LOGIN_FIELD_NAMES.PASSWORD] || serverErrors.password
          }
          onBlur={formik.handleBlur}
        />
        <InputPassword
          iconDisable={true}
          name={LOGIN_FIELD_NAMES.REPEATPASSWORD}
          placeholder="Repeat password"
          icon={<RiLockPasswordLine />}
          onInputChange={formik.handleChange}
          value={formik.values[LOGIN_FIELD_NAMES.REPEATPASSWORD]}
          error={formik.errors[LOGIN_FIELD_NAMES.REPEATPASSWORD]}
          onBlur={formik.handleBlur}
        />
        <InputWithIcon
          iconDisable={true}
          name={LOGIN_FIELD_NAMES.FIRSTNAME}
          placeholder="First name"
          icon={<CiUser />}
          onInputChange={formik.handleChange}
          value={formik.values[LOGIN_FIELD_NAMES.FIRSTNAME]}
          error={
            formik.errors[LOGIN_FIELD_NAMES.FIRSTNAME] || serverErrors.firstName
          }
          onBlur={formik.handleBlur}
        />
        <InputWithIcon
          iconDisable={true}
          name={LOGIN_FIELD_NAMES.LASTNAME}
          placeholder="Last name"
          icon={<CiUser />}
          onInputChange={formik.handleChange}
          value={formik.values[LOGIN_FIELD_NAMES.LASTNAME]}
          error={
            formik.errors[LOGIN_FIELD_NAMES.LASTNAME] || serverErrors.lastName
          }
          onBlur={formik.handleBlur}
        />
      </InputsContainer>
      {serverErrors.general && (
        <div style={{ color: "red" }}>{serverErrors.general}</div>
      )}
      {registrationSuccess && (
        <ModalWindowRegistration title="Message" onOk={handleOkClick}>
          <WindowWrapper>
            Registration successful. Please sign in.
          </WindowWrapper>
        </ModalWindowRegistration>
      )}
      {!registrationSuccess && (
        <ButtonWrapper>
          <Button type="submit" name="Sign up" />
        </ButtonWrapper>
      )}
    </LoginFormComponent>
  );
}

export default RegistrationForm;
