/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  offersDataSliceActions,
  offersDataSliceSelectors,
} from "store/redux/offers/offers";
import OfferCardCopy from "components/OfferCard/OfferCard";

import {
  CategoryPageWrapper,
  CategoryTextWrapper,
  OffersWrapper,
  PaginationButton,
  PaginationCurrentButton,
  PaginationEllipsis,
  PaginationWrapper,
  Tile,
} from "./styles";

function SearchPages() {
  const { pattern_request = "", location_id } = useParams<{
    pattern_request?: string;
    location_id?: string;
  }>();

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
  const isAsc = false;
  const pattern = pattern_request;
  const location = location_id ? parseInt(location_id) : undefined;

  useEffect(() => {
    const searchParams = {
      pattern,
      page,
      size,
      sortBy,
      isAsc,
    } as {
      pattern: string;
      page: number;
      size: number;
      sortBy: string;
      isAsc: boolean;
      location_id?: number;
    };

    if (location && location !== 0) {
      searchParams.location_id = location;
    }

    dispatch(offersDataSliceActions.searchOffer(searchParams));
  }, [dispatch, page, pattern, size, sortBy, isAsc, location]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <CategoryPageWrapper>
      <CategoryTextWrapper>
        <Tile>Search "{pattern}"</Tile>
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

export default SearchPages;
