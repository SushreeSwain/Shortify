import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Analytics() {
  const { shortId: paramShortId } = useParams();
  const navigate = useNavigate();

  const [shortId, setShortId] = useState(paramShortId || "");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAnalytics = async (id) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`http://localhost:5000/analytics/${shortId}`);
      setData(res.data);
    } catch (err) {
      console.error("Analytics fetch error:", err);
      setError("Could not load analytics. This short URL might not exist.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch analytics when the route param changes
  useEffect(() => {
    if (paramShortId) {
      setShortId(paramShortId); // sync local input
      fetchAnalytics(paramShortId);
    }
  }, [paramShortId]);

  // Also fetch immediately when user submits
  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = shortId.trim();
    if (!trimmed) return;

    if (trimmed !== paramShortId) {
      navigate(`/analytics/${trimmed}`);
    } else {
      fetchAnalytics(trimmed); // stay on page but re-fetch if same
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">📊 URL Analytics</h2>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          value={shortId}
          onChange={(e) => setShortId(e.target.value)}
          placeholder="Enter Short ID"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          View Analytics
        </button>
      </form>

      {/* Back to home button */}
      <div className="text-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:underline"
        >
          ← Back to Home
        </button>
      </div>

      {/* Error / Loading / Data display */}
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {data && !loading && !error && (
        <div className="space-y-3 text-gray-700">
          <div>
            <span className="font-semibold">Short ID:</span> {data.shortId}
          </div>
          <div>
            <span className="font-semibold">Original URL:</span>{" "}
            <a
              href={data.longUrl}
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.longUrl}
            </a>
          </div>
          <div>
            <span className="font-semibold">Short URL:</span>{" "}
            <a
              href={data.shortUrl}
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.shortUrl}
            </a>
          </div>
          <div>
            <span className="font-semibold">Total Visits:</span> {data.useCount}
          </div>
          <div>
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(data.createdAt).toLocaleString()}
          </div>
          <div>
            <span className="font-semibold">Expiry:</span>{" "}
            {data.expiry ? new Date(data.expiry).toLocaleDateString() : "No expiry"}
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
