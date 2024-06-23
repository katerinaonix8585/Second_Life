import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

import Button from "components/Button/Button";
import { CategoryCardProps, CategoryData } from "components/CategoryCard/types";

import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { Container } from "../Layout/styles";

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
  CardTextContainer,
  CardImageContainer,
  CardImage,
  CardLink,
  IntroductionSectionWrapper,
} from "./styles";

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api/v1";

// const IMAGE_BASE_URL = "../../../src/assets/images/";

function Home() {
  const [categoryCards, setCategoryCards] = useState<CategoryCardProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/categories`);
      const data: CategoryData[] = await response.json();
      const activeCategories = data.filter((category) => category.active);
      const categoryCardsData = activeCategories.map((category) => ({
        categoryCardData: {
          id: category.id,
          name: category.name,
          description: category.description,
          active: category.active,
          image: category.id.toString(),
        },
      }));
      setCategoryCards(categoryCardsData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // const getImageUrl = (categoryName: string) => {
  //   return `${IMAGE_BASE_URL}${categoryName.toLowerCase().replace(/ /g, "_")}.png`;
  // };

  const handleCreateOfferClick = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/offers");
    } else {
      navigate("/auth/user/login");
    }
  };

  const categoryCardElements = categoryCards.map((categoryData) => (
    <CategoryCard
      key={uuid()}
      categoryCardData={categoryData.categoryCardData}
    />
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
                <IntroductionButtonWrapper>
                  <Button
                    name="Create offer"
                    onButtonClick={handleCreateOfferClick}
                  ></Button>
                </IntroductionButtonWrapper>
              </IntroductionButtonWrapper>
            </IntroductionSectionWrapper>
          </Container>
        </GradientBackground>
      </WaveContainer>

      {/* <CategoryTextWrapper>
        <CategoryText>Choose category</CategoryText>
      </CategoryTextWrapper> */}

      <CategoryWrapper>
        <GridContainer>
          {categoryCardElements}
          <CardLink href="/#/category">
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
