const express = require('express');
const mongoose = require('mongoose');
const Url = require('./models/Url');
const shortid = require('shortid');
const { nanoid } = require('nanoid'); 
const QRCode = require('qrcode');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());


//CONNECT MONGODB USING MONGOOSE
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to the URL Shortener backend.");   
});


//POST for /shorten
app.post('/shorten', async (req, res) => {
  try {
    const { longUrl, expiry, customId } = req.body; 

    if (!longUrl) {
      return res.status(400).json({ error: 'URL is required' }); 
    }

    //CUSTOM URL
    let shortId;

    if (customId) {
        const existing = await Url.findOne({ shortId: customId });

        if (existing) {
            return res.status(409).json({ error: 'Custom short URL is already taken' });
        }
        shortId = customId;

    } else {
        shortId = nanoid(8);
    }

    const shortUrl = `https://shortify-5jt3.onrender.com/${shortId}`; 
    const newUrl = new Url({
      longUrl,
      shortUrl,
      shortId,
      createdAt: new Date(),
      useCount: 0,
      expiry: expiry ? new Date(expiry) : null 
    }); 

    await newUrl.save(); 

    res.status(201).json({ shortUrl }); 

  } catch (error) {
    console.error('Error creating short URL:', error);
    res.status(500).json({ error: 'Server error' }); 
  }
});


//GET Request for Stats
app.get('/stats', async (req, res) => {
  try {
    const totalUrls = await Url.countDocuments();

    const result = await Url.aggregate([
      {
        $group: {
          _id: null,
          totalVisits: { $sum: "$useCount" }
        }
      }
    ]);

    const totalVisits = result.length > 0 ? result[0].totalVisits : 0;

    res.json({ totalUrls, totalVisits });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


//QR Code Generation GET Request
app.get('/qr/:shortId', async (req, res) => {
  const { shortId } = req.params;

  try {
    const entry = await Url.findOne({ shortId });

    if (!entry) {
      return res.status(404).json({ error: 'URL not found' });
    }

    const url = entry.shortUrl;

    // Generate QR code and stream it directly
    res.setHeader('Content-Type', 'image/png');
    QRCode.toFileStream(res, url);
  } catch (err) {
    console.error('QR Code generation failed:', err);
    res.status(500).json({ error: 'Failed to generate QR Code' });
  }
});


//Analytics GET Request
app.get('/analytics/:shortId', async (req, res) => {
  const { shortId } = req.params;

  try {
    const entry = await Url.findOne({ shortId });

    if (!entry) {
      return res.status(404).sendFile(__dirname + '/public/404.html');
    }

    res.status(200).json({
      shortId: shortId,
      longUrl: entry.longUrl,
      shortUrl: entry.shortUrl,
      useCount: entry.useCount,
      createdAt: entry.createdAt,
      expiry: entry.expiry
    });

  } catch (err) {
    console.error('Analytics error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET Request for redirection
app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;

  try {
    const entry = await Url.findOne({ shortId });

    if (entry) {
      if (entry.expiry && new Date() > entry.expiry) {
        return res.status(410).sendFile(__dirname + '/public/expired.html');
      }

      entry.useCount += 1;
      await entry.save();
      return res.redirect(entry.longUrl);

    } else {
      return res.status(404).sendFile(__dirname + '/public/404.html');
    }

  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
