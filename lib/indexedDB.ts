import { createTaskSchemaType } from "@/schema/createTask";

type ObserveFunction = (data?: unknown) => void;

class Observable {
  observers: ObserveFunction[];

  constructor() {
    this.observers = [];
  }
  public subscribe(fn: ObserveFunction) {
    this.observers.push(fn);
  }
  public unsubscribe(fn: ObserveFunction) {
    this.observers = this.observers.filter((observer) => observer !== fn);
  }
  public notify(data?: unknown) {
    this.observers.forEach((observer) => observer(data));
  }
}

export const TaskObservable = new Observable();

export interface IndexedTask extends createTaskSchemaType {
  id?: number;
  remoteId?: number;
  dirty: boolean;
}

// Let us open our database
const DB_VERSION = 1;
const DB_NAME = "RemindAfter";
const TASKS = "Tasks";
const DELETED_TASKS = "DeletedRemoteTasks";

let request: any | null = null;

export const init = () => {
  if (request === null && window) {
    request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      db.createObjectStore(TASKS, { autoIncrement: true });
      db.createObjectStore(DELETED_TASKS, { autoIncrement: true });
    };
    request.onerror = (event: any) => {
      console.log("indexed db error!");
      console.log(event);
    };
    request.onsuccess = (event: any) => {
      console.log("indexed db success!");
      console.log(event);
    };
  }
};

export const createTask = async (data: createTaskSchemaType) => {
  const newData: IndexedTask = { ...data, dirty: true, remoteId: undefined };
  return new Promise((resolve, reject) => {
    const req = window.indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = (event: any) => {
      const db = event.target.result;
      const txn = db.transaction(TASKS, "readwrite");
      const store = txn.objectStore(TASKS);
      let q = store.put(newData);
      txn.oncomplete = function () {
        db.close();
        TaskObservable.notify();
        resolve("success");
      };
      txn.onerror = function (e: unknown) {
        reject(e);
      };
    };
  });
};

export const trackRemoteTaskDeletion = async (remoteId: number) => {
  return new Promise((resolve, reject) => {
    const req = window.indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = (event: any) => {
      const db = event.target.result;
      const txn = db.transaction(TASKS, "readwrite");
      const store = txn.objectStore(TASKS);
      let q = store.put({ remoteId });
      txn.oncomplete = function () {
        db.close();
        resolve("success");
      };
    };
  });
};

export const getRemoteTaskDeletions = async () => {
  return new Promise((resolve, reject) => {
    const req = window.indexedDB.open(DB_NAME, DB_VERSION);
    const ids: number[] = [];
    req.onsuccess = (event: any) => {
      const db = event.target.result;
      const txn = db.transaction(DELETED_TASKS, "readonly");
      const store = txn.objectStore(DELETED_TASKS);
      store.openCursor().onsuccess = (event: any) => {
        let cursor = event.target.result;
        if (cursor) {
          let task = cursor.value;
          ids.push(task.remoteId);
          cursor.continue();
        }
      };
      txn.oncomplete = function () {
        db.close();
        resolve(ids);
      };
      txn.onerror = function (e: unknown) {
        reject(e);
      };
    };
  });
};

export const clearRemoteTaskDeletions = async () => {
  const req = window.indexedDB.open(DB_NAME, DB_VERSION);
  req.onsuccess = (event: any) => {
    const db = event.target.result;
    db.objectStore(DELETED_TASKS).clear();
  };
};
export const deleteTask = async (id: number) => {
  return new Promise((resolve, reject) => {
    const req = window.indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = (event: any) => {
      const db = event.target.result;
      const txn = db.transaction(TASKS, "readwrite");
      const store = txn.objectStore(TASKS);
      // If current value is one synced with remote then we need to track it to cleanup next sync
      let cur: IndexedTask = store.get(id);
      if (Number.isInteger(cur?.remoteId)) {
        trackRemoteTaskDeletion(cur.remoteId as number);
      }
      store.delete(id);
      txn.oncomplete = function () {
        db.close();
        TaskObservable.notify();
        resolve("success");
      };
      txn.onerror = function (e: unknown) {
        reject(e);
      };
    };
  });
};

export const editTask = async (id: number, data: createTaskSchemaType) => {
  const newData: IndexedTask = { ...data, dirty: true };
  return new Promise((resolve, reject) => {
    const req = window.indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = (event: any) => {
      const db = event.target.result;
      const txn = db.transaction(TASKS, "readwrite");
      const store = txn.objectStore(TASKS);
      // Merge with current value in case there were changes done elsewhere
      let cur: IndexedTask = store.get(id);
      store.put({ ...cur, ...newData }, id);
      txn.oncomplete = function () {
        db.close();
        TaskObservable.notify();
        resolve("success");
      };
      txn.onerror = function (e: unknown) {
        reject(e);
      };
    };
  });
};

export const getTasks = async (): Promise<IndexedTask[]> => {
  return new Promise((resolve, reject) => {
    const req = window.indexedDB.open(DB_NAME, DB_VERSION);
    const tasks: IndexedTask[] = [];
    req.onsuccess = (event: any) => {
      const db = event.target.result;
      const txn = db.transaction(TASKS, "readonly");
      const store = txn.objectStore(TASKS);
      store.openCursor().onsuccess = (event: any) => {
        let cursor = event.target.result;
        if (cursor) {
          let task = cursor.value;
          tasks.push({ ...task, id: cursor.key });
          cursor.continue();
        }
      };
      txn.oncomplete = function () {
        db.close();
        resolve(tasks);
      };
      txn.onerror = function (e: unknown) {
        reject(e);
      };
    };
  });
};
