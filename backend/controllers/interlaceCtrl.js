const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const {
    loadImagesFromDirectory,
    scaleImages,
    ensureSameSize,
    calculatePixelsPerLenticularLens,
    interlaceImages,
  } = require('./interlace');

exports.interlace = async (req, res) => {
    console.log('interlace_info ===>', req.body, req.file);
    try {
        const { directory, output, lpi, dpi, phase, width, height, units } = req.body;

        // Load images
        let images = await loadImagesFromDirectory(directory);

        // Optional scaling
        if (width || height) {
            images = await scaleImages(images, width, height, units, dpi);
        }

        const { width: imgWidth, height: imgHeight } = ensureSameSize(images);
        const pixelsPerLenticularLens = calculatePixelsPerLenticularLens(dpi, lpi);

        if (!(0.0 <= phase && phase < 1.0)) {
            return res.status(400).send('Phase shift must be between 0.0 and 1.0.');
        }

        await interlaceImages(images, pixelsPerLenticularLens, output, phase, dpi);

        res.status(200).send({ message: 'Interlaced image generated successfully.', output });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
}