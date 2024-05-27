import { useEffect, useState } from "react";
import { v4 } from "uuid";

import { CategoryCardProps } from "components/CategoryCard/types";
import { categoriesData } from "pages/Home/types";
import CategoryCard from "components/CategoryCard/CategoryCard";

import {
  CategoryPageWrapper,
  CategoryText,
  CategoryTextWrapper,
  CategoryWrapper,
  GridContainer,
} from "./styles";
import { Container } from "../Layout/styles.ts";

function CategoryPage() {
  const [categoryCards, setCategoryCards] = useState<CategoryCardProps[]>([]);

  useEffect(() => {
    setCategoryCards(categoriesData);
  }, []);

  const categoryCardElements = categoryCards.map((categoryData) => (
    <CategoryCard key={v4()} categoryCardData={categoryData.categoryCardData} />
  ));

  return (
    <Container>
      <CategoryPageWrapper>
        <CategoryTextWrapper>
          <CategoryText>Category</CategoryText>
        </CategoryTextWrapper>
        <CategoryWrapper>
          <GridContainer>{categoryCardElements}</GridContainer>
        </CategoryWrapper>
      </CategoryPageWrapper>
    </Container>
  );
}

export default CategoryPage;
