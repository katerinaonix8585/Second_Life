import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

import ImageUpload from "components/ImageUpload/ImageUpload";
import Input from "components/Input/Input";
import Select from "components/Select/Select";
import { SelectDataProps } from "components/Select/types";
import TextArea from "components/TextArea/TestArea";
import { locationsData } from "pages/Layout/LocationData";
import Button from "components/Button/Button";
import { CategoryData } from "components/CategoryCard/types";

import {
  OfferButtonWrapper,
  OfferButtonsWrapper,
  OfferImageWrapper,
  OfferInfoWrapper,
  OfferSelectWrapper,
  OfferText,
  OfferTextAreaWrapper,
  OfferTextWrapper,
  OfferUpWrapper,
  OfferWrapper,
} from "./styles";
import { OFFER_DATA, OfferFormValues, TypeOfferData } from "./types";
import { typeOfferData } from "./OffersData";

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api/v1";

function CreateOffer() {
  const [selectedType, setSelectedType] = useState<TypeOfferData | null>(null);
  const [categoriesData, setCategoriesData] = useState<CategoryData[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/categories`);
      const data = await response.json();
      setCategoriesData(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const typeOfferOptions: SelectDataProps<string>[] = typeOfferData.map(
    (offer) => ({
      selectData: {
        index: offer.id as number,
        value: offer.value,
      },
    }),
  );

  const typeCategoryOptions: SelectDataProps<string>[] = categoriesData.map(
    (category) => ({
      selectData: {
        index: category.id,
        value: category.name,
      },
    }),
  );

  const locationOptions: SelectDataProps<string>[] = locationsData.map(
    (location) => ({
      selectData: {
        index: location.id,
        value: location.value,
      },
    }),
  );

  const typeSchema = Yup.object().shape({
    id: Yup.number().required(),
    value: Yup.string().required(),
  });

  const schema = Yup.object().shape({
    [OFFER_DATA.TITLE]: Yup.string().required("Field title required"),
    [OFFER_DATA.DESCRIPTION]: Yup.string().required(
      "Field description required",
    ),
    [OFFER_DATA.TYPE]: typeSchema.required("Field type required"),
    [OFFER_DATA.DURATIONAUCTION]: Yup.number()
      .required("Field duration required")
      .integer("Duration auction must be an integer"),
    [OFFER_DATA.CATEGORY]: Yup.string().required("Field category required"),
    [OFFER_DATA.LOCATION]: Yup.string().required("Field location required"),
    [OFFER_DATA.STARTPRICE]: Yup.number().when(
      OFFER_DATA.TYPE,
      (type, fieldSchema) =>
        (type && type[0]?.id === 1) || (type && type[0]?.id === 2)
          ? fieldSchema.required("Field start price required")
          : fieldSchema,
    ),
    [OFFER_DATA.STEP]: Yup.number().when(
      OFFER_DATA.TYPE,
      (type, fieldSchema) =>
        (type && type[0]?.id === 1) || (type && type[0]?.id === 2)
          ? fieldSchema.required("Field step required")
          : fieldSchema,
    ),
    [OFFER_DATA.WINBID]: Yup.number().when(
      OFFER_DATA.TYPE,
      (type, fieldSchema) =>
        type && type[0]?.id === 2
          ? fieldSchema.required("Field win bid required")
          : fieldSchema,
    ),
  });

  const formik = useFormik<OfferFormValues>({
    initialValues: {
      [OFFER_DATA.TITLE]: "",
      [OFFER_DATA.DESCRIPTION]: "",
      [OFFER_DATA.TYPE]: { id: null, value: "" },
      [OFFER_DATA.DURATIONAUCTION]: undefined,
      [OFFER_DATA.CATEGORY]: null,
      [OFFER_DATA.LOCATION]: null,
      [OFFER_DATA.STARTPRICE]: undefined,
      [OFFER_DATA.STEP]: undefined,
      [OFFER_DATA.WINBID]: undefined,
    },
    validationSchema: schema,
    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values: OfferFormValues) => {
      try {
        const authToken = localStorage.getItem("accessToken");

        const requestBody = {
          title: values.title,
          description: values.description,
          auctionDurationDays: values.durationAuction,
          startPrice: values.startPrice,
          step: values.step,
          winBid: values.winbid,
          isFree: selectedType?.value === "free offer",
          categoryId: values.category?.id,
        };

        console.log("Request body:", requestBody);

        const response = await fetch(`${BASE_URL}/offers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
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

        console.log("Offer created successfully:", responseData);
      } catch (error: unknown) {
        console.error("Error creating offer:", (error as Error).message);
      }
    },
  });

  return (
    <OfferWrapper>
      <OfferUpWrapper>
        <OfferTextWrapper>
          <OfferText>Create new offer</OfferText>
        </OfferTextWrapper>
        <form onSubmit={formik.handleSubmit}>
          <OfferInfoWrapper>
            <Input
              label="Title"
              name={OFFER_DATA.TITLE}
              onInputChange={formik.handleChange}
              value={formik.values[OFFER_DATA.TITLE] || ""}
              error={formik.errors[OFFER_DATA.TITLE]}
              onBlur={formik.handleBlur}
            />
          </OfferInfoWrapper>
          <OfferInfoWrapper>
            <OfferImageWrapper>
              <ImageUpload />
            </OfferImageWrapper>
            <OfferTextAreaWrapper>
              <TextArea
                name={OFFER_DATA.DESCRIPTION}
                placeholder="Description"
                onInputChange={formik.handleChange}
                value={formik.values[OFFER_DATA.DESCRIPTION] || ""}
                error={formik.errors[OFFER_DATA.DESCRIPTION]}
                onBlur={formik.handleBlur}
              />
            </OfferTextAreaWrapper>
          </OfferInfoWrapper>
          <OfferSelectWrapper>
            <Select
              label="Category"
              name={OFFER_DATA.CATEGORY}
              options={typeCategoryOptions}
              value={formik.values[OFFER_DATA.CATEGORY]?.name || ""}
              onChange={(selectedValue: string | undefined) => {
                if (selectedValue) {
                  const selectedCategory = categoriesData.find(
                    (category) => category.name === selectedValue,
                  );
                  formik.setFieldValue(OFFER_DATA.CATEGORY, selectedCategory);
                } else {
                  formik.setFieldValue(OFFER_DATA.CATEGORY, null);
                }
              }}
              onBlur={() => formik.handleBlur(OFFER_DATA.CATEGORY)}
              isSelectOpen={false}
            />
          </OfferSelectWrapper>
          <OfferSelectWrapper>
            <Select
              name={OFFER_DATA.LOCATION}
              label="Location"
              options={locationOptions}
              value={formik.values[OFFER_DATA.LOCATION]?.value || ""}
              onChange={(selectedValue: string | undefined) => {
                if (selectedValue) {
                  const selectedLocation = locationsData.find(
                    (location) => location.value === selectedValue,
                  );
                  formik.setFieldValue(OFFER_DATA.LOCATION, selectedLocation);
                } else {
                  formik.setFieldValue(OFFER_DATA.LOCATION, null);
                }
              }}
              onBlur={() => formik.handleBlur(OFFER_DATA.LOCATION)}
              isSelectOpen={false}
            />
          </OfferSelectWrapper>
          <OfferSelectWrapper>
            <Input
              label="Duration auction"
              name={OFFER_DATA.DURATIONAUCTION}
              onInputChange={formik.handleChange}
              value={formik.values[OFFER_DATA.DURATIONAUCTION] || ""}
              error={formik.errors[OFFER_DATA.DURATIONAUCTION]}
              onBlur={formik.handleBlur}
            />
          </OfferSelectWrapper>
          <OfferSelectWrapper>
            <Select
              label="Type offer"
              name={OFFER_DATA.TYPE}
              options={typeOfferOptions}
              value={formik.values[OFFER_DATA.TYPE]?.value || ""}
              onChange={(selectedValue: string | undefined) => {
                if (selectedValue) {
                  const selectedType1 = typeOfferData.find(
                    (offer) => offer.value === selectedValue,
                  );
                  setSelectedType(selectedType1 || null);
                  formik.setFieldValue(OFFER_DATA.TYPE, selectedType1);
                } else {
                  setSelectedType(null);
                  formik.setFieldValue(OFFER_DATA.TYPE, null);
                }
              }}
              onBlur={() => formik.handleBlur(OFFER_DATA.TYPE)}
              isSelectOpen={false}
            />
          </OfferSelectWrapper>
          {(selectedType?.value === "auction" ||
            selectedType?.value === "regular auction") && (
            <>
              <OfferSelectWrapper>
                <Input
                  label="Start price"
                  name={OFFER_DATA.STARTPRICE}
                  onInputChange={formik.handleChange}
                  value={formik.values[OFFER_DATA.STARTPRICE] || ""}
                  error={formik.errors[OFFER_DATA.STARTPRICE]}
                  onBlur={formik.handleBlur}
                />
              </OfferSelectWrapper>
              <OfferSelectWrapper>
                <Input
                  label="Step"
                  name={OFFER_DATA.STEP}
                  onInputChange={formik.handleChange}
                  value={formik.values[OFFER_DATA.STEP] || ""}
                  error={formik.errors[OFFER_DATA.STEP]}
                  onBlur={formik.handleBlur}
                />
              </OfferSelectWrapper>
            </>
          )}
          {selectedType?.value === "regular auction" && (
            <OfferSelectWrapper>
              <Input
                label="Win bid"
                name={OFFER_DATA.WINBID}
                onInputChange={formik.handleChange}
                value={formik.values[OFFER_DATA.WINBID] || ""}
                error={formik.errors[OFFER_DATA.WINBID]}
                onBlur={formik.handleBlur}
              />
            </OfferSelectWrapper>
          )}
          <OfferButtonsWrapper>
            <OfferButtonWrapper>
              <Button type="submit" name="Create offer" />
            </OfferButtonWrapper>
            <OfferButtonWrapper>
              <Button
                type="button"
                name="Cancel"
                onButtonClick={() => console.log("Cancelled")}
              />
            </OfferButtonWrapper>
          </OfferButtonsWrapper>
        </form>
      </OfferUpWrapper>
    </OfferWrapper>
  );
}

export default CreateOffer;
