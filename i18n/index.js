/* istanbul ignore file */
import { flatten } from 'flat';

import en from './en';
import de from './de';

const messages = {
  de: flatten(de),
  en: flatten(en),
};

export default messages;
