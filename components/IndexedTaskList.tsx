"use client";
import React, { useState, useEffect } from "react";
import TaskCard from "@/components/TaskCard";
import { getTasks, IndexedTask } from "@/lib/indexedDB";

export function TaskList() {
  const [tasks, setTasks] = useState<IndexedTask[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getTasks()
      .then((indexedTasks: IndexedTask[]) => {
        setTasks(indexedTasks);
      })
      .finally(() => {
        setLoading(false);
      });
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
