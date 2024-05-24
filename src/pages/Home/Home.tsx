import { useEffect, useState } from "react";
import { CategoryCardProps } from "../../components/CategoryCard/types";
import { HomePageWrapper, CategoryWrapper, GridContainer, Card, IntroductionContainer, IntroductionTextWrapper, IntroductionButtonWrapper, IntroductionText, WaveContainer, GradientBackground, IntroductionContainerWrapper } from "./styles";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { v4 } from "uuid";
import { categoriesData } from "./types";
import Button from "components/Button/Button";

function Home() {
    const [categoryCards, setCategoryCards] = useState<CategoryCardProps[]>([]);

    useEffect(() => {        
        setCategoryCards(categoriesData);
    }, []);

    const categoryCardElements = categoryCards.map((categoryData) => (
        <CategoryCard key={v4()} categoryCardData={categoryData.categoryCardData} />
    ));

    return (
        <HomePageWrapper> 
            <WaveContainer>
            <GradientBackground>
            <IntroductionContainerWrapper>    
            <IntroductionContainer>               
               <IntroductionTextWrapper>
                  <IntroductionText>
                   Let your unwanted items find a new home and bring joy to others.  
                  </IntroductionText>                  
                  <IntroductionText>
                   Don't wait!
                  </IntroductionText>
               <IntroductionText>
                  Create a listing for sale today and give your items a second life!
               </IntroductionText>                                                  
               </IntroductionTextWrapper>
               <IntroductionButtonWrapper>
               <Button name="Create offer" onButtonClick={()=>{}}></Button>
               </IntroductionButtonWrapper> 
               
               
               
            </IntroductionContainer> 
            </IntroductionContainerWrapper>
            </GradientBackground>
        </WaveContainer>  

            
            {/* <CategoryTextWrapper>
                <CategoryText>
                    Category
                </CategoryText>
            </CategoryTextWrapper> */}

            <CategoryWrapper>
                <GridContainer>
                    {categoryCardElements}
                    <Card></Card>
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