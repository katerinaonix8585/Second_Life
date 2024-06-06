import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { CategoryData } from "components/CategoryCard/types";
import CategoryCard from "components/CategoryCard/CategoryCard";

import { Container } from "../Layout/styles";

import {
  CategoryPageWrapper,
  CategoryText,
  CategoryTextWrapper,
  GridContainer,
} from "./styles";

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api/v1";
const IMAGE_BASE_URL = "../../../src/assets/images/";

function CategoryPage() {
  const [categoryCards, setCategoryCards] = useState<CategoryData[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/categories`);
      const data: CategoryData[] = await response.json();
      const activeCategories = data.filter((category) => category.active);
      setCategoryCards(activeCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getImageUrl = (categoryName: string) => {
    return `${IMAGE_BASE_URL}${categoryName.toLowerCase().replace(/ /g, "_")}.png`;
  };

  return (
    <Container>
      <CategoryPageWrapper>
        <CategoryTextWrapper>
          <CategoryText>Category</CategoryText>
        </CategoryTextWrapper>
        <GridContainer>
          {categoryCards.map((categoryData) => (
            <CategoryCard
              key={uuid()}
              categoryCardData={{
                ...categoryData,
                image: getImageUrl(categoryData.name),
              }}
            />
          ))}
        </GridContainer>
      </CategoryPageWrapper>
    </Container>
  );
}

export default CategoryPage;
