import { Link } from "react-router-dom";

import {
  CardImage,
  CardImageContainer,
  CardTextContainer,
  CardWrapper,
} from "./styles";
import { CategoryCardProps } from "./types";

function CategoryCard({ categoryCardData }: CategoryCardProps) {
  return (
    <Link
      to={`/category/${categoryCardData.name}`}
      style={{ textDecoration: "none" }}
    >
      <CardWrapper>
        <CardImageContainer>
          <CardImage src={categoryCardData.image} />
        </CardImageContainer>
        <CardTextContainer>
          {categoryCardData.name.toUpperCase()}
        </CardTextContainer>
      </CardWrapper>
    </Link>
  );
}

export default CategoryCard;
