import React, { useState } from "react";

const ContextData = React.createContext({
  userId: "",
  setUserId: () => {},
  template: [],
  setTemplate: () => {},
  widgetId: "",
  setWidgetId: () => {},
});

export const ContextDataProvider = (props) => {
  const [userId, setUserId] = useState("");
  const [template, setTemplate] = useState([]);
  const [widgetId, setWidgetId] = useState();

  return (
    <ContextData.Provider
      value={{
        userId,
        setUserId,
        template,
        setTemplate,
        widgetId,
        setWidgetId,
      }}
    >
      {props.children}
    </ContextData.Provider>
  );
};
export default ContextData;
