

const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

// File paths
const inputFile = path.join(__dirname, 'input.txt');
const outputFile = path.join(__dirname, 'output.txt');
const compressedFile = path.join(__dirname, 'output.txt.gz');

// Write a big dummy file to work with
fs.writeFileSync(inputFile, 'Hello Node.js Streams!\n'.repeat(100));

// ========== 1. Readable Stream ==========
const readStream = fs.createReadStream(inputFile, { encoding: 'utf8' });

readStream.on('data', chunk => {
  console.log('[1] Reading chunk:', chunk.length);
});

readStream.on('end', () => {
  console.log('[1] Done reading file.');
});

// ========== 2. Writable Stream ==========
const writeStream = fs.createWriteStream(outputFile);

writeStream.write('This is line 1\n');
writeStream.write('This is line 2\n');
writeStream.end('[2] Writing done.\n');

writeStream.on('finish', () => {
  console.log('[2] Finished writing file.');
});

// ========== 3. Pipe Stream (Read -> Write) ==========
const pipeInput = fs.createReadStream(inputFile);
const pipeOutput = fs.createWriteStream(outputFile);

pipeInput.pipe(pipeOutput);

pipeOutput.on('finish', () => {
  console.log('[3] Pipe complete (copied input to output).');
});

// ========== 4. Transform Stream (Compression) ==========
const gzip = zlib.createGzip();

const compressStream = fs.createReadStream(inputFile)
  .pipe(gzip)
  .pipe(fs.createWriteStream(compressedFile));

compressStream.on('finish', () => {
  console.log('[4] File compressed to output.txt.gz');
});


