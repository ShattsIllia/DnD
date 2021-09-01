import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import SimpleDnd from './components/SimpleDnd/SimpleDnd';
import Dnd2Lists from './components/Dnd2Lists/Dnd2Lists';

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

function App() {
    return (
        <div className="App">
            <SimpleDnd></SimpleDnd>
            <Dnd2Lists></Dnd2Lists>
        </div>  
     );
}

export default App;