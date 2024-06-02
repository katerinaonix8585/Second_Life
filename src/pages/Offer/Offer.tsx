import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import ImageUpload from "components/ImageUpload/ImageUpload";
import Input from "components/Input/Input";
import Select from "components/Select/Select";
import { SelectDataProps } from "components/Select/types";
import { CategoryCard } from "components/CategoryCard/types";
import TextArea from "components/TextArea/TestArea";
import { categoriesData } from "components/CategoryCard/CategoryCardData";
import { LocationData } from "pages/Layout/types";
import { locationsData } from "pages/Layout/LocationData";
import Button from "components/Button/Button";

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
import { OFFER_DATA, OfferFormValues, TypeOffer } from "./types";
import { typeOfferData } from "./OffersData";

function Offer() {
  const [selectedType, setSelectedType] = useState<TypeOffer | null>(null);

  const typeOfferOptions: SelectDataProps<string>[] = typeOfferData.map(
    (offer) => ({
      selectData: {
        label: offer.name,
        value: offer.name,
      },
    }),
  );

  const typeCategoryOptions: SelectDataProps<string>[] = categoriesData.map(
    (category) => ({
      selectData: {
        label: category.categoryCardData.name,
        value: category.categoryCardData.name,
      },
    }),
  );

  const locationOptions: SelectDataProps<string>[] = locationsData.map(
    (location) => ({
      selectData: {
        index: location.locationData.index,
        label: location.locationData.label,
        value: location.locationData.value,
      },
    }),
  );

  const schema = Yup.object().shape({
    [OFFER_DATA.TITLE]: Yup.string().required("Field title required"),
    [OFFER_DATA.DESCRIPTION]: Yup.string().required(
      "Field description required",
    ),
    [OFFER_DATA.TYPE]: Yup.object().required("Field type required").shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
    }),
    [OFFER_DATA.DURATIONAUCTION]: Yup.number().required(
      "Field duration required",
    ),
    [OFFER_DATA.CATEGORY]: Yup.object().required("Field category required"),
    [OFFER_DATA.STARTPRICE]: Yup.number().required(
      "Field start price required",
    ),
    [OFFER_DATA.STEP]: Yup.number().required("Field step required"),
    [OFFER_DATA.WINBID]: Yup.number(),
  });

  const formik = useFormik<OfferFormValues>({
    initialValues: {
      [OFFER_DATA.TITLE]: "",
      [OFFER_DATA.DESCRIPTION]: "",
      [OFFER_DATA.TYPE]: {} as TypeOffer,
      [OFFER_DATA.DURATIONAUCTION]: 0,
      [OFFER_DATA.CATEGORY]: {} as CategoryCard,
      [OFFER_DATA.LOCATION]: {} as LocationData,
      [OFFER_DATA.STARTPRICE]: 0,
      [OFFER_DATA.STEP]: 0,
      [OFFER_DATA.WINBID]: 0,
    },
    validationSchema: schema,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values: OfferFormValues) => {
      console.log(values);
    },
  });

  const handleChange =
    (name: string) => (selectedValue: string | undefined) => {
      if (selectedValue === undefined) {
        formik.setFieldValue(name, "");
      } else {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const selectedType = typeOfferData.find(
          (offer) => offer.name === selectedValue,
        );
        if (selectedType) {
          setSelectedType(selectedType);
          formik.setFieldValue(name, selectedType.name);
        }
      }
    };

  return (
    <OfferWrapper>
      <OfferUpWrapper>
        <OfferTextWrapper>
          <OfferText>Create new offer</OfferText>
        </OfferTextWrapper>
        <OfferInfoWrapper>
          <Input
            label="Title"
            name={OFFER_DATA.TITLE}
            // placeholder="Title"
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
            value={formik.values[OFFER_DATA.CATEGORY].name || ""}
            onChange={handleChange(OFFER_DATA.CATEGORY)}
            // placeholder="Category"
          />
        </OfferSelectWrapper>
        <OfferSelectWrapper>
          <Select
            name={OFFER_DATA.LOCATION}
            label="Location"
            options={locationOptions}
            value={formik.values[OFFER_DATA.LOCATION].value || ""}
            onChange={handleChange(OFFER_DATA.LOCATION)}
            // placeholder="Location"
          />
        </OfferSelectWrapper>
        <OfferSelectWrapper>
          <Select
            name={OFFER_DATA.TYPE}
            label="Type offer"
            options={typeOfferOptions}
            value={formik.values[OFFER_DATA.TYPE].name || ""}
            onChange={handleChange(OFFER_DATA.TYPE)}
            // placeholder="Type offer"
          />
        </OfferSelectWrapper>
        {selectedType && selectedType.name !== "free offer" && (
          <>
            <OfferSelectWrapper>
              <Input
                label="Start price"
                name={OFFER_DATA.STARTPRICE}
                // placeholder="Start price"
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
                // placeholder="Step"
                onInputChange={formik.handleChange}
                value={formik.values[OFFER_DATA.STEP] || ""}
                error={formik.errors[OFFER_DATA.STEP]}
                onBlur={formik.handleBlur}
              />
            </OfferSelectWrapper>
            {selectedType.name === "offer + auction with win bid" && (
              <OfferSelectWrapper>
                <Input
                  label="Win bid"
                  name={OFFER_DATA.WINBID}
                  // placeholder="Win bid"
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
              <Button type="button" background="#4d418b" name="Save" />
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

export default Offer;
