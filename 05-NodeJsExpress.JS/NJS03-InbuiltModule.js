



const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'example.txt');
const dirPath = path.join(__dirname, 'test-dir');

// ========== 1. Read File ==========
fs.writeFileSync(filePath, 'Initial content for reading');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) console.error('Async Read Error:', err);
  else console.log('[1] Async Read:', data);
});

try {
  const data = fs.readFileSync(filePath, 'utf8');
  console.log('[1] Sync Read:', data);
} catch (err) {
  console.error('Sync Read Error:', err);
}

// ========== 2. Write File ==========
fs.writeFile(filePath, 'Hello, Node.js!', (err) => {
  if (err) console.error('Async Write Error:', err);
  else console.log('[2] Async Write done');
});

try {
  fs.writeFileSync(filePath, 'Hello from Sync!');
  console.log('[2] Sync Write done');
} catch (err) {
  console.error('Sync Write Error:', err);
}

// ========== 3. Append File ==========
fs.appendFile(filePath, '\nAppended asynchronously.', (err) => {
  if (err) console.error('Async Append Error:', err);
  else console.log('[3] Async Append done');
});

try {
  fs.appendFileSync(filePath, '\nAppended synchronously.');
  console.log('[3] Sync Append done');
} catch (err) {
  console.error('Sync Append Error:', err);
}

// ========== 4. Check File Exists ==========
if (fs.existsSync(filePath)) {
  console.log('[4] File exists');
} else {
  console.log('[4] File does not exist');
}

// ========== 5. Create Directory ==========
fs.mkdir(dirPath, { recursive: true }, (err) => {
  if (err) console.error('Async Mkdir Error:', err);
  else console.log('[5] Async Directory created');
});

try {
  fs.mkdirSync(dirPath, { recursive: true });
  console.log('[5] Sync Directory created');
} catch (err) {
  console.error('Sync Mkdir Error:', err);
}

// ========== 6. Read Directory ==========
fs.readdir('.', (err, files) => {
  if (err) console.error('Async ReadDir Error:', err);
  else console.log('[6] Async Dir Content:', files);
});

try {
  const files = fs.readdirSync('.');
  console.log('[6] Sync Dir Content:', files);
} catch (err) {
  console.error('Sync ReadDir Error:', err);
}

// ========== 7. Delete File ==========
fs.unlink(filePath, (err) => {
  if (err) console.error('Async Delete Error:', err);
  else console.log('[7] Async File deleted');
});

try {
  fs.unlinkSync(filePath);
  console.log('[7] Sync File deleted');
} catch (err) {
  console.error('Sync Delete Error:', err);
}





