"use client";
import React, { useState, useEffect, useMemo } from "react";
import TaskCard from "@/components/TaskCard";
import { getTasks, IndexedTask, TaskObservable } from "@/lib/indexedDB";

export function TaskList() {
  const [tasks, setTasks] = useState<IndexedTask[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchTasks = useMemo(
    () => () =>
      getTasks()
        .then((indexedTasks: IndexedTask[]) => {
          setTasks(indexedTasks);
        })
        .finally(() => {
          setLoading(false);
        }),
    [],
  );
  useEffect(() => {
    setLoading(true);
    fetchTasks();
    // Re-fetch tasks on each create, edit or delete
    TaskObservable.subscribe(fetchTasks);
    return () => {
      TaskObservable.unsubscribe(fetchTasks);
    };
  }, []);
  if (tasks.length === 0) return null;
  return (
    <div>
      <h1 className="text-2xl font-bold text-indigo-500 dark:text-sky-500 mb-4">
        Upcoming Reminders
      </h1>
      <div className="ml-12 border p-4 border-indigo-500 dark:border-sky-500 rounded-md">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
