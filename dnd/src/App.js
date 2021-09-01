import React from 'react';
import './App.css';
import SimpleDnd from './components/SimpleDnd/SimpleDnd';
import Dnd2Lists from './components/Dnd2Lists/Dnd2Lists';
import DndChangeListsPosition from './components/DndChangeListsPosition/DndChangeListsPosition';
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
    return (
        <div className="App">
            <SimpleDnd></SimpleDnd>
            <Dnd2Lists></Dnd2Lists>
            <DndProvider backend={HTML5Backend}>
              <DndChangeListsPosition></DndChangeListsPosition>
            </DndProvider>
        </div>  
     );
}

export default App;