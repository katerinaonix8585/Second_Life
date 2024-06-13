import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ImageUpload from "components/ImageUpload/ImageUpload.tsx";
import Input from "components/Input/Input.tsx";
import TextArea from "components/TextArea/TestArea.tsx";
import Button from "components/Button/Button.tsx";
import { useAppDispatch } from "store/hooks.ts";
import { categorysOneDataSliceActions } from "store/redux/categoryOne/categoryOneSlice.ts";
import { CategoryData } from "store/redux/categoryOne/types.ts";

import {
  CategoryButtonWrapper,
  CategoryButtonsWrapper,
  CategoryHeadWrapper,
  CategoryImageWrapper,
  CategoryInfoTextWrapper,
  CategoryInfoWrapper,
  CategoryLeftWrapper,
  CategoryTextAreaWrapper,
  CategoryTextWrapper,
  CategoryWrapper,
  CatogoryInfoWrapper,
  HomeContainer,
  HomeWrapper,
  Tile,
  TileStatus,
  TileStatusName,
} from "./style.ts";
import { CategoryFormValues, CATEGORY_DATA } from "./types.ts";

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api";

function EditCategory() {
  const { id = "" } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  console.log(categoryData);

  useEffect(() => {
    console.log("Component mounted with categoryId:", id);
    if (id) {
      dispatch(categorysOneDataSliceActions.getCategoryById(id))
        .then((response) => {
          console.log("getCategoryById response:", response);
          setCategoryData(response.payload);
          formik.setValues({
            [CATEGORY_DATA.NAME]: response.payload.name || "",
            [CATEGORY_DATA.DESCRIPTION]: response.payload.description || "",
            [CATEGORY_DATA.ACTIVE]: response.payload.active || "",
          });
        })
        .catch((error) => {
          console.error("getCategoryById error:", error);
        });
    }
  }, [dispatch, id]);

  const formik = useFormik<CategoryFormValues>({
    initialValues: {
      [CATEGORY_DATA.NAME]: "",
      [CATEGORY_DATA.DESCRIPTION]: "",
      [CATEGORY_DATA.ACTIVE]: false,
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
            message: "Name is required",
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
            message: "Description is required",
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

        const accessAdminToken = localStorage.getItem("accessAdminToken");

        const response = await fetch(`${BASE_URL}/v1/categories/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessAdminToken}`,
          },
          body: JSON.stringify(requestBody),
        });

        const responseData = await response.json();

        if (!response.ok) {
          let errorMessage = "An error occurred";

          if (response.status === 400) {
            errorMessage = responseData.message || "Bad request";
          } else if (response.status === 404) {
            errorMessage = responseData.message || "Category not found";
          } else if (response.status === 500) {
            errorMessage = responseData.message || "Internal server error";
          }

          throw new Error(errorMessage);
        }

        console.log("Category updated successfully:", responseData);

        navigate(`/categories/${id}`);
      } catch (errors: unknown) {
        console.error("Errors updating category:", errors);
        if (Array.isArray(errors)) {
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
              <Tile>Edit Category</Tile>
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
                  value={formik.values[CATEGORY_DATA.NAME]}
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
                    value={formik.values[CATEGORY_DATA.DESCRIPTION]}
                    error={formik.errors[CATEGORY_DATA.DESCRIPTION]}
                    onBlur={formik.handleBlur}
                  />
                </CategoryTextAreaWrapper>
              </CategoryInfoWrapper>
              <CategoryInfoTextWrapper>
                <TileStatusName>Status: </TileStatusName>
                <TileStatus>
                  {formik.values[CATEGORY_DATA.ACTIVE] ? "aktive" : "inactive"}
                </TileStatus>
              </CategoryInfoTextWrapper>
              <CategoryButtonsWrapper>
                <CategoryButtonWrapper>
                  <Button type="submit" background="#0A5F38" name="Save" />
                </CategoryButtonWrapper>
                <CategoryButtonWrapper>
                  <Button
                    type="button"
                    background="grey"
                    name="Back"
                    onButtonClick={() => navigate(`/categories/${id}`)}
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

export default EditCategory;
