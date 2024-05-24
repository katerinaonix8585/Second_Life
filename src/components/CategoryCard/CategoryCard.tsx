import { CardImage, CardImageContainer, CardTextContainer, CardWrapper } from "./styles";
import { CategoryCardProps } from "./types";

function CategoryCard ({categoryCardData}: CategoryCardProps) {
    return (
        <CardWrapper>
            
               <CardImageContainer>
                  <CardImage src={categoryCardData.image}/>                  
               </CardImageContainer>
            <CardTextContainer>
                {categoryCardData.name}    
            </CardTextContainer> 
        </CardWrapper>
    )
}

export default CategoryCard;