import { Project } from "screens/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useAsync } from "utils/use-async";
import { useHttp } from "./http";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
  }, [param]); // eslint-disable-line react-hooks/exhaustive-deps

  return result;
};
