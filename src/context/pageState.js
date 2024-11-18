import React, { useContext, useState } from 'react';

export const PageContext = React.createContext({
  data: {},
  setData: () => {},
});

export const PageContextProvider = (props) => {
  const setPageData = (pageData) => {
    setState((state) => ({ ...state, data: { ...state.data, ...pageData } }));
  };

  const initState = {
    data: {
      speed: 0.2,
      introFinished: false,
      themeColor: '#888f66',
      videoState: null,
    },
    setData: setPageData,
  };
  const [state, setState] = useState(initState);

  return <PageContext.Provider value={state}>{props.children}</PageContext.Provider>;
};

export const ForwardContext = ({ context, ...props }) => {
  const value = useContext(context || PageContext);
  return <PageContext.Provider value={value}>{props.children}</PageContext.Provider>;
};
