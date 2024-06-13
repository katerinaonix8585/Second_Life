import TableOffer from "components/TableOffer/TableOffer.tsx";

import { HomeContainer, HomeWrapper } from "./style.ts";

function ListOffers() {
  return (
    <HomeWrapper>
      <HomeContainer>
        <TableOffer />
      </HomeContainer>
    </HomeWrapper>
  );
}

export default ListOffers;
