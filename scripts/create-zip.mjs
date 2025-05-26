import archiver from 'archiver';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create upload directory if it doesn't exist
const distDir = path.join(__dirname, '..', 'dist');
const uploadDir = path.join(__dirname, '..', 'upload');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Delete existing zip file if it exists
const zipPath = path.join(uploadDir, 'sonejifamily-dist.zip');
if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
    console.log('Deleted existing zip file');
}

// Create a write stream for our zip file
const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', () => {
    console.log(`Archive created successfully. Total bytes: ${archive.pointer()}`);
});

// Handle warnings and errors
archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
        console.warn(err);
    } else {
        throw err;
    }
});

archive.on('error', (err) => {
    throw err;
});

// Pipe archive data to the output file
archive.pipe(output);

// Add the contents of the dist directory to the zip
archive.directory(path.join(__dirname, '..', 'dist'), false);

// Finalize the archive
archive.finalize();
