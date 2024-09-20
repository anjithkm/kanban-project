import React from 'react';
import { Draggable } from 'react-beautiful-dnd';


export type TaskType = {
    id: number;
    content: string;
  };


  type TaskProps = {
    task: TaskType;
    index: number;
  };
  
  const Task: React.FC<TaskProps> = ({ task, index }) => {
    return (
      <Draggable draggableId={task.id.toString()} index={index}>
        {(provided) => (
          <div
            className="task"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {task.content}
          </div>
        )}
      </Draggable>
    );
  };
  
  export default Task;
  
