import { SearchPanel } from "./search-pannel";
import { List } from "./list";
import { useState } from "react";
import { useDebounce } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
// import { Helmet } from "react-helmet";
import { useDocumentTitle } from "utils";
import { useUrlQueryParam } from "utils/url";

type keysType = ("name" | "personId")[];

export const ProjectListScreen = () => {
  const [keys] = useState<keysType>(["name", "personId"]);
  const [param, setParam] = useUrlQueryParam(keys);
  const debounceParam = useDebounce(param, 200);
  const { isLoading, error, data: list } = useProjects(debounceParam);
  const { data: users } = useUsers();
  useDocumentTitle("项目列表", false);

  return (
    <Container>
      {/* <Helmet>
        <title>项目列表</title>
      </Helmet> */}
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

ProjectListScreen.whyDidYouRender = false;
