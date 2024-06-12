import React, { useEffect } from "react";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";
import { SortOrder } from "antd/lib/table/interface";

import { CategoryData } from "store/redux/category/types";
import {
  categorysDataSliceActions,
  categorysDataSliceSelectors,
} from "store/redux/category/categorySlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { data: categoriesData, status } = useAppSelector(
    categorysDataSliceSelectors.category,
  );

  useEffect(() => {
    dispatch(categorysDataSliceActions.getCategory());
  }, [dispatch]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a: CategoryData, b: CategoryData) => a.id - b.id,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      defaultSortOrder: "ascend" as SortOrder,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: CategoryData) => (
        <Link to={`/category/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (active: boolean) => (active ? "Active" : "Inactive"),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>Edit</a>
          <a>Hide</a>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={categoriesData}
      loading={status === "loading"}
      rowKey="id"
    />
  );
};

export default App;
