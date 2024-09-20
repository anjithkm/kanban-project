import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';


export type TaskType = {
    id: number;
    content: string;
  };

type ColumnProps = {
  title: string;
  tasks: TaskType[];
  columnId: string;
};

const Column: React.FC<ColumnProps> = ({ title, tasks, columnId }) => {
  return (
    <div className="column">
      <h2>{title}</h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            className="task-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
