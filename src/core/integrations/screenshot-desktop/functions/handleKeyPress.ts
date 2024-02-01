import { takeScreenshot } from './takeScreenshot';
import { handleKeyPressType } from './types';

function handleKeyPress({ key, isKeyUp, fs, screenshot }: handleKeyPressType): void {
  if (!isKeyUp && (key === 'Enter' || key === 'Backspace' || key === 'Tab')) {
    takeScreenshot({ fs, screenshot });
  }
}

export { handleKeyPress }