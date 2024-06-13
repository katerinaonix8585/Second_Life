import React, { useEffect } from "react";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";
import { SortOrder } from "antd/lib/table/interface";

import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  categorysDataSliceActions,
  categorysDataSliceSelectors,
} from "store/redux/category/categorySlice";
import { CategoryData } from "store/redux/categoryOne/types";
import { categorysOneDataSliceActions } from "store/redux/categoryOne/categoryOneSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { data: categoriesData, status } = useAppSelector(
    categorysDataSliceSelectors.category,
  );

  useEffect(() => {
    dispatch(categorysDataSliceActions.getCategory());
  }, [dispatch]);

  const handleEdit = (id: number) => {
    window.location.href = `/admin/categories/edit/${id}`;
  };

  const handleHide = (id: string) => {
    dispatch(categorysOneDataSliceActions.hideCategoryById(id))
      .then((response) => {
        console.log("hideCategoryById response:", response);
      })
      .catch((error) => {
        console.error("hideCategoryById error:", error);
      });
  };

  const handleActive = (id: string) => {
    dispatch(categorysOneDataSliceActions.hideCategoryById(id))
      .then((response) => {
        console.log("hideCategoryById response:", response);
      })
      .catch((error) => {
        console.error("hideCategoryById error:", error);
      });
  };

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
        <Link to={`/admin/categories/${record.id}`}>{text}</Link>
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
      render: (_text: string, record: CategoryData) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record.id)}>Edit</a>
          {record.active ? (
            <a onClick={() => handleHide(Number(record.id).toString())}>Hide</a>
          ) : (
            <a onClick={() => handleActive(Number(record.id).toString())}>
              Active
            </a>
          )}
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
