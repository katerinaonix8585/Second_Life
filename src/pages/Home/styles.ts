import styled from "@emotion/styled";

import { arrowRight } from "../../shared/assets/images";

export const HomePageWrapper = styled.div`
  width: auto;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CategoryWrapper = styled.div`
  padding: 40px 0;
`;

export const CategoryTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px 0 0 50px;
`;

export const CategoryText = styled.p`
  font-size: 30px;
  font-weight: bold;
  color: #56119c;
  font-family: "LibreFranklin", sans-serif;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 30px;
  width: auto;
  box-sizing: border-box;
`;

export const IntroductionContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IntroductionSectionWrapper = styled.div`
  display: flex;
  padding: 20px 0;
  justify-content: space-between;
`;

export const IntroductionText = styled.p`
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  font-family: "Chivo", sans-serif;
  font-style: italic;
  color: #4d418b;
`;

export const IntroductionButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
`;

// Контейнер с плавными границами внизу
export const WaveContainer = styled.div`
  width: 100%;
`;

// Градиентный фон с плавными границами
export const GradientBackground = styled.div`
  background: linear-gradient(to right, #9796f0, #fde8ed); /* Градиентный фон */
`;

// последняя карточка в Grid - ссылка на пункт меню Категории
export const CardLink = styled.a`
  cursor: pointer;
  text-decoration: none;
`;

export const Card = styled.div`
  background-color: #dcdcdc30;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  height: 100%;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  font-weight: bold;
`;

export const CardTextContainer = styled.p`
  font-size: 15px;
  color: #56119c;
  font-weight: bold;
  font-family: "LibreFranklin", sans-serif;
`;

export const CardImageContainer = styled.div`
  width: 30px;
  height: 30px;
`;

export const CardImage = styled.img`
  width: auto;
  height: 100%;
`;

CardImage.defaultProps = { src: arrowRight };
