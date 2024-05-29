import { useFormik } from "formik";
import * as Yup from "yup";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { CiLocationOn, CiUser } from "react-icons/ci";
import { useState } from "react";

import Button from "components/Button/Button.tsx";
import Input from "components/Input/Input.tsx";
import InputPassword from "components/InputPassword/InputPassword.tsx";
import Select from "components/Select/Select.tsx";
import { locationsData } from "components/Select/SelectData.ts";

import { LoginFormValues, LOGIN_FIELD_NAMES, LocationType } from "./types.ts";
import {
  LoginFormComponent,
  LoginFormName,
  InputsContainer,
  ButtonWrapper,
} from "./styles.ts";

function RegistrationForm() {
  //создаем валидационную схему yup
  const shema = Yup.object().shape({
    [LOGIN_FIELD_NAMES.EMAIL]: Yup.string()
      .required("Field email required")
      .email("Please enter a valid email address"),
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
        "Password must be at most 10 characters",
        (value) => value.length <= 10,
      )
      .min(3, "Min 3 symbols"),
    [LOGIN_FIELD_NAMES.REPEATPASSWORD]: Yup.string()
      .required("Field password required")
      .oneOf([Yup.ref(LOGIN_FIELD_NAMES.PASSWORD)], "Passwords must match"),
    [LOGIN_FIELD_NAMES.NAME]: Yup.string().required("Field password required"),
    [LOGIN_FIELD_NAMES.SURNAME]: Yup.string().required(
      "Field surname required",
    ),
    [LOGIN_FIELD_NAMES.LOCATION]: Yup.string().required(
      "Field location required",
    ),
  });

  // сохранение возвращаемого useFormik значения в переменную formik
  const formik = useFormik({
    initialValues: {
      [LOGIN_FIELD_NAMES.EMAIL]: "",
      [LOGIN_FIELD_NAMES.PASSWORD]: "",
      [LOGIN_FIELD_NAMES.REPEATPASSWORD]: "",
      [LOGIN_FIELD_NAMES.NAME]: "",
      [LOGIN_FIELD_NAMES.SURNAME]: "",
      [LOGIN_FIELD_NAMES.LOCATION]: LocationType.Default,
    } as LoginFormValues,
    validationSchema: shema,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values: LoginFormValues) => {
      console.log(values);
    },
  });

  console.log(formik);

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (value: string | null) => {
    setSelectedValue(value !== null ? value : "");
  };

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
        <Input
          iconDisable={true}
          name={LOGIN_FIELD_NAMES.EMAIL}
          placeholder="Email"
          icon={<MdOutlineEmail />}
          onInputChange={formik.handleChange}
          value={formik.values[LOGIN_FIELD_NAMES.EMAIL]}
          error={formik.errors[LOGIN_FIELD_NAMES.EMAIL]}
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
          error={formik.errors[LOGIN_FIELD_NAMES.PASSWORD]}
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
        <Input
          iconDisable={true}
          name={LOGIN_FIELD_NAMES.NAME}
          placeholder="Name"
          icon={<CiUser />}
          onInputChange={formik.handleChange}
          value={formik.values[LOGIN_FIELD_NAMES.NAME]}
          error={formik.errors[LOGIN_FIELD_NAMES.NAME]}
          onBlur={formik.handleBlur}
        />
        <Input
          iconDisable={true}
          name={LOGIN_FIELD_NAMES.SURNAME}
          placeholder="Surname"
          icon={<CiUser />}
          onInputChange={formik.handleChange}
          value={formik.values[LOGIN_FIELD_NAMES.SURNAME]}
          error={formik.errors[LOGIN_FIELD_NAMES.SURNAME]}
          onBlur={formik.handleBlur}
        />
        <Select
          iconDisable={true}
          options={locationsData}
          value={selectedValue}
          onChange={handleChange}
          placeholder="Location"
          icon={<CiLocationOn />}
        />
      </InputsContainer>
      <ButtonWrapper>
        <Button type="submit" name="Sign up" />
      </ButtonWrapper>
    </LoginFormComponent>
  );
}

export default RegistrationForm;
