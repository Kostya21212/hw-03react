import React, { useState, useEffect } from "react";
import "../style.sass";
import { API, TAS_STATUS } from "../../constants/tasks";
import Task from "../Task/Task";

export default function Tasks() {
  const [task, setTask] = useState([]);
  const [tasksTodo, setTaskTodo] = useState([]);
  const [tasksProgress, setTaskProgress] = useState([]);
  const [tasksDone, setTaskDone] = useState([]);

  const getTasks = async () => {
    try {
      const request = await fetch(API),
        response = await request.json();
      console.log(response)
      setTask(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);
  useEffect(() => {
    setTaskTodo(task.filter((item) => item.status === TAS_STATUS.TODO));
    setTaskProgress(task.filter((item) => item.status === TAS_STATUS.PROGRESS));
    setTaskDone(task.filter((item) => item.status === TAS_STATUS.DONE));
  }, [task]);

  const handleTaskProgress = async (item) => {
    try {
      const request = await fetch(API + `/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ ...item, status: TAS_STATUS.PROGRESS }),
          headers: {
            "Content-type": "application/json",
          },
        }),
        response = await request.json();
      setTask((prevState) =>
        prevState.map((element) => {
          if (element.id === response.id) element = response;
          return element;
        })
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const handleTaskTodo = async (item) => {
    try {
      const request = await fetch(API + `/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ ...item, status: TAS_STATUS.TODO }),
          headers: {
            "Content-type": "application/json",
          },
        }),
        response = await request.json();
        console.log(response);
      setTask((prevState) =>
        prevState.map((element) => {
          if (element.id === response.id) element = response;
          return element;
        })
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const handleTaskDone = async (item) => {
    try {
      const request = await fetch(API + `/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ ...item, status: TAS_STATUS.DONE }),
          headers: {
            "Content-type": "application/json",
          },
        }),
        response = await request.json();
      setTask((prevState) =>
        prevState.map((element) => {
          if (element.id === response.id) element = response;
          return element;
        })
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const handleTaskArchive = async (item) => {
    try {
      await fetch(API + `/${item.id}`, {
        method: "DELETE",
      });
      setTask((prevState) =>
        prevState.filter((element) => element.id !== item.id)
      );
    } catch (err) {
      console.log(err);
    }
  };
  const TASKS = [
    {
      title: "To Do",
      tasks: tasksTodo,
      btns: [{ title: "In progress", action: handleTaskProgress }],
    },
    {
      title: "In progress",
      tasks: tasksProgress,
      btns: [
        { title: "To do", action: handleTaskTodo },
        { title: "Done", action: handleTaskDone },
      ],
    },
    {
      title: "Done",
      tasks: tasksDone,
      btns: [{ title: "to archive", action: handleTaskArchive }],
    },
  ];
  return (
    <div className="board__wrapper">
      {TASKS.map((item, i) => <Task key={i} title={item.title} tasks={item.tasks} btns={item.btns} />)}
    </div>
  );
}
