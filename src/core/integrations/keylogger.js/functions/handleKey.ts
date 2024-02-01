import { handleKeyType } from './types';

function handleKey({ textBuffer, key, isKeyUp, activeModifiers, SHIFT_KEY_MAP, SPECIAL_KEYS }: handleKeyType): string {
  if (['Shift', 'Alt', 'Meta', 'Control'].includes(key)) {
    isKeyUp ? activeModifiers.delete(key) : activeModifiers.add(key);
    return ''
  } else if (!isKeyUp) {
    let outputKey = key.toUpperCase() === 'SPACEBAR' ? ' ' : key;

    if (key === 'BACKSPACE') {
      return textBuffer.slice(0, -1);
    } else if (key === 'ENTER') {
      return textBuffer += '<ENTER>';
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

      return textBuffer += (textBuffer.slice(-1) !== ' ' && outputKey.length > 1 ? ' ' : '') + outputKey;
    }
  }
  return ''
}

export { handleKey }