import { User } from "./search-pannel";
import { Table } from "antd";

interface project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  pin: boolean;
}

interface listProps {
  list: project[];
  users: User[];
}

export const List = ({ list, users }: listProps) => {
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      dataSource={list}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
      ]}
    />
  );
};
