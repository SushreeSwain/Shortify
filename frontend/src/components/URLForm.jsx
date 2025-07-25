import React, { useState } from "react";
import axios from "axios";

function URLForm() {
  const [longUrl, setLongUrl] = useState("");
  const [expiry, setExpiry] = useState("");
  const [customId, setCustomId] = useState("");

  const [shortUrl, setShortUrl] = useState("");
  const [shortId, setShortId] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");
    setShortId("");
    setQrCodeUrl("");
    setCopySuccess("");

    try {
      const res = await axios.post("http://localhost:5000/shorten", {
        longUrl,
        expiry,
        customId: customId || undefined,
      });

      setShortUrl(res.data.shortUrl);
      const parts = res.data.shortUrl.split("/");
      setShortId(parts[parts.length - 1]);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopySuccess("Copied!");
    setTimeout(() => setCopySuccess(""), 1500);
  };

  const handleGenerateQR = () => {
    if (!shortId) {
      setError("Please generate a short URL first");
      return;
    }

    setQrCodeUrl(`http://localhost:5000/qr/${shortId}`);
  };

  const handleDownloadQR = () => {
    const img = document.getElementById("qr-image");
    if (!img) return;

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const link = document.createElement("a");
    link.download = `shortify_qr_${shortId}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-3xl shadow-lg mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Shorten your URL</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Custom URL (optional)"
          value={customId}
          onChange={(e) => setCustomId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-900 transition"
        >
          {loading ? "Generating..." : "Generate Short URL"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

      {shortUrl && (
        <div className="mt-6 text-center">
          <p className="text-gray-700 font-medium">Your short URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 break-words hover:underline"
          >
            {shortUrl}
          </a>

          <div className="mt-2 flex justify-center space-x-4">
            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700"
            >
              📋 Copy
            </button>

            <button
              onClick={handleGenerateQR}
              className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-800"
            >
              📱 Generate QR Code
            </button>
          </div>

          {copySuccess && <p className="text-green-600 mt-2">{copySuccess}</p>}
        </div>
      )}

      {qrCodeUrl && (
        <div className="mt-6 text-center">
          <p className="text-gray-700 font-medium mb-2">QR Code:</p>
          <img
            src={qrCodeUrl}
            alt="QR Code"
            id="qr-image"
            crossOrigin="anonymous"
            className="mx-auto w-40 h-40 border p-1 rounded"
          />
          <button
            onClick={handleDownloadQR}
            className="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            ⬇️ Download QR
          </button>
        </div>
      )}
    </div>
  );
}

export default URLForm;
