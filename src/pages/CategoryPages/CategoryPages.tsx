import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  offersDataSliceActions,
  offersDataSliceSelectors,
} from "store/redux/offer/offer";
import OfferCardCopy from "components/OfferCardCopy/OfferCardCopy";
import { categorysDataSliceSelectors } from "store/redux/category/categorySlice";

import {
  CategoryPageWrapper,
  CategoryTextWrapper,
  OffersWrapper,
  PaginationButton,
  PaginationWrapper,
  Tile,
} from "./styles";

function CategoryPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Id не найден</div>;
  }

  const categoryId = id.replace("id=", "");

  const categoryIdNumber = parseInt(categoryId, 10);
  const dispatch = useAppDispatch();
  const { data: offers, statusOffer } = useAppSelector(
    offersDataSliceSelectors.offer,
  );
  const [page, setPage] = useState(0);
  const size = 10;
  const sortBy = "createdAt";
  console.log(id);

  const categoryDataSlice = useAppSelector(
    categorysDataSliceSelectors.category,
  );
  const categoriesData = categoryDataSlice.data;

  useEffect(() => {
    dispatch(offersDataSliceActions.getAllOffer({ page, size, sortBy }));
  }, [dispatch, page, size, sortBy]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const filteredOffers = offers.filter(
    (offer) => offer.categoryId === Number(categoryIdNumber),
  );

  return (
    <CategoryPageWrapper>
      <CategoryTextWrapper>
        <Tile>{categoriesData[categoryIdNumber]?.name.toUpperCase()}</Tile>
      </CategoryTextWrapper>
      <OffersWrapper>
        <OfferCardCopy offers={filteredOffers} />
      </OffersWrapper>
      {statusOffer === "loading" && <div>Loading...</div>}
      {statusOffer === "success" && (
        <PaginationWrapper>
          <PaginationButton onClick={loadMore}>Load More</PaginationButton>
        </PaginationWrapper>
      )}
    </CategoryPageWrapper>
  );
}

export default CategoryPage;
