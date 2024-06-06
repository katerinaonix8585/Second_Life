import Table from "components/Table/Table.tsx";

import { HomeContainer, HomeWrapper } from "./style.ts";

function ListCategories() {
  return (
    <HomeWrapper>
      <HomeContainer>
        <Table />
      </HomeContainer>
    </HomeWrapper>
  );
}

export default ListCategories;
