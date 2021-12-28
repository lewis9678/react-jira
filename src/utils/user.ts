import { User } from "screens/project-list/search-pannel";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useAsync } from "utils/use-async";
import { useHttp } from "./http";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
  }, [param]); // eslint-disable-line react-hooks/exhaustive-deps

  return result;
};
