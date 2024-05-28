import Button from "components/Button/Button.tsx";
import {
  LoginFormComponent,
  LoginFormName,
  InputsContainer,
  ButtonWrapper,
} from "./styles.ts";
import { useFormik } from "formik";
import { LoginFormValues, LOGIN_FIELD_NAMES, LocationType } from "./types.ts";
import * as Yup from "yup";
import InputRegistration from "components/InputRegistration/InputRegistration.tsx";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { CiLocationOn, CiUser } from "react-icons/ci";
import SelectRegistration from "components/SelectRegistration/SelectRegistration.tsx";

function RegistrationForm() {
  //создаем валидационную схему yup
  const shema = Yup.object().shape({
    [LOGIN_FIELD_NAMES.EMAIL]: Yup.string()
      .required("Field email required")
      .email("Please enter a valid email address"),
    // [LOGIN_FIELD_NAMES.PASSWORD]: Yup.string().required('Field password required'),
    [LOGIN_FIELD_NAMES.PASSWORD]: Yup.string()
      .typeError("Password must be number")
      .required("Field password required")
      .max(10, "Max 10 symbols")
      .min(3, "Min 3 symbols"),
    [LOGIN_FIELD_NAMES.REPEATPASSWORD]: Yup.string()
      .required("Field password required")
      .oneOf([Yup.ref(LOGIN_FIELD_NAMES.PASSWORD)], "Passwords must match"), 
    [LOGIN_FIELD_NAMES.NAME]: Yup.string()
      .required("Field password required"),
    [LOGIN_FIELD_NAMES.SURNAME]: Yup.string()
      .required("Field password required"),
    [LOGIN_FIELD_NAMES.LOCATION]: Yup.string()
      .required("Field password required"), 
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

  return (
    //привязываем к элементу формы действие submit
    <LoginFormComponent onSubmit={formik.handleSubmit}>
      <LoginFormName>Login to Your Account</LoginFormName>
      <InputsContainer>
         <InputRegistration
          name={LOGIN_FIELD_NAMES.EMAIL}
          placeholder="Email"
          icon={<MdOutlineEmail />} 
          onInputChange={formik.handleChange}
          value={formik.values[LOGIN_FIELD_NAMES.EMAIL]}
          error={formik.errors[LOGIN_FIELD_NAMES.EMAIL]}
          onBlur={formik.handleBlur}
        />
        <InputRegistration
          name={LOGIN_FIELD_NAMES.PASSWORD}
          type="password"
          placeholder="Password"
          icon={<RiLockPasswordLine />} 
          onInputChange={formik.handleChange}
          value={formik.values[LOGIN_FIELD_NAMES.PASSWORD]}
          error={formik.errors[LOGIN_FIELD_NAMES.PASSWORD]}
          onBlur={formik.handleBlur}
        />         
        <InputRegistration
          name={LOGIN_FIELD_NAMES.REPEATPASSWORD}
          placeholder="Repeat password"
          icon={<RiLockPasswordLine />} 
          onInputChange={formik.handleChange}
          value={formik.values[LOGIN_FIELD_NAMES.REPEATPASSWORD]}
          error={formik.errors[LOGIN_FIELD_NAMES.REPEATPASSWORD]}
          onBlur={formik.handleBlur}
        />
        <InputRegistration
          name={LOGIN_FIELD_NAMES.NAME}
          placeholder="Name"
          icon={<CiUser />} 
          onInputChange={formik.handleChange}
          value={formik.values[LOGIN_FIELD_NAMES.NAME]}
          error={formik.errors[LOGIN_FIELD_NAMES.NAME]}
          onBlur={formik.handleBlur}
        />
        <InputRegistration
          name={LOGIN_FIELD_NAMES.SURNAME}
          placeholder="Surname"
          icon={<CiUser />} 
          onInputChange={formik.handleChange}
          value={formik.values[LOGIN_FIELD_NAMES.SURNAME]}
          error={formik.errors[LOGIN_FIELD_NAMES.SURNAME]}
          onBlur={formik.handleBlur}
        />      
      <SelectRegistration
          name={LOGIN_FIELD_NAMES.LOCATION}
          placeholder="Location"
          type=""
          options={[
            { label: 'Location 1', value: 'location1' },
            { label: 'Location 2', value: 'location2' },
            { label: 'Location 3', value: 'location3' },
          ]}
          icon={<CiLocationOn />} 
          onInputChange={formik.handleChange}
          value={formik.values[LOGIN_FIELD_NAMES.LOCATION]}
          error={formik.errors[LOGIN_FIELD_NAMES.LOCATION]}
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
