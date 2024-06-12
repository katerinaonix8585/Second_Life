import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import OfferCardCopy from "components/OfferCard/OfferCard.tsx";
import { useAppDispatch, useAppSelector } from "store/hooks.ts";
import {
  offersDataSliceActions,
  offersDataSliceSelectors,
} from "store/redux/offers/offers";

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

function MyParticipantsPages() {
  const { userId } = useParams<{ userId: string }>();

  if (!userId) {
    return <div>Id не найден</div>;
  }

  const userTypeId = userId.replace("userId=", "");

  const dispatch = useAppDispatch();
  const {
    data: offers,
    statusOffer,
    isFirstPage,
    isLastPage,
    pageNumber,
    totalPages,
  } = useAppSelector(offersDataSliceSelectors.offer);
  const user = parseInt(userTypeId, 10);
  const [page, setPage] = useState(0);
  const size = 10;
  const sortBy = "createdAt";

  useEffect(() => {
    dispatch(
      offersDataSliceActions.getAllUsersOffer({
        user,
        page,
        size,
        sortBy,
      }),
    );
  }, [dispatch, user, page, size, sortBy]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <CategoryPageWrapper>
      <CategoryTextWrapper>
        <Tile>My participant offer</Tile>
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

export default MyParticipantsPages;
