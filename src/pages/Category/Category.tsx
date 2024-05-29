import { useEffect, useState } from "react";
import { v4 } from "uuid";

import { CategoryCardProps } from "components/CategoryCard/types";
import CategoryCard from "components/CategoryCard/CategoryCard";

import { categoriesData } from "../../components/CategoryCard/CategoryCardData.ts";
import { Container } from "../Layout/styles.ts";

import {
  CategoryPageWrapper,
  CategoryText,
  CategoryTextWrapper,
  CategoryWrapper,
  GridContainer,
} from "./styles";

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
