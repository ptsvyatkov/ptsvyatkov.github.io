const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Place = require('./models/Place');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const Booking = require('./models/Booking');



require('dotenv').config();
const app = express();

const BCRYPT_SALT = bcrypt.genSaltSync(10);
const JWT_SECRET = 'jwtsecrettest333';

app.use(express.json());
app.use(cookieParser());
app.use(express.static((__dirname + '/uploads')))
app.use(cors({
    credentials: true,
    origin: 'https://tourjourney.vercel.app'
}));

mongoose.connect(process.env.MONGO_URL);

// the returned value will be a Promise
function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, JWT_SECRET, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    }).catch(err => {
        err.status = 401;
        err.message = 'Invalid token';
    });
}

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, BCRYPT_SALT)
        });

        res.json(user);
    } catch (error) {
        res.status(422).json(error);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const isMatch = bcrypt.compareSync(password, userDoc.password);
        if (isMatch) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id
            }, JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { sameSite: 'none', secure: true }).json(userDoc);
            });
        } else {
            res.status(422).json('Password not matched');
        }
    } else {
        res.status(401).json({
            message: "Login unsuccessful",
            error: "User not found",
        });
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, JWT_SECRET, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null)
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '', { sameSite: 'none'}).json(true);
});

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    console.log(req.body);
    console.log(link);
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: "https://apitourjourney.onrender.com",
        dest: "/uploads/" + newName
    }).catch((err) => console.error(err));;
    
    res.json(newName);
});

const photosMiddleware = multer({ dest: 'uploads/' });
// the first parameter in photosMiddleware.array is photos, because
// in our Frontend, in PlacesPage, in uploadPhoto function, the
// data is set as 'photos'
app.post('/upload', photosMiddleware.array('photos', 50), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        console.log(newPath);
        fs.renameSync(path, newPath);
        console.log(newPath);
        uploadedFiles.push(newPath.replace('/uploads', ''));
    }
    res.json(uploadedFiles);
});

// API Endpoint to create a new place
app.post('/places', (req, res) => {
    const { token } = req.cookies;

    const {
        title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
    } = req.body;

    jwt.verify(token, JWT_SECRET, {}, async (err, userData) => {
        if (err) throw err;
        // create the place document
        const placeDoc = await Place.create({
            // userData comes from the decrypted cookie in verify above, 
            // we can access the currently logged in user id
            owner: userData.id,
            title, address, photos: addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        });
        res.json(placeDoc);
    });
});

// API Endpoint to get all places of a selected user
// Ensures that the places are inside our state on the Frontend
app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
    // userData is the decrypted token
    jwt.verify(token, JWT_SECRET, {}, async (err, userData) => {
        const { id } = userData;
        // We want to find where the owner matches the owner id
        res.json(await Place.find({ owner: id }));
    });
});

// retrieve information about a specific place
app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
});

app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    // id is the id of the place to update
    const {
        id, title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
    } = req.body;

    // verify token, userData has the id of the user
    jwt.verify(token, JWT_SECRET, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        // check if the placeDoc owner is the same as the id of the currently logged user
        // placeDoc.owner is an object id and has to be converted to String
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            })
            await placeDoc.save();
            res.json('ok');
        }
    });
});

app.get('/places', async (req, res) => {
    res.json(await Place.find());
});

app.post('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);

    const { user, place, checkIn, checkOut,
        numberOfGuests, name, phone, price } = req.body; // all the information is sent with axios in the frontend
    Booking.create({
        place, checkIn, checkOut,
        numberOfGuests, name, phone, price,
        user: userData.id
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    });
});

//user bookings are private -> need token verification
app.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    // in the POST /login endpoint, we sign the jwt token with id
    res.json(await Booking.find({ user: userData.id }).populate('place'));
});


app.get('/addresses', async (req, res) => {
    const q = req.query.q;
    if (q) {
        const addresses = await Place.find({ address: { $regex: q, $options: 'i' } });
        res.json(addresses);
    } else {
        const allAddresses = await Place.find();
        res.json(allAddresses)
    };
});

if (process.env.API_PORT) {
    app.listen(process.env.API_PORT);
}

module.exports = app;