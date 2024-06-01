import { useFormik } from "formik";
import * as Yup from "yup";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";

import Button from "components/Button/Button.tsx";
import InputPassword from "components/InputPassword/InputPassword.tsx";
import InputWithIcon from "components/InputWithIcon/InputWithIcon.tsx";

import { LoginFormValues, LOGIN_FIELD_NAMES } from "./types.ts";
import {
  LoginFormComponent,
  LoginFormName,
  InputsContainer,
  ButtonWrapper,
} from "./styles.ts";

function RegistrationForm() {
  // Создаем валидационную схему Yup
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
    [LOGIN_FIELD_NAMES.NAME]: Yup.string()
      .required("Field name required")
      .matches(/^[a-zA-Z]*$/, "Name must contain only Latin characters")
      .test(
        "no-spaces",
        "Name must not contain spaces",
        (value) => !/\s/.test(value.trim()),
      ),
    [LOGIN_FIELD_NAMES.SURNAME]: Yup.string()
      .required("Field surname required")
      .matches(/^[a-zA-Z]*$/, "Surname must contain only Latin characters")
      .test(
        "no-spaces",
        "Surname must not contain spaces",
        (value) => !/\s/.test(value.trim()),
      ),
    [LOGIN_FIELD_NAMES.LOCATION]: Yup.string().required(
      "Field location required",
    ),
  });

  // Сохранение возвращаемого useFormik значения в переменную formik
  const formik = useFormik({
    initialValues: {
      [LOGIN_FIELD_NAMES.EMAIL]: "",
      [LOGIN_FIELD_NAMES.PASSWORD]: "",
      [LOGIN_FIELD_NAMES.REPEATPASSWORD]: "",
      [LOGIN_FIELD_NAMES.NAME]: "",
      [LOGIN_FIELD_NAMES.SURNAME]: "",
    } as LoginFormValues,
    validationSchema: schema,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values: LoginFormValues) => {
      console.log(values);
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
        <InputWithIcon
          iconDisable={true}
          name={LOGIN_FIELD_NAMES.NAME}
          placeholder="Name"
          icon={<CiUser />}
          onInputChange={formik.handleChange}
          value={formik.values[LOGIN_FIELD_NAMES.NAME]}
          error={formik.errors[LOGIN_FIELD_NAMES.NAME]}
          onBlur={formik.handleBlur}
        />
        <InputWithIcon
          iconDisable={true}
          name={LOGIN_FIELD_NAMES.SURNAME}
          placeholder="Surname"
          icon={<CiUser />}
          onInputChange={formik.handleChange}
          value={formik.values[LOGIN_FIELD_NAMES.SURNAME]}
          error={formik.errors[LOGIN_FIELD_NAMES.SURNAME]}
          onBlur={formik.handleBlur}
        />
      </InputsContainer>
      <ButtonWrapper>
        <Button type="submit" name="Sign up" />
      </ButtonWrapper>
    </LoginFormComponent>
  );
}

export default RegistrationForm;
