import { writeToFileAndClearBufferType } from './types';

function writeToFileAndClearBuffer({ textBuffer, formatDate, formatTime, fs }: writeToFileAndClearBufferType): string {
  console.log('ai dentro')
  if (textBuffer) {
    fs.appendFileSync('data.txt', textBuffer);
    return '';
  }
  return '';
}

export { writeToFileAndClearBuffer }
