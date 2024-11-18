import React, { useContext, useState } from 'react';

export const CanvasContext = React.createContext({
  data: {},
  setData: () => {},
});

export const CanvasContextProvider = (props) => {
  const setPageData = (pageData) => {
    setState({ ...state, data: pageData });
  };

  const initState = {
    data: {},
    setData: setPageData,
  };
  const [state, setState] = useState(initState);

  return <CanvasContext.Provider value={state}>{props.children}</CanvasContext.Provider>;
};

export const ForwardContext = ({ context, ...props }) => {
  const value = useContext(context || CanvasContext);
  return <CanvasContext.Provider value={value}>{props.children}</CanvasContext.Provider>;
};
