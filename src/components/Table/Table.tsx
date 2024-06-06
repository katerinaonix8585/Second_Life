import React from "react";
import { Space, Table } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  name: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>Edit</a>
        <a>New category</a>
        <a>Hide</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "Watch",
  },
  {
    key: "2",
    name: "Bicycle",
  },
  {
    key: "3",
    name: "Shoes",
  },
];

const App: React.FC = () => <Table columns={columns} dataSource={data} />;

export default App;
