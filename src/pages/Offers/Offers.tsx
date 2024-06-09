import { useEffect, useState } from "react";

import OfferCardCopy from "components/OfferCard/OfferCard.tsx";
import { useAppDispatch, useAppSelector } from "store/hooks.ts";
import {
  offersDataSliceActions,
  offersDataSliceSelectors,
} from "store/redux/offer/offer";

import {
  CategoryPageWrapper,
  OffersWrapper,
  Tile,
  PaginationButton,
  PaginationWrapper,
  PaginationEllipsis,
  PaginationCurrentButton,
  CategoryTextWrapper,
} from "./style.ts";

function Offers() {
  const dispatch = useAppDispatch();
  const {
    data: offers,
    statusOffer,
    isFirstPage,
    isLastPage,
    pageNumber,
    totalPages,
  } = useAppSelector(offersDataSliceSelectors.offer);
  const [page, setPage] = useState(0);
  const size = 10;
  const sortBy = "createdAt";

  useEffect(() => {
    dispatch(offersDataSliceActions.getAllOffer({ page, size, sortBy }));
  }, [dispatch, page, size, sortBy]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <CategoryPageWrapper>
      <CategoryTextWrapper>
        <Tile>Offers</Tile>
      </CategoryTextWrapper>
      <OffersWrapper>
        <OfferCardCopy offers={offers} />
      </OffersWrapper>
      {statusOffer === "loading" && <div>Loading...</div>}
      {statusOffer === "success" && (
        <PaginationWrapper>
          {!isFirstPage && pageNumber !== null && (
            <PaginationButton onClick={() => handlePageChange(pageNumber - 1)}>
              {pageNumber}
            </PaginationButton>
          )}

          {pageNumber !== null && (
            <PaginationCurrentButton
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber + 1}
            </PaginationCurrentButton>
          )}

          {!isLastPage && pageNumber !== null && totalPages !== null && (
            <>
              {pageNumber < totalPages - 2 && (
                <PaginationButton
                  onClick={() => handlePageChange(pageNumber + 1)}
                >
                  {pageNumber + 2}
                </PaginationButton>
              )}
            </>
          )}

          {!isLastPage && totalPages !== null && totalPages > 1 && (
            <>
              {pageNumber !== null && pageNumber < totalPages - 2 && (
                <PaginationEllipsis>...</PaginationEllipsis>
              )}
              <PaginationButton
                onClick={() => handlePageChange(totalPages - 1)}
              >
                {totalPages}
              </PaginationButton>
            </>
          )}
        </PaginationWrapper>
      )}
    </CategoryPageWrapper>
  );
}

export default Offers;
