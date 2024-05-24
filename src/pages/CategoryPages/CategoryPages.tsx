import { useParams } from 'react-router-dom';
import { CategoryPageWrapper, CategoryText, CategoryTextWrapper } from './styles';

function CategoryPage() {
    const { name } = useParams();
    
    return (
        <CategoryPageWrapper> 

            <CategoryTextWrapper>
                <CategoryText>
                {name?.toUpperCase()}
                </CategoryText>
            </CategoryTextWrapper> 

        </CategoryPageWrapper>
        
    );
}

export default CategoryPage;