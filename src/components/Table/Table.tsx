import React, { useEffect, useState } from "react";
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
  const { status } = useAppSelector(categorysDataSliceSelectors.category);
  const [localData, setLocalData] = useState<CategoryData[]>([]);

  useEffect(() => {
    dispatch(categorysDataSliceActions.getCategoryAdmin()).then((response) => {
      setLocalData(response.payload);
    });
  }, [dispatch]);

  const handleEdit = (id: number) => {
    window.location.href = `#/admin/categories/edit/${id}`;
  };

  const handleHide = async (id: string) => {
    try {
      await dispatch(
        categorysOneDataSliceActions.hideCategoryById(id),
      ).unwrap();
      setLocalData((prevData) =>
        prevData.map((item) =>
          item.id === parseInt(id) ? { ...item, active: false } : item,
        ),
      );
    } catch (error) {
      console.error("hideCategoryById error:", error);
    }
  };

  const handleActive = async (id: string) => {
    try {
      await dispatch(
        categorysOneDataSliceActions.activateCategoryById(id),
      ).unwrap();
      setLocalData((prevData) =>
        prevData.map((item) =>
          item.id === parseInt(id) ? { ...item, active: true } : item,
        ),
      );
    } catch (error) {
      console.error("activateCategoryById error:", error);
    }
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
            <a onClick={() => handleHide(record.id.toString())}>Hide</a>
          ) : (
            <a onClick={() => handleActive(record.id.toString())}>Activate</a>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={localData}
      loading={status === "loading"}
      rowKey="id"
    />
  );
};

export default App;
