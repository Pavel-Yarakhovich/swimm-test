import { useState, useEffect, useRef } from 'react';
/**
 *
 * @param {*} watchVariable: variable to wait for changes
 * @param {int} timeout
 * @returns return changes after timeout
 */
const useDefferedVariable = (watchVariable, timeout = 1000) => {
  const timeoudId = useRef();
  const [deferedVariable, setVariable] = useState(watchVariable);

  useEffect(() => {
    if (typeof deferedVariable === 'undefined') setVariable(watchVariable);
    timeoudId.current = setTimeout(() => {
      setVariable(watchVariable);
    }, timeout);

    return () => clearTimeout(timeoudId.current);
  }, [watchVariable, deferedVariable, timeout]);

  return deferedVariable;
};

export default useDefferedVariable;
