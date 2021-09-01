import { COMPONENT, ROW, COLUMN } from "./constans";

const initialData = {
  layout: [
    {
      type: ROW,
      id: "row0",
      children: [
        {
          type: COLUMN,
          id: "column0",
          children: [
            {
              type: COMPONENT,
              id: "component0"
            },
            {
              type: COMPONENT,
              id: "component1"
            },
            {
              type: COMPONENT,
              id: "component3"
            },
            {
              type: COMPONENT,
              id: "component4"
            }
          ]
        },
        {
          type: COLUMN,
          id: "column1",
          children: [
            {
              type: COMPONENT,
              id: "component2"
            }
          ]
        }
      ]
    },
    
  ],
  components: {
    component0: { id: "component0", content: "1" },
    component1: { id: "component1", content: "2" },
    component2: { id: "component2", content: "3" },
    component3: { id: "component3", content: "4" },
    component4: { id: "component4", content: "5" }
  }
};

export default initialData;
