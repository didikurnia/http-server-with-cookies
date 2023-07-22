const express = require('express');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Use cookie-parser middleware
app.use(cookieParser());
// Base path images directory
const newDirPath = path.join(__dirname, 'images');

// Set up Multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Create images directory if not exists
        createDirIfNotExists(newDirPath);
        cb(null, './images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

// In-memory database for storing objects
let objects = [];
let latestRequestedId = null;

// POST endpoint to create a new JSON object
app.post('/create', async (req, res) => {
    const { name, image } = req.body;
    const id = Date.now().toString(); // Unique ID based on timestamp

    objects.push({ id, name, image, state: 'pending' });

    // Execute the asynchronous routine
    setTimeout(() => {
        const object = objects.find((obj) => obj.id === id);
        if (object) {
            object.state = 'completed';
        }
    }, 5000);

    res.json({ id });
});

// GET endpoint to retrieve an object by ID
app.get('/get/:id', (req, res) => {
    const { id } = req.params;
    const object = objects.find((obj) => obj.id === id);

    if (object) {
        res.json(object);
    } else {
        res.status(404).json({ error: 'Object not found' });
    }
});

// POST endpoint to upload images
app.post('/upload', upload.single('image'), (req, res) => {
    res.json({message: 'Image uploaded successfully'});
});

// GET endpoint to represent all created objects or a single object by ID
app.get('/show', (req, res) => {
    const { id } = req.query;

    if (id) {
        const object = objects.find((obj) => obj.id === id);
        if (object) {
            // Set the latest requested ID as a cookie
            res.cookie('latestRequestedId', id);
            res.render('show_single', { object });
        } else {
            res.status(404).json({ error: 'Object not found' });
        }
    } else {
        // Set 'all' as the latest requested ID if no ID is provided
        res.cookie('latestRequestedId', 'all');
        res.render('show_all', { objects });
    }
});

// GET endpoint to represent all created objects or a single object by ID
app.get('/show2', (req, res) => {
    const { id } = req.query;

    if (id) {
        const object = objects.find((obj) => obj.id === id);
        if (object) {
            latestRequestedId = id;
            res.render('show_single', { object });
        } else {
            res.status(404).json({ error: 'Object not found' });
        }
    } else {
        latestRequestedId = 'all';
        res.render('show_all', { objects });
    }
});

// Middleware to set the cookie with the latest requested ID
app.use((req, res, next) => {
    res.cookie('latestRequestedId', latestRequestedId || 'all');
    next();
});

// Set up the views directory and template engine (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// function create if not exists directory
function createDirIfNotExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Directory "${dirPath}" created successfully.`);
    } else {
        console.log(`Directory "${dirPath}" already exists.`);
    }
}
