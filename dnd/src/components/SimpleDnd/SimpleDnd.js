import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './SimpleDnd.css'

const boxesItems = [
    {
      id: '1',
      name: '1',
    },
    {
      id: '2',
      name: '2',
    },
    {
      id: '3',
      name: '3',
    },
    {
      id: '4',
      name: '4',
    },
    {
      id: '5',
      name: '5',
    },
    {
      id: '6',
      name: '6',
    },
    {
      id: '7',
      name: '7',
    },
    {
      id: '8',
      name: '8',
    },
    {
      id: '9',
      name: '9',
    },
    {
      id: '10',
      name: '10',
    },
    
]

const SimpleDnd = () => {
    const [boxes, setBoxes] = useState(boxesItems);

    function handleOnDragEnd(result) {
        if (!result.destination) return;
    
        const items = Array.from(boxes);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setBoxes(items);
      }
    return(
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="boxes">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {boxes.map(({id, name}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <p>
                            { name }
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
    );
}

export default SimpleDnd;