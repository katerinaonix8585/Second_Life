import CategoryCard from "components/CategoryCard/CategoryCard";
import { useAppSelector } from "store/hooks";
import { categorysDataSliceSelectors } from "store/redux/category/categorySlice";

import { Container } from "../Layout/styles";

import {
  CategoryPageWrapper,
  CategoryTextWrapper,
  GridContainer,
  Tile,
} from "./styles";

function CategoryPage() {
  const categoryDataSlice = useAppSelector(
    categorysDataSliceSelectors.category,
  );
  const categoriesData = categoryDataSlice.data;

  // const getImageUrl = (categoryName: string) => {
  //   return `${IMAGE_BASE_URL}${categoryName.toLowerCase().replace(/ /g, "_")}.png`;
  // };

  return (
    <Container>
      <CategoryPageWrapper>
        <CategoryTextWrapper>
          <Tile>Category</Tile>
        </CategoryTextWrapper>
        <GridContainer>
          {categoriesData.map((categoryData) => (
            <CategoryCard
              key={categoryData.id}
              categoryCardData={{
                ...categoryData,
                image: categoryData.id,
              }}
            />
          ))}
        </GridContainer>
      </CategoryPageWrapper>
    </Container>
  );
}

export default CategoryPage;
