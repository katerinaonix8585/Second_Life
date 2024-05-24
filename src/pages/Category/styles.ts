import styled from "@emotion/styled";

export const CategoryPageWrapper = styled.div`
  width: 100%;    
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CategoryWrapper = styled.div`
  width: 2000px;   
  padding-top: 40px;
`;


export const CategoryTextWrapper = styled.div`
  display: flex;  
  justify-content: center; 
  padding: 50px 0px 0px 50px;
  width: 2000px;    
`;

export const CategoryText = styled.p`
  font-size: 30px;
  font-weight: bold;
  color: #56119C;  
  font-family: 'LibreFranklin', sans-serif;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);   
  grid-template-rows: repeat(4, 1fr); 
  gap: 16px; 
  padding: 20px 100px;  
  width: 100%; 
  box-sizing: border-box; 
`;