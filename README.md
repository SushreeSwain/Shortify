# 🔗 URL Shortener

This is a simple and functional URL Shortener built with **Node.js**, **Express**, **React**, **Axios**, **Tailwindcss** and **MongoDB**.

You can use it to shorten long links, track how many times they were visited, set expiry dates, and even generate QR codes for easy sharing!

---

## 🚀 Features

### ✅ Shorten URLs
- Paste a long URL and get a short one like `http://localhost:5000/abc123`.

### 🆔 Custom Short Links
- Want a custom name? You can set your own short link like `/myawesomeurl`.

### ⏳ Expiry Dates
- Add an expiry date while shortening the URL.
- Once expired, the link shows an "expired" page.

### 🔁 Redirection
- Clicking on the short URL automatically redirects to the original site.

### 📈 Analytics
- Check global stats like total URLs and total visits.
- See full info for each short link (original URL, visits, expiry, etc).

### 📷 QR Code Generator
- Generate a QR code for your short URL using a simple link like `/qr/:shortId`.
- It shows up directly in Postman or browser (PNG image).
- No saving needed, just download and share!

---

## 📦 Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- Nanoid (for short link generation)
- QRCode (for creating QR codes)
- React.js + Axios
- Tailwindcss + HTML
- Tools Used : Postman + MongoDB Compass

---

## 📮 How to Use

1. Clone the project
2. Run `npm install`
3. Start MongoDB (locally)
4. Run `node index.js`
5. Use **Postman** to test endpoints like:

| Method | Endpoint            | Description                      |
|--------|---------------------|----------------------------------|
| POST   | `/shorten`          | Create a new short URL           |
| GET    | `/qr/:shortId`      | Get QR code for the short link   |
| GET    | `/analytics/:id`    | See info about a specific link   |
| GET    | `/stats`            | See total links and visits       |
| GET    | `/:shortId`         | Redirect to the original URL     |

---

## 📌 Notes

- This app does **not** save QR codes, it just shows them when needed.
- No login or signup is required.
- You can add features like user accounts later if you want.

---

## 🧠 Future Ideas (Optional)

- User login + personal dashboard
- Option to delete or edit links
- Device/browser tracking
- Custom domains

---

Made with ❤️ using Node.js

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).


# Node.js + Project Setup Guide (for future me 👩‍💻)

This guide documents the basic project setup for any Node.js-based app like a URL shortener, so I can repeat this easily in the future.


## 🛠️ Prerequisites

- Windows OS
- VS Code installed
- Git installed (optional but useful)
- MongoDB installed (local or Atlas)
- Internet connection


## 🔧 Step-by-Step Setup

```bash
# Create folder
cd Desktop
mkdir url-shortener
cd url-shortener

# Initialize project
npm init -y

# Install core packages
npm install express mongoose nanoid dotenv

# Create folder structure
mkdir models
type nul > server.js
type nul > .env
type nul > models\Url.js

# Open in VS Code
code .


## 🔒 What is Localhost?

When I access `http://localhost:5000`, it's only on my own machine.

- `localhost` = 127.0.0.1 (loopback IP)
- Port `5000` = door to my server

