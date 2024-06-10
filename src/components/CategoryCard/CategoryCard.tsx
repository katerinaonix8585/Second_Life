import { Link } from "react-router-dom";

import {
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
} from "../../../src/assets/images";

import {
  CardImage,
  CardImageContainer,
  CardTextContainer,
  CardWrapper,
} from "./styles";
import { CategoryCardProps } from "./types";

const defaultCategoryImage =
  "src/shared/assets/images/default_category_image.png";

function CategoryCard({ categoryCardData }: CategoryCardProps) {
  const { id, name, image } = categoryCardData;

  let src;
  switch (image) {
    case 1:
      src = img1;
      break;
    case 2:
      src = img2;
      break;
    case 3:
      src = img3;
      break;
    case 4:
      src = img4;
      break;
    case 5:
      src = img5;
      break;
    case 6:
      src = img6;
      break;
    case 7:
      src = img7;
      break;
    case 8:
      src = img8;
      break;
    case 9:
      src = img9;
      break;
    case 10:
      src = img10;
      break;
    default:
      src = defaultCategoryImage;
      break;
  }

  return (
    <Link to={`/category/id=${id}`} style={{ textDecoration: "none" }}>
      <CardWrapper>
        <CardImageContainer>
          <CardImage src={src} />
        </CardImageContainer>
        <CardTextContainer>{name.toUpperCase()}</CardTextContainer>
      </CardWrapper>
    </Link>
  );
}

export default CategoryCard;
