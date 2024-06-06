import { useFormik } from "formik";
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
  OfferButtonContainer,
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
      formik.setValues({
        ...formik.values,
        [OFFER_DATA.CATEGORY]: data[3]?.name,
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const typeOfferOptions: SelectDataProps<string>[] = typeOfferData.map(
    (offer) => ({
      selectData: {
        index: offer.id,
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

  console.log(categoriesData);

  const locationOptions: SelectDataProps<string>[] = locationsData.map(
    (location) => ({
      selectData: {
        index: location.id,
        value: location.value,
      },
    }),
  );

  // const schema = Yup.object().shape({
  //   [OFFER_DATA.DURATIONAUCTION]: Yup.number()
  //     .required("Field duration required")
  //     .integer("Duration auction must be an integer"),
  // });

  const formik = useFormik<OfferFormValues>({
    initialValues: {
      [OFFER_DATA.TITLE]: "",
      [OFFER_DATA.DESCRIPTION]: "",
      [OFFER_DATA.TYPE]: typeOfferData[0]?.value,
      [OFFER_DATA.DURATIONAUCTION]: undefined,
      [OFFER_DATA.CATEGORY]: categoriesData[4]?.name,
      [OFFER_DATA.LOCATION]: locationsData[0]?.value,
      [OFFER_DATA.STARTPRICE]: undefined,
      [OFFER_DATA.STEP]: undefined,
      [OFFER_DATA.WINBID]: undefined,
    },
    // validationSchema: schema,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values: OfferFormValues) => {
      try {
        const authToken = localStorage.getItem("accessToken");

        const errors: { field: string; message: string }[] = [];

        const requestBody = {
          title: values.title,
          description: values.description,
          auctionDurationDays: values.durationAuction,
          startPrice: values.startPrice,
          step: values.step,
          winbid: values.winbid,
          isFree: selectedType?.value === "free offer",
        };

        if (values.title === undefined || values.title === "") {
          errors.push({
            field: OFFER_DATA.TITLE,
            message: "Field Title is required",
          });
        }

        if (values.description === undefined || values.description === "") {
          errors.push({
            field: OFFER_DATA.DESCRIPTION,
            message: "Field Description is required",
          });
        }

        if (
          values.durationAuction === undefined ||
          values.durationAuction <= 0
        ) {
          errors.push({
            field: OFFER_DATA.DURATIONAUCTION,
            message: "Field Duration auction is required",
          });
        }

        if (values.startPrice === undefined || values.startPrice <= 0) {
          errors.push({
            field: OFFER_DATA.STARTPRICE,
            message:
              "Field Start price is required and must be greater than zero",
          });
        }

        if (values.step === undefined || values.step <= 0) {
          errors.push({
            field: OFFER_DATA.STEP,
            message: "Field Step is required and must be greater than zero",
          });
        }

        if (
          selectedType?.value === "offer + auction with win bid" &&
          (values.winbid === undefined || values.winbid <= 0)
        ) {
          errors.push({
            field: OFFER_DATA.WINBID,
            message: "Field Win bid is required and must be greater than zero",
          });
        }

        if (errors.length > 0) {
          throw errors;
        }

        if (
          selectedType?.value === "offer + auction" ||
          selectedType?.value === "offer + auction with win bid"
        ) {
          requestBody.startPrice = values.startPrice;
          requestBody.step = values.step;
        }

        if (selectedType?.value === "offer + auction with win bid") {
          requestBody.winbid = values.winbid;
        }

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
      } catch (errors: unknown) {
        console.error("Errors creating offer:", errors);
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

  const handleChange =
    (name: string) => (selectedValue: string | undefined) => {
      console.log(
        `Handling change for field ${name} with value:`,
        selectedValue,
      );
      if (selectedValue === undefined || selectedValue === null) {
        formik.setFieldValue(name, "");
      } else {
        let selectedOption;
        switch (name) {
          case OFFER_DATA.TYPE:
            selectedOption = typeOfferData.find(
              (offer) => offer.value === selectedValue,
            );
            setSelectedType(selectedOption || null);
            break;
          case OFFER_DATA.CATEGORY:
            selectedOption = categoriesData.find(
              (category) => category.name === selectedValue,
            );
            break;
          case OFFER_DATA.LOCATION:
            selectedOption = locationsData.find(
              (location) => location.value === selectedValue,
            );
            break;

          default:
            break;
        }
        if (selectedOption) {
          formik.setFieldValue(name, selectedValue || "");
        }
      }
    };

  return (
    <OfferWrapper onSubmit={formik.handleSubmit}>
      <OfferUpWrapper>
        <OfferTextWrapper>
          <OfferText>Create new offer</OfferText>
        </OfferTextWrapper>
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
            value={formik.values[OFFER_DATA.CATEGORY] || ""}
            onChange={handleChange(OFFER_DATA.CATEGORY)}
            isSelectOpen={false}
          />
        </OfferSelectWrapper>
        <OfferSelectWrapper>
          <Select
            name={OFFER_DATA.LOCATION}
            label="Location"
            options={locationOptions}
            value={formik.values[OFFER_DATA.LOCATION] || ""}
            onChange={handleChange(OFFER_DATA.LOCATION)}
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
            name={OFFER_DATA.TYPE}
            label="Type offer"
            options={typeOfferOptions}
            value={formik.values[OFFER_DATA.TYPE] || ""}
            onChange={handleChange(OFFER_DATA.TYPE)}
            isSelectOpen={false}
          />
        </OfferSelectWrapper>
        {selectedType && selectedType.value !== "free offer" && (
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
            {selectedType.value === "offer + auction with win bid" && (
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
          </>
        )}
        <OfferButtonsWrapper>
          <OfferButtonContainer>
            <OfferButtonWrapper>
              <Button type="submit" background="#4d418b" name="Save as draft" />
            </OfferButtonWrapper>
            <OfferButtonWrapper>
              <Button type="submit" background="#4d418b" name="Submit" />
            </OfferButtonWrapper>
            <OfferButtonWrapper>
              <Button type="button" background="#EE4266" name="Cancel" />
            </OfferButtonWrapper>
          </OfferButtonContainer>
        </OfferButtonsWrapper>
      </OfferUpWrapper>
    </OfferWrapper>
  );
}

export default CreateOffer;
