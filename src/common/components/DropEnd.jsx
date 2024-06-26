import React from "react";
import {
  Droppable,
  DragDropContext,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";


const List = ({ children, title, onDragEnd, name }) => {
    console.log("name",name,"title",title,)
  return (
    <div className="flex flex-col w-6/12">
      <h2 className="text-2xl font-bold mb-2 mx-5">{title}</h2>
      <div className="">
        <Droppable droppableId={name}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} className="h-screen">
              <div className="p-5 rounded-md min-h-max bg-yellow-50 mx-2 gap-y-3 flex flex-col h-screen">
                {children}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default List;