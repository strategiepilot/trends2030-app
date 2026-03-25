import Jimp from 'jimp';

async function removeWhiteBg(imgPath) {
  try {
    const image = await Jimp.read(imgPath);
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      // if almost white, make transparent
      if (red > 230 && green > 230 && blue > 230) {
        this.bitmap.data[idx + 3] = 0;
      }
    });
    await image.writeAsync(imgPath);
    console.log('Processed', imgPath);
  } catch (err) {
    console.error(err);
  }
}

async function run() {
  await removeWhiteBg('public/Visuals/logo-icon-bc.png');
  await removeWhiteBg('public/Visuals/logo-icon-sli.png');
  console.log('Done mapping transparency.');
}

run();
