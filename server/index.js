const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const multer = require('multer')
const paths = require('path')
const cors = require('cors');

require('./dbconn/conn')
app.use(cors());
// app.use(
//   helmet({
//     crossOriginResourcePolicy: false
//   })
// );

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post');
const { MongoClient } = require('mongodb');


dotenv.config({ path: './config.env' });

app.use("/images", express.static(paths.join(__dirname, "/public/images")));

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

const storage = multer.memoryStorage();
const upload = multer({ storage });
const mongourl = 'mongodb+srv://jubul577:partha123@socialdb.7geyn06.mongodb.net/social?retryWrites=true&w=majority';

let client;
async function connectToDatabase() {
    try {
        client = await MongoClient.connect(mongourl);
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
}


app.use(async (req, res, next) => {
    if (!client) {
        await connectToDatabase();
    }
    next();
});


app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/post', postRoute)


app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        const db = client.db('socialimage');

        const { GridFSBucket } = require('mongodb');
        const bucket = new GridFSBucket(db);

        const uploadStream = bucket.openUploadStream(req.file.originalname);
        uploadStream.end(req.file.buffer);

        res.send('File uploaded successfully!');
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/image/:filename', async (req, res) => {
    try {

        const db = client.db('socialimage');
        const { GridFSBucket } = require('mongodb');
        const bucket = new GridFSBucket(db);


        const downloadStream = bucket.openDownloadStreamByName(req.params.filename);
        const fileExtension = req.params.filename.split('.').pop().toLowerCase();
        let contentType;
        if (fileExtension === 'jpeg' || fileExtension === 'jpg') {
            contentType = 'image/jpeg';
        } else if (fileExtension === 'png') {
            contentType = 'image/png';
        }
        res.set('Content-Type', contentType);

        downloadStream.pipe(res);
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).send('Internal Server Error');
    }
});

// app.post('/api/upload', upload.single('file'), (req, res) => {
//     try {
//         return res.status(200).json('file uploaded successfully')
//     } catch (err) {
//         console.log(err)
//     }
// })



app.listen(5000, () => {
    console.log('backend server is running')
})
