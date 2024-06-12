import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import ImageUpload from "components/ImageUpload/ImageUpload.tsx";
import Input from "components/Input/Input.tsx";
import TextArea from "components/TextArea/TestArea.tsx";
import Button from "components/Button/Button.tsx";

import {
  CategoryButtonWrapper,
  CategoryButtonsWrapper,
  CategoryHeadWrapper,
  CategoryImageWrapper,
  CategoryInfoWrapper,
  CategoryLeftWrapper,
  CategoryTextAreaWrapper,
  CategoryTextWrapper,
  CategoryWrapper,
  CatogoryInfoWrapper,
  HomeContainer,
  HomeWrapper,
  Tile,
} from "./style.ts";
import { CategoryFormValues, CATEGORY_DATA } from "./types.ts";

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api";

function CreateCategory() {
  const navigate = useNavigate();

  const formik = useFormik<CategoryFormValues>({
    initialValues: {
      [CATEGORY_DATA.NAME]: "",
      [CATEGORY_DATA.DESCRIPTION]: "",
    },
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values: CategoryFormValues) => {
      try {
        const errors: { field: string; message: string }[] = [];

        if (!values.name) {
          errors.push({
            field: CATEGORY_DATA.NAME,
            message: "Field Name is required",
          });
        } else if (values.name.length <= 5) {
          errors.push({
            field: CATEGORY_DATA.NAME,
            message: "Name must be longer than 5 characters",
          });
        }

        if (!values.description) {
          errors.push({
            field: CATEGORY_DATA.DESCRIPTION,
            message: "Field Description is required",
          });
        } else if (values.description.length <= 5) {
          errors.push({
            field: CATEGORY_DATA.DESCRIPTION,
            message: "Description must be longer than 5 characters",
          });
        }

        if (errors.length > 0) {
          throw errors;
        }

        const requestBody = {
          name: values.name,
          description: values.description,
        };

        console.log("Request body:", requestBody);

        const accessToken = localStorage.getItem("accessToken");

        const response = await fetch(`${BASE_URL}/v1/categories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestBody),
        });

        const responseData = await response.json();

        if (!response.ok) {
          let errorMessage = "An error occurred";

          if (response.status === 400) {
            errorMessage = responseData.message || "Bad request";
          } else if (response.status === 404) {
            errorMessage = responseData.message || "Resource not found";
          } else if (response.status === 500) {
            errorMessage = responseData.message || "Internal server error";
          }

          throw new Error(errorMessage);
        }

        console.log("Category created successfully:", responseData);
        const categoriesId = responseData.id;
        console.log(categoriesId);

        if (!categoriesId) {
          console.error("Id не найден");
          return;
        }

        navigate(`/categories/${categoriesId}`);
        // console.log(categoryId);
      } catch (errors: unknown) {
        console.error("Errors creating category:", errors);
        if (Array.isArray(errors)) {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          errors.forEach((error) => {
            if (error.field && error.message) {
              formik.setFieldError(error.field, error.message);
            }
          });
        }
      }
    },
  });

  return (
    <HomeWrapper>
      <HomeContainer>
        <CategoryWrapper onSubmit={formik.handleSubmit}>
          <CategoryHeadWrapper>
            <CategoryTextWrapper>
              <Tile>Create new category</Tile>
            </CategoryTextWrapper>
          </CategoryHeadWrapper>
          <CatogoryInfoWrapper>
            <CategoryImageWrapper>
              <ImageUpload />
            </CategoryImageWrapper>
            <CategoryLeftWrapper>
              <CategoryInfoWrapper>
                <Input
                  required={true}
                  label="Name"
                  name={CATEGORY_DATA.NAME}
                  onInputChange={formik.handleChange}
                  value={formik.values[CATEGORY_DATA.NAME] || ""}
                  error={formik.errors[CATEGORY_DATA.NAME]}
                  onBlur={formik.handleBlur}
                />
              </CategoryInfoWrapper>
              <CategoryInfoWrapper>
                <CategoryTextAreaWrapper>
                  <TextArea
                    required={true}
                    name={CATEGORY_DATA.DESCRIPTION}
                    label="Description"
                    placeholder="Description"
                    onInputChange={formik.handleChange}
                    value={formik.values[CATEGORY_DATA.DESCRIPTION] || ""}
                    error={formik.errors[CATEGORY_DATA.DESCRIPTION]}
                    onBlur={formik.handleBlur}
                  />
                </CategoryTextAreaWrapper>
              </CategoryInfoWrapper>
              <CategoryButtonsWrapper>
                <CategoryButtonWrapper>
                  <Button type="submit" background="#0A5F38" name="Submit" />
                </CategoryButtonWrapper>
                <CategoryButtonWrapper>
                  <Button
                    type="button"
                    background="grey"
                    name="Back"
                    onButtonClick={() => navigate(-1)}
                  />
                </CategoryButtonWrapper>
              </CategoryButtonsWrapper>
            </CategoryLeftWrapper>
          </CatogoryInfoWrapper>
        </CategoryWrapper>
      </HomeContainer>
    </HomeWrapper>
  );
}

export default CreateCategory;
