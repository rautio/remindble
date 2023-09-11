"use client";
import React, {
  useContext,
  createContext,
  ReactNode,
  FC,
  useEffect,
} from "react";
import * as dbTask from "@/actions/task";
import * as local from "@/lib/indexedDB";
import { useUser } from "@clerk/nextjs";
import { createTaskSchemaType } from "@/schema/createTask";

interface APIFunctions {
  editTask: (id: number, data: createTaskSchemaType) => Promise<any>;
  createTask: (data: createTaskSchemaType) => Promise<any>;
  deleteTask: (id: number) => Promise<any>;
}

interface APICtx {
  api: APIFunctions;
}

const APIContext = createContext<APICtx>({ api: { ...local } });

interface Props {
  children?: ReactNode;
}

export const APIProvider: FC<Props> = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();
  const useDB = isLoaded && isSignedIn;
  useEffect(() => {
    if (!useDB) {
      local.init();
    }
  }, [useDB]);
  return (
    <APIContext.Provider value={{ api: useDB ? { ...dbTask } : { ...local } }}>
      {children}
    </APIContext.Provider>
  );
};

interface UseTask {
  edit: (id: number, data: any) => Promise<void>;
  create: (data: any) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

export const useTask = (): UseTask => {
  const { api } = useContext(APIContext);
  return { edit: api.editTask, create: api.createTask, delete: api.deleteTask };
};
