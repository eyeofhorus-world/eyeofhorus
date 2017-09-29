
import WordsToText from './words-to-text';

export default (providers) => {
  const wordsToText = new WordsToText(providers.relevance);

  return ({
    wordsToText,
  });
};
