const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');  // This should only appear once

const app = express();
const PORT = process.env.PORT || 3000;

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve static files (frontend) from the 'public' folder
app.use(express.static('public'));

// Endpoint to handle file uploads
app.post('/upload', upload.array('notes', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }
  res.redirect('/');
});

app.use('/uploads', express.static('uploads'));

// Endpoint to get the list of uploaded files
app.get('/notes', (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');

  if (!fs.existsSync(uploadsDir)) {
    console.error('Uploads directory does not exist.');
    return res.status(500).send('Uploads directory does not exist.');
  }

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error('Error reading uploads directory:', err);
      return res.status(500).send('Unable to scan files.');
    }

    res.json(files);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
