import { takeScreenshotTypes } from './types';

function takeScreenshot({ fs, screenshot }: takeScreenshotTypes): void {
  screenshot
    .all()
    .then((imgs: any[]) => {
      imgs.forEach((img: any, index: any) => {
        fs.writeFileSync(`img/${Date.now()}-${index}.png`, img);
      });
    })
    .catch((err: any) => {
      console.error(err);
    });
}

export { takeScreenshot }