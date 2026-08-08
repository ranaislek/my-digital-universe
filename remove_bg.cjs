const fs = require('fs');
const { PNG } = require('pngjs');
const path = require('path');

function removeWhiteBg(inputFilename, outputFilename) {
  const inputPath = path.join(__dirname, 'public', inputFilename);
  const outputPath = path.join(__dirname, 'public', outputFilename);

  fs.createReadStream(inputPath)
    .pipe(new PNG({ filterType: 4 }))
    .on('parsed', function () {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const idx = (this.width * y + x) << 2;
          const r = this.data[idx];
          const g = this.data[idx + 1];
          const b = this.data[idx + 2];

          // Check if pixel is near-white (background)
          if (r > 220 && g > 220 && b > 220) {
            // Make transparent
            this.data[idx + 3] = 0;
          }
        }
      }
      this.pack().pipe(fs.createWriteStream(outputPath)).on('finish', () => {
        console.log(`Successfully created transparent PNG: ${outputFilename}`);
      });
    })
    .on('error', (err) => console.error(`Error processing ${inputFilename}:`, err));
}

removeWhiteBg('frog-queen-logo.png', 'frog-queen-transparent.png');
removeWhiteBg('rana-frog-logo.png', 'rana-frog-transparent.png');
