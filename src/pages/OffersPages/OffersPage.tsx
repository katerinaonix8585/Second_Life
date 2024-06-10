import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import OfferCardCopy from "components/OfferCard/OfferCard.tsx";
import { useAppDispatch, useAppSelector } from "store/hooks.ts";
import {
  offersDataSliceActions,
  offersDataSliceSelectors,
} from "store/redux/offers/offers.ts";
import { typeOfferData } from "pages/CreateOffer/OffersData.ts";

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

function OffersPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Id не найден</div>;
  }

  const offersTypeId = id.replace("id=", "");
  const offersTypeIdNumber = parseInt(offersTypeId, 10);

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

  const filteredOffers = offers.filter((offer) => {
    if (offersTypeIdNumber === 0) {
      return offer.isFree === true;
    } else if (offersTypeIdNumber === 1) {
      return offer.isFree === false && offer.winBid === null;
    } else if (offersTypeIdNumber === 2) {
      return offer.isFree === false && (offer.winBid ?? 0) > 0;
    }
    return true;
  });

  const gettypeOfferById = (offerId: number) => {
    const typeOffer = typeOfferData.find((cat) => cat.id === offerId);
    return typeOffer ? typeOffer.value : "Unknown Location";
  };

  const offersTypeName = () => {
    if (offersTypeIdNumber === 0) {
      return gettypeOfferById(0);
    } else if (offersTypeIdNumber === 1) {
      return gettypeOfferById(1);
    } else if (offersTypeIdNumber === 2) {
      return gettypeOfferById(2);
    }
    return "All Types";
  };

  return (
    <CategoryPageWrapper>
      <CategoryTextWrapper>
        <Tile>{offersTypeName()}</Tile>
      </CategoryTextWrapper>
      <OffersWrapper>
        <OfferCardCopy offers={filteredOffers} />
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

export default OffersPage;
