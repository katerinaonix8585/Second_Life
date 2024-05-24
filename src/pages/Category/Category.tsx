import { useEffect, useState } from 'react';
import { CategoryPageWrapper, CategoryText, CategoryTextWrapper, CategoryWrapper, GridContainer } from './styles';
import { CategoryCardProps } from 'components/CategoryCard/types';
import { categoriesData } from 'pages/Home/types';
import CategoryCard from 'components/CategoryCard/CategoryCard';
import { v4 } from 'uuid';

function CategoryPage() {
    
    const [categoryCards, setCategoryCards] = useState<CategoryCardProps[]>([]);

    useEffect(() => {        
        setCategoryCards(categoriesData);
    }, []);

    const categoryCardElements = categoryCards.map((categoryData) => (
        <CategoryCard key={v4()} categoryCardData={categoryData.categoryCardData} />
    ));


    return (
        <CategoryPageWrapper> 

        <CategoryTextWrapper>
                <CategoryText>
                    Category
                </CategoryText>
        </CategoryTextWrapper> 

            <CategoryWrapper>
                <GridContainer>
                    {categoryCardElements}                           
                </GridContainer>
            </CategoryWrapper>  

        </CategoryPageWrapper>
        
    );
}

export default CategoryPage;