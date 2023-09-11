import { createTaskSchemaType } from "@/schema/createTask";
import { Task } from "@prisma/client";

export interface IndexedTask extends createTaskSchemaType {
  lastSync?: Date;
  id: number;
}

// Let us open our database
const DB_VERSION = 1;
const DB_NAME = "RemindAfter";
const TASKS = "Tasks";
let request: any | null = null;

export const init = () => {
  if (request === null && window) {
    request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      db.createObjectStore(TASKS, { autoIncrement: true });
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
  const newData = { ...data, lastSynced: null };
  return new Promise((resolve, reject) => {
    const req = window.indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = (event: any) => {
      const db = event.target.result;
      const txn = db.transaction(TASKS, "readwrite");
      const store = txn.objectStore(TASKS);
      let q = store.put(newData);
      txn.oncomplete = function () {
        db.close();
        resolve("success");
      };
      txn.onerror = function (e: unknown) {
        reject(e);
      };
    };
  });
};

export const deleteTask = async (id: number) => {
  return new Promise((resolve, reject) => {
    console.log("deleting?");
    const req = window.indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = (event: any) => {
      const db = event.target.result;
      const txn = db.transaction(TASKS, "readwrite");
      const store = txn.objectStore(TASKS);
      store.delete(id);
      txn.oncomplete = function () {
        db.close();
        resolve("success");
      };
      txn.onerror = function (e: unknown) {
        reject(e);
      };
    };
  });
};

export const editTask = async (id: number, data: createTaskSchemaType) => {
  const newData = { ...data, lastSynced: null };
  return new Promise((resolve, reject) => {
    const req = window.indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = (event: any) => {
      const db = event.target.result;
      const txn = db.transaction(TASKS, "readwrite");
      const store = txn.objectStore(TASKS);
      let cur = store.get(id);
      console.log({ cur });
      let q = store.put({ ...newData, id });
      txn.oncomplete = function () {
        db.close();
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