import React from 'react'
import TaskItem from '../TaskItem/TaskItem';

export default function Task({tasks=[], title='', btns=[]}) {
  return (
    <div className="tasks__wrapper">
          <p className="tasks__title">{title}{tasks.length}</p>
      {tasks.length ? (
        <ul className="tasks__list">
          {" "}
          {tasks.map((item) => (
            <TaskItem key={item.id} item={item} btns={btns}></TaskItem>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
