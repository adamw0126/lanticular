const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const argparse = require('argparse'); // Optional if CLI argument parsing is not needed.

async function loadImagesFromDirectory(directory) {
    if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) {
        throw new Error(`Directory not found: ${directory}`);
    }
    const imageFiles = fs.readdirSync(directory)
        .filter(f => /\.(png|jpg|jpeg|bmp|tiff|gif)$/i.test(f))
        .sort()
        .map(f => path.join(directory, f));
    if (imageFiles.length === 0) {
        throw new Error(`No image files found in directory: ${directory}`);
    }
    return Promise.all(imageFiles.map(imagePath => sharp(imagePath).toBuffer({ resolveWithObject: true })));
}

async function scaleImages(images, width, height, units, dpi) {
    if (units === 'inches') {
        if (width) width = width * dpi;
        if (height) height = height * dpi;
    }

    if (width && !height) {
        const aspectRatio = images[0].info.height / images[0].info.width;
        height = width * aspectRatio;
    } else if (height && !width) {
        const aspectRatio = images[0].info.width / images[0].info.height;
        width = height * aspectRatio;
    }

    width = width ? Math.floor(width) : null;
    height = height ? Math.floor(height) : null;

    console.log('width, height', width, height)

    return Promise.all(images.map(img =>
        sharp(img.data).resize(width, height, { fit: 'fill' }).toBuffer({ resolveWithObject: true })
    ));
}

function ensureSameSize(images) {
    const baseSize = { width: images[0].info.width, height: images[0].info.height };
    for (const img of images) {
        if (img.info.width !== baseSize.width || img.info.height !== baseSize.height) {
            throw new Error('All images must be the same size.');
        }
    }
    console.log('baseSize ===>', baseSize)
    return baseSize;
}

function calculatePixelsPerLenticularLens(dpi, lpi) {
    console.log('dpi / lpi ===>', dpi / lpi)
    return dpi / lpi;
}

async function interlaceImages(images, pixelsPerLenticularLens, outputPath, phaseShift, dpi) {
    const numImages = images.length;
    console.log('images[0] ===>', images[0])
    const { width, height } = images[0].info;
    const outputImage = sharp({
        create: {
            width: width,
            height: height,
            channels: 3,
            background: { r: 0, g: 0, b: 0 }
        }
    });

    const phaseShiftPixels = (phaseShift % 1.0) * pixelsPerLenticularLens;

    const compositeOperations = [];

    for (let x = 0; x < width; x++) {
        const posInLenticule = (x % pixelsPerLenticularLens) + phaseShiftPixels;
        let imageIndex = Math.floor((posInLenticule * numImages) / pixelsPerLenticularLens);
        imageIndex = Math.min(imageIndex, numImages - 1);

        compositeOperations.push({
            input: images[imageIndex].data,
            left: x,
            top: 0,
            raw: {
                width: 1,
                height: height,
                channels: 3
            }
        });
    }
    // console.log('outputImage ===>', outputImage)
    await outputImage
        .composite(compositeOperations)
        .png({ compressionLevel: 9 })
        .withMetadata({ density: dpi })
        .toFile(outputPath);
}

module.exports = {
    loadImagesFromDirectory,
    scaleImages,
    ensureSameSize,
    calculatePixelsPerLenticularLens,
    interlaceImages
};
