import React, { useState, useCallback } from "react";

import DropZone from "../DropZone/DropZone";
import Row from "../Row/Row";
import initialData from "../../data";
import {
  handleMoveWithinParent,
  handleMoveToDifferentParent,
} from "../../helpers";

import {COLUMN} from "../../constans";

const DndChangeListsPosition = () => {
  const initialLayout = initialData.layout;
  const initialComponents = initialData.components;
  const [layout, setLayout] = useState(initialLayout);
  const [components, setComponents] = useState(initialComponents);

  const handleDrop = useCallback(
        (dropZone, item) => {

            const splitDropZonePath = dropZone.path.split("-");
            const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");
            const newItem = { id: item.id, type: item.type };
            if (item.type === COLUMN) {
                newItem.children = item.children;
            }

            const splitItemPath = item.path.split("-");
            const pathToItem = splitItemPath.slice(0, -1).join("-");

            if (splitItemPath.length === splitDropZonePath.length) {
                if (pathToItem === pathToDropZone) {
                    setLayout(
                        handleMoveWithinParent(layout, splitDropZonePath, splitItemPath)
                    );
                    return;
                }

                setLayout(
                    handleMoveToDifferentParent(
                        layout,
                        splitDropZonePath,
                        splitItemPath,
                        newItem
                    )
                );
                return;
            }

            setLayout(
                handleMoveToDifferentParent(
                    layout,
                    splitDropZonePath,
                    splitItemPath,
                    newItem
                )
            );
        },
        [layout, components]
    );

  const renderRow = (row, currentPath) => {
    return (
      <Row
        key={row.id}
        data={row}
        handleDrop={handleDrop}
        components={components}
        path={currentPath}
      />
    );
  };

  return (
    <div className="body">
        <div className="pageContainer">
            <div className="page">
                {layout.map((row, index) => {
                    const currentPath = `${index}`;
                        return (
                            <div key={row.id}>
                                <DropZone
                                    data={{
                                        path: currentPath,
                                        childrenCount: layout.length
                                    }}
                                    onDrop={handleDrop}
                                    path={currentPath}
                                />
                                {renderRow(row, currentPath)}
                            </div>
                        );
                    }
                )}
          <DropZone
            data={{
                path: `${layout.length}`,
                childrenCount: layout.length
            }}
            onDrop={handleDrop}
            isLast
          />
        </div>
      </div>
    </div>
  );
};
export default DndChangeListsPosition;
