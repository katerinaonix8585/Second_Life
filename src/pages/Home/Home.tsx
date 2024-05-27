import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { shuffle } from "lodash";

import Button from "components/Button/Button";

import { CategoryCardProps } from "../../components/CategoryCard/types";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

import {
  HomePageWrapper,
  CategoryWrapper,
  GridContainer,
  Card,
  IntroductionButtonWrapper,
  IntroductionText,
  WaveContainer,
  GradientBackground,
  IntroductionContainerWrapper,
  CategoryTextWrapper,
  CategoryText,
  CardTextContainer,
  CardImageContainer,
  CardImage,
  CardLink,
  IntroductionSectionWrapper,
} from "./styles";
import { categoriesData } from "./types";

import { Container } from "../Layout/styles";

function Home() {
  const [categoryCards, setCategoryCards] = useState<CategoryCardProps[]>([]);

  useEffect(() => {
    setCategoryCards(categoriesData);
  }, []);

  const shuffledCategoryCards = shuffle(categoryCards);

  const limitedCategoryCards = shuffledCategoryCards.slice(0, 7);

  const categoryCardElements = limitedCategoryCards.map((categoryData) => (
    <CategoryCard key={v4()} categoryCardData={categoryData.categoryCardData} />
  ));

  return (
    <HomePageWrapper>
      <WaveContainer>
        <GradientBackground>
          <Container>
            <IntroductionSectionWrapper>
              <IntroductionContainerWrapper>
                <IntroductionText>
                  Let your unwanted items find a new home and bring joy to
                  others.
                </IntroductionText>
                <IntroductionText>Don't wait!</IntroductionText>
                <IntroductionText>
                  Create a listing for sale today and give your items a second
                  life!
                </IntroductionText>
              </IntroductionContainerWrapper>
              <IntroductionButtonWrapper>
                <Button name="Create offer" onButtonClick={() => {}}></Button>
              </IntroductionButtonWrapper>
            </IntroductionSectionWrapper>
          </Container>
        </GradientBackground>
      </WaveContainer>

      <CategoryTextWrapper>
        <CategoryText>Choose category</CategoryText>
      </CategoryTextWrapper>

      <CategoryWrapper>
        <GridContainer>
          {categoryCardElements}
          <CardLink href="/category">
            <Card>
              <CardTextContainer>VIEW CATEGORIES</CardTextContainer>

              <CardImageContainer>
                <CardImage />
              </CardImageContainer>
            </Card>
          </CardLink>
        </GridContainer>
      </CategoryWrapper>
    </HomePageWrapper>
  );
}

export default Home;

//   WOMEN'S CLOTHING
//   MEN'S CLOTHING
//   CHILDREN'S CLOTHING
//   WOMEN'S SHOES
//   MEN'S SHOES
//   CHILDREN'S SHOES
//   CHILDREN'S GOODS
//   TOYS
//   WATCHES AND JEWELRY
//   BEAUTY AND HEALTH
//   HOBBIES AND LEISURE
//   BICYCLES
//   BOOKS AND MAGAZINES
//   COLLECTIBLES
//   MUSICAL INSTRUMENTS
//   FURNITURE
//   HUNTING AND FISHING
//   SPORTS AND RECREATION
//   HOME APPLIANCES
