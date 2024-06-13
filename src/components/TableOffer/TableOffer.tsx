import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";
import { SortOrder } from "antd/lib/table/interface";

import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  offersDataSliceActions,
  offersDataSliceSelectors,
} from "store/redux/offers/offers";
import { categorysDataSliceSelectors } from "store/redux/category/categorySlice";
import { locationsDataSliceSelectors } from "store/redux/location/locationSlice";
import { typeOfferData } from "pages/CreateOffer/OffersData";
import { OfferData } from "store/redux/offer/types";
import { offerDataSliceActions } from "store/redux/offer/offer";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    data: offers,
    statusOffer,
    totalElements,
  } = useAppSelector(offersDataSliceSelectors.offer);
  const [page, setPage] = useState(0);
  const size = 50;
  const sortBy = "createdAt";

  useEffect(() => {
    dispatch(offersDataSliceActions.getAllOffer({ page, size, sortBy }));
  }, [dispatch, page, size, sortBy]);

  const categoryDataSlice = useAppSelector(
    categorysDataSliceSelectors.category,
  );
  const categoriesData = categoryDataSlice.data;

  const locationsDataSlice = useAppSelector(
    locationsDataSliceSelectors.location,
  );
  const locationsData = locationsDataSlice.data;

  const getLocationNameById = (id: number) => {
    const location = locationsData.find((loc) => loc.id === id);
    return location ? location.name : "Unknown Location";
  };

  const getCategoryNameById = (id: number) => {
    const category = categoriesData.find((cat) => cat.id === id);
    return category ? category.name : "Unknown Category";
  };

  const formatDate = (dateInput?: string | Date) => {
    if (!dateInput) return "Unknown Date";
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  const gettypeOfferById = (id: number) => {
    const typeOffer = typeOfferData.find((cat) => cat.id === id);
    return typeOffer ? typeOffer.value : "Unknown Type";
  };

  const getTypeOfferId = (offer: OfferData) => {
    if (offer.isFree) {
      return 0;
    } else if (!offer.isFree && offer.winBid === null) {
      return 1;
    } else {
      return 2;
    }
  };

  const handleRejected = (id: string) => {
    dispatch(
      offerDataSliceActions.rejectedOfferById({
        offerId: id,
        rejectionReasonId: 1,
      }),
    )
      .then((response) => {
        console.log("rejectedOfferById response:", response);
      })
      .catch((error) => {
        console.error("rejectedOfferById error:", error);
      });
  };

  const handleVerify = (id: string) => {
    dispatch(offerDataSliceActions.verifyOfferById(id))
      .then((response) => {
        console.log("verifyOfferById response:", response);
      })
      .catch((error) => {
        console.error("verifyOfferById error:", error);
      });
  };

  const handleBlocked = (id: string) => {
    dispatch(offerDataSliceActions.blockedOfferById(id))
      .then((response) => {
        console.log("blockedOfferById response:", response);
      })
      .catch((error) => {
        console.error("blockedOfferById error:", error);
      });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a: OfferData, b: OfferData) => a.id - b.id,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      defaultSortOrder: "descend" as SortOrder,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: OfferData) => (
        <Link to={`/admin/offers/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (_text: string, record: OfferData) =>
        getCategoryNameById(record.categoryId),
    },
    {
      title: "Location",
      dataIndex: "locationId",
      key: "locationId",
      render: (_text: string, record: OfferData) =>
        getLocationNameById(record.locationId),
    },
    {
      title: "Type Offer",
      key: "typeOffer",
      render: (_text: string, record: OfferData) =>
        gettypeOfferById(getTypeOfferId(record)),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Creator",
      dataIndex: "ownerFullName",
      key: "ownerFullName",
    },
    {
      title: "AuctionStartAt",
      dataIndex: "auctionStartAt",
      key: "auctionStartAt",
      render: (_text: string, record: OfferData) =>
        formatDate(record.auctionStartAt),
    },
    {
      title: "AuctionEndAt",
      dataIndex: "auctionEndAt",
      key: "auctionEndAt",
      render: (_text: string, record: OfferData) =>
        formatDate(record.auctionEndAt),
    },
    {
      title: "Action",
      key: "action",
      render: (_text: string, record: OfferData) => (
        <Space size="middle">
          {record.status === "VERIFICATION" && (
            <>
              <a onClick={() => handleVerify(Number(record.id).toString())}>
                Verify
              </a>
              <a onClick={() => handleRejected(Number(record.id).toString())}>
                Rejected
              </a>
            </>
          )}
          {(record.status === "AUCTION_STARTED" ||
            record.status === "QUALIFICATION") && (
            <>
              <a onClick={() => handleBlocked(Number(record.id).toString())}>
                Blocked
              </a>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={offers}
      loading={statusOffer === "loading"}
      rowKey="id"
      pagination={{
        current: page + 1,
        total: totalElements ?? 0,
        pageSize: size,
        onChange: (pageNumber) => setPage(pageNumber - 1),
      }}
    />
  );
};

export default App;
