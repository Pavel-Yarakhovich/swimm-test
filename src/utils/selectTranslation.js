export function selectTranslation(array, lang) {
  // find language object
  let languageObj = Array.isArray(array)
    ? array.find((obj) => {
        return obj?.languages_code.code === lang;
      })
    : undefined;

  // If no matrching language is found => return first object
  if (typeof languageObj === 'undefined' && Array.isArray(array)) languageObj = array[0];

  return languageObj;
}
