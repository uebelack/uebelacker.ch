/* istanbul ignore file */
import flat from 'flat';

import en from './en';
import de from './de';

const messages = {
  de: flat(de),
  en: flat(en),
};

export default messages;
