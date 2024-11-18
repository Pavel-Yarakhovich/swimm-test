import { useState, useEffect } from 'react'; // Pick Camera or a parent Object of the camera By Name

export function useLangData(language, data) {
  const [currentLangData, setCurrentLangData] = useState();

  useEffect(() => {
    if (!data) return;
    if (Array.isArray(data)) {
      let langData = data.find((ld) => ld.node.ns === 'common' && ld.node.language === language)?.node?.data;

      if (langData) {
        setCurrentLangData(JSON.parse(langData));
      }
    } else {
      setCurrentLangData(data[language]?.common);
    }
  }, [language, data]);

  return currentLangData;
}
