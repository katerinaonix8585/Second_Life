import { useFormik } from "formik";
import * as Yup from "yup";

import ImageUpload from "components/ImageUpload/ImageUpload.tsx";
import Input from "components/Input/Input.tsx";
import Select from "components/Select/Select.tsx";
import { SelectDataProps } from "components/Select/types.ts";
import { CategoryCard } from "components/CategoryCard/types.ts";
import TextArea from "components/TextArea/TestArea.tsx";
import { categoriesData } from "components/CategoryCard/CategoryCardData.ts";
import { LocationData } from "pages/Layout/types.ts";
import { locationsData } from "pages/Layout/LocationData.ts";

import {
  OfferImageWrapper,
  OfferInfoWrapper,
  OfferSelectWrapper,
  OfferText,
  OfferTextWrapper,
  OfferUpWrapper,
  OfferWrapper,
} from "./styles.ts";
import { OFFER_DATA, OfferFormValues, TypeOffer } from "./types.ts";
import { typeOfferData } from "./OffersData.ts";

function Offer() {
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
    },
    validationSchema: schema,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values: OfferFormValues) => {
      console.log(values);
    },
  });

  const handleChange = (selectedValue: string | undefined) => {
    if (selectedValue === undefined) {
      formik.setFieldValue(OFFER_DATA.TYPE, undefined);
    } else {
      const selectedType = typeOfferData.find(
        (offer) => offer.name === selectedValue,
      );
      if (selectedType) {
        formik.setFieldValue(OFFER_DATA.TYPE, selectedType.name);
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
            name={OFFER_DATA.TITLE}
            placeholder="Title"
            onInputChange={formik.handleChange}
            value={formik.values[OFFER_DATA.TITLE]}
            error={formik.errors[OFFER_DATA.TITLE]}
            onBlur={formik.handleBlur}
          />
        </OfferInfoWrapper>
        <OfferInfoWrapper>
          <TextArea
            name={OFFER_DATA.DESCRIPTION}
            placeholder="Description"
            onInputChange={formik.handleChange}
            value={formik.values[OFFER_DATA.DESCRIPTION]}
            error={formik.errors[OFFER_DATA.DESCRIPTION]}
            onBlur={formik.handleBlur}
          />
        </OfferInfoWrapper>
        <OfferImageWrapper>
          <ImageUpload />
        </OfferImageWrapper>
        <OfferSelectWrapper>
          <Select
            options={typeCategoryOptions}
            value={formik.values[OFFER_DATA.CATEGORY].name}
            onChange={handleChange}
            placeholder="Category"
          />
        </OfferSelectWrapper>
        <OfferSelectWrapper>
          <Select
            options={locationOptions}
            value={formik.values[OFFER_DATA.LOCATION].value}
            onChange={handleChange}
            placeholder="Location"
          />
        </OfferSelectWrapper>
        <OfferSelectWrapper>
          <Select
            options={typeOfferOptions}
            value={formik.values[OFFER_DATA.TYPE].name}
            onChange={handleChange}
            placeholder="Type offer"
          />
        </OfferSelectWrapper>
      </OfferUpWrapper>
    </OfferWrapper>
  );
}

export default Offer;
