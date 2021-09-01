import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

const itemsForColumn = [
    { id: uuidv4(), content: "1" },
    { id: uuidv4(), content: "2" },
    { id: uuidv4(), content: "3" },
    { id: uuidv4(), content: "4" },
    { id: uuidv4(), content: "5" }
  ];
  
  const columnsObj = {
    [uuidv4()]: {
      name: "First Column",
      items: itemsForColumn
    },
    [uuidv4()]: {
      name: "Second Column",
      items: []
    },
  };
  
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

const Dnd2Lists = () => {
    const [columns, setColumns] = useState(columnsObj);
    return (
        <div style={{ display: "flex", justifyContent: "space-around", height: "100%" }}>
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([columnId, column], index) => {
                return (
                    <div>
                    <div
                        className='column__wrapper'
                        key={columnId}
                    >
                        <h2>{column.name}</h2>
                        <div style={{ margin: 8 }}>
                        <Droppable droppableId={columnId} key={columnId}>
                            {(provided) => {
                            return (
                                <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className='column'
                                >
                                {column.items.map((item, index) => {
                                    return (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided) => {
                                        return (
                                            <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                ...provided.draggableProps.style
                                            }}
                                            className='column__item'
                                            >
                                            {item.content}
                                            </div>
                                        );
                                        }}
                                    </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                                </div>
                            );
                            }}
                        </Droppable>
                        </div>
                    </div>
                    </div>
                );
                })}
            </DragDropContext>
        </div>
    );
}

export default Dnd2Lists;