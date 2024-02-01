import * as fs from 'fs';
import screenshotDesktop = require('screenshot-desktop');

type handleKeyPressType = {
  key: string,
  isKeyUp: boolean,
  fs: typeof fs,
  screenshot: typeof screenshotDesktop
}

type takeScreenshotTypes = {
  fs: typeof fs,
  screenshot: typeof screenshotDesktop
}

export { handleKeyPressType, takeScreenshotTypes };
