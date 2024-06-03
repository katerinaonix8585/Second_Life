import { Link } from "react-router-dom";

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
  const { name, image } = categoryCardData;
  return (
    <Link to={`/category/${name}`} style={{ textDecoration: "none" }}>
      <CardWrapper>
        <CardImageContainer>
          <CardImage src={image || defaultCategoryImage} />
        </CardImageContainer>
        <CardTextContainer>{name.toUpperCase()}</CardTextContainer>
      </CardWrapper>
    </Link>
  );
}

export default CategoryCard;
