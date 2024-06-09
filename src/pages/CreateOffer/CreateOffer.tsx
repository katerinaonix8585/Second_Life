/* eslint-disable @typescript-eslint/no-unused-vars */
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ImageUpload from "components/ImageUpload/ImageUpload";
import Input from "components/Input/Input";
import Select from "components/Select/Select";
import { SelectDataProps } from "components/Select/types";
import TextArea from "components/TextArea/TestArea";
import Button from "components/Button/Button";
import { CategoryData } from "components/CategoryCard/types";
import { LocationData } from "pages/Layout/types";
import { useAppSelector } from "store/hooks";
import { locationsDataSliceSelectors } from "store/redux/location/locationSlice";
import { categorysDataSliceSelectors } from "store/redux/category/categorySlice";

import {
  OfferButtonContainer,
  OfferButtonWrapper,
  OfferButtonsWrapper,
  OfferImageWrapper,
  OfferInfoWrapper,
  OfferSelectWrapper,
  OfferTextAreaWrapper,
  OfferTextWrapper,
  OfferUpWrapper,
  OfferWrapper,
  Tile,
} from "./styles";
import { OFFER_DATA, OfferFormValues, TypeOfferData } from "./types";
import { typeOfferData } from "./OffersData";

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api";

function CreateOffer() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<TypeOfferData | null>(null);
  const [isSelectOpen, setSelectOpenState] = useState(false);

  const typeOfferOptions: SelectDataProps<string>[] = typeOfferData.map(
    (offer) => ({
      selectData: {
        index: offer.id,
        value: offer.value,
      },
    }),
  );

  const locationsDataSlice = useAppSelector(
    locationsDataSliceSelectors.location,
  );
  const locationsData = locationsDataSlice.data;

  const categoryDataSlice = useAppSelector(
    categorysDataSliceSelectors.category,
  );
  const categoriesData = categoryDataSlice.data;

  const typeCategoryOptions: SelectDataProps<string>[] = categoriesData.map(
    (category) => ({
      selectData: {
        index: category.id,
        value: category.name,
      },
    }),
  );

  const locationOptions: SelectDataProps<string>[] = locationsData
    .map((location: LocationData) => ({
      selectData: {
        index: location.id,
        value: location.name,
      },
    }))
    .sort((a, b) => {
      if (a.selectData.index < b.selectData.index) {
        return -1;
      }
      if (a.selectData.index > b.selectData.index) {
        return 1;
      }
      return 0;
    });

  const formik = useFormik<OfferFormValues>({
    initialValues: {
      [OFFER_DATA.TITLE]: "",
      [OFFER_DATA.DESCRIPTION]: "",
      [OFFER_DATA.TYPE]: {} as TypeOfferData,
      [OFFER_DATA.DURATIONAUCTION]: null,
      [OFFER_DATA.CATEGORY]: {} as CategoryData,
      [OFFER_DATA.LOCATION]: {} as LocationData,
      [OFFER_DATA.STARTPRICE]: null,
      [OFFER_DATA.STEP]: null,
      [OFFER_DATA.WINBID]: null,
    },
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values: OfferFormValues) => {
      try {
        const authToken = localStorage.getItem("accessToken");

        const errors: { field: string; message: string }[] = [];

        if (!values.title) {
          errors.push({
            field: OFFER_DATA.TITLE,
            message: "Field Title is required",
          });
        } else if (values.title.length <= 5) {
          errors.push({
            field: OFFER_DATA.TITLE,
            message: "Title must be longer than 5 characters",
          });
        }

        if (!values.description) {
          errors.push({
            field: OFFER_DATA.DESCRIPTION,
            message: "Field Description is required",
          });
        } else if (values.description.length <= 5) {
          errors.push({
            field: OFFER_DATA.DESCRIPTION,
            message: "Description must be longer than 5 characters",
          });
        }

        if (!values.durationAuction) {
          errors.push({
            field: OFFER_DATA.DURATIONAUCTION,
            message: "Field Duration auction is required",
          });
        }

        if (values.type?.id && values.type.id !== 0) {
          if (!values.startPrice || values.startPrice <= 0) {
            errors.push({
              field: OFFER_DATA.STARTPRICE,
              message:
                "Field Start price is required and must be greater than zero",
            });
          }

          if (!values.step || values.step <= 0) {
            errors.push({
              field: OFFER_DATA.STEP,
              message: "Field Step is required and must be greater than zero",
            });
          }

          if (values.type.id === 2 && (!values.winbid || values.winbid <= 0)) {
            errors.push({
              field: OFFER_DATA.WINBID,
              message:
                "Field Win bid is required and must be greater than zero",
            });
          }
        }

        if (!values.category || !values.category.name) {
          errors.push({
            field: OFFER_DATA.CATEGORY,
            message: "Field Category is required",
          });
        }

        if (!values.location || !values.location.name) {
          errors.push({
            field: OFFER_DATA.LOCATION,
            message: "Field Location is required",
          });
        }

        if (!values.type || !values.type.value) {
          errors.push({
            field: OFFER_DATA.TYPE,
            message: "Field Type offer is required",
          });
        }

        if (errors.length > 0) {
          throw errors;
        }

        const requestBody = {
          title: values.title,
          description: values.description,
          auctionDurationDays: Number(values.durationAuction),
          startPrice:
            values.startPrice === 0 || values.startPrice === null
              ? null
              : Number(values.startPrice),
          step:
            values.step === 0 || values.step === null
              ? null
              : Number(values.step),
          winBid:
            values.winbid === 0 || values.winbid === null
              ? null
              : Number(values.winbid),
          isFree: values.type?.id === 0,
          categoryId: values.category.id,
          locationId: values.location.id === 0 ? "" : values.location.id,
        };

        console.log("Request body:", requestBody);

        const response = await fetch(`${BASE_URL}/v1/offers`, {
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
            formik.setFieldValue(name, selectedOption || "");

            if (selectedOption?.id === 0) {
              formik.setFieldValue(OFFER_DATA.STARTPRICE, null);
              formik.setFieldValue(OFFER_DATA.STEP, null);
              formik.setFieldValue(OFFER_DATA.WINBID, null);
            }
            if (selectedOption?.id === 1) {
              formik.setFieldValue(OFFER_DATA.WINBID, null);
            }
            break;
          case OFFER_DATA.CATEGORY:
            selectedOption = categoriesData.find(
              (category) => category.name === selectedValue,
            );
            formik.setFieldValue(name, selectedOption || "");
            break;
          case OFFER_DATA.LOCATION:
            selectedOption = locationsData.find(
              (location) => location.name === selectedValue,
            );
            formik.setFieldValue(name, selectedOption || "");
            break;
          default:
            formik.setFieldValue(name, selectedValue || "");
            break;
        }
      }
    };

  const handleFocus = (name: string) => {
    console.log(`Focused on field ${name}`);
    setSelectOpenState(false);
  };

  const handleBlur = (name: string) => {
    console.log(`Blurred on field ${name}`);
    setSelectOpenState(false);
  };

  return (
    <OfferWrapper onSubmit={formik.handleSubmit}>
      <OfferUpWrapper>
        <OfferTextWrapper>
          <Tile>Create new offer</Tile>
        </OfferTextWrapper>
        <OfferInfoWrapper>
          <Input
            required={true}
            label="Title"
            name={OFFER_DATA.TITLE}
            onInputChange={formik.handleChange}
            value={formik.values[OFFER_DATA.TITLE] || ""}
            error={formik.errors[OFFER_DATA.TITLE]}
            onBlur={formik.handleBlur}
            onFocus={() => handleFocus(OFFER_DATA.TITLE)}
          />
        </OfferInfoWrapper>
        <OfferInfoWrapper>
          <OfferImageWrapper>
            <ImageUpload />
          </OfferImageWrapper>
          <OfferTextAreaWrapper>
            <TextArea
              required={true}
              name={OFFER_DATA.DESCRIPTION}
              label="Description"
              placeholder="Description"
              onInputChange={formik.handleChange}
              value={formik.values[OFFER_DATA.DESCRIPTION] || ""}
              error={formik.errors[OFFER_DATA.DESCRIPTION]}
              onBlur={formik.handleBlur}
              onFocus={() => handleFocus(OFFER_DATA.DESCRIPTION)}
            />
          </OfferTextAreaWrapper>
        </OfferInfoWrapper>
        <OfferSelectWrapper>
          <Select
            required={true}
            label="Category"
            name={OFFER_DATA.CATEGORY}
            options={typeCategoryOptions}
            value={formik.values[OFFER_DATA.CATEGORY]?.name || ""}
            onChange={handleChange(OFFER_DATA.CATEGORY)}
            error={
              formik.errors[OFFER_DATA.CATEGORY]?.name ||
              (formik.errors[OFFER_DATA.CATEGORY] as string)
            }
            isSelectOpen={isSelectOpen}
            onFocus={() => handleFocus(OFFER_DATA.CATEGORY)}
            onBlur={() => handleBlur(OFFER_DATA.CATEGORY)}
          />
        </OfferSelectWrapper>
        <OfferSelectWrapper>
          <Select
            required={true}
            label="Location"
            name={OFFER_DATA.LOCATION}
            options={locationOptions}
            value={formik.values[OFFER_DATA.LOCATION]?.name || ""}
            onChange={handleChange(OFFER_DATA.LOCATION)}
            error={
              formik.errors[OFFER_DATA.LOCATION]?.name ||
              (formik.errors[OFFER_DATA.LOCATION] as string)
            }
            isSelectOpen={isSelectOpen}
            onFocus={() => handleFocus(OFFER_DATA.LOCATION)}
            onBlur={() => handleBlur(OFFER_DATA.LOCATION)}
          />
        </OfferSelectWrapper>
        <OfferSelectWrapper>
          <Input
            required={true}
            label="Duration auction"
            name={OFFER_DATA.DURATIONAUCTION}
            onInputChange={formik.handleChange}
            value={formik.values[OFFER_DATA.DURATIONAUCTION] || ""}
            error={formik.errors[OFFER_DATA.DURATIONAUCTION]}
            onBlur={formik.handleBlur}
            onFocus={() => handleFocus(OFFER_DATA.DURATIONAUCTION)}
          />
        </OfferSelectWrapper>
        <OfferSelectWrapper>
          <Select
            required={true}
            label="Type offer"
            name={OFFER_DATA.TYPE}
            options={typeOfferOptions}
            value={formik.values[OFFER_DATA.TYPE]?.value || ""}
            onChange={handleChange(OFFER_DATA.TYPE)}
            error={
              formik.errors[OFFER_DATA.TYPE]?.value ||
              (formik.errors[OFFER_DATA.TYPE] as string)
            }
            isSelectOpen={isSelectOpen}
            onFocus={() => handleFocus(OFFER_DATA.TYPE)}
            onBlur={() => handleBlur(OFFER_DATA.TYPE)}
          />
        </OfferSelectWrapper>
        {selectedType && selectedType.id !== 0 && (
          <>
            <OfferSelectWrapper>
              <Input
                required={true}
                label="Start price"
                name={OFFER_DATA.STARTPRICE}
                onInputChange={formik.handleChange}
                value={formik.values[OFFER_DATA.STARTPRICE] || ""}
                error={formik.errors[OFFER_DATA.STARTPRICE]}
                onBlur={formik.handleBlur}
                onFocus={() => handleFocus(OFFER_DATA.STARTPRICE)}
              />
            </OfferSelectWrapper>
            <OfferSelectWrapper>
              <Input
                required={true}
                label="Step"
                name={OFFER_DATA.STEP}
                onInputChange={formik.handleChange}
                value={formik.values[OFFER_DATA.STEP] || ""}
                error={formik.errors[OFFER_DATA.STEP]}
                onBlur={formik.handleBlur}
                onFocus={() => handleFocus(OFFER_DATA.STEP)}
              />
            </OfferSelectWrapper>
            {selectedType.id === 2 && (
              <OfferSelectWrapper>
                <Input
                  required={true}
                  label="Win bid"
                  name={OFFER_DATA.WINBID}
                  onInputChange={formik.handleChange}
                  value={formik.values[OFFER_DATA.WINBID] || ""}
                  error={formik.errors[OFFER_DATA.WINBID]}
                  onBlur={formik.handleBlur}
                  onFocus={() => handleFocus(OFFER_DATA.WINBID)}
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
              <Button
                type="button"
                background="#EE4266"
                name="Cancel"
                onButtonClick={() => navigate(-1)}
              />
            </OfferButtonWrapper>
          </OfferButtonContainer>
        </OfferButtonsWrapper>
      </OfferUpWrapper>
    </OfferWrapper>
  );
}

export default CreateOffer;
