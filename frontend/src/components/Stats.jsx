import React, { useEffect, useState } from "react";
import axios from "axios";

function Stats() {
  const [stats, setStats] = useState({ totalUrls: 0, totalVisits: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Could not load statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    const interval = setInterval(fetchStats, 24 * 60 * 60 * 1000); // Refresh daily
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-600 font-medium">Loading stats...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-medium">{error}</div>
    );
  }

  return (
    <div className="flex gap-6 flex-wrap justify-center">
      <div className="backdrop-blur-md bg-white/40 shadow-md p-6 rounded-2xl w-52 text-center">
        <h2 className="text-lg font-semibold text-gray-700">URLs Generated</h2>
        <p className="text-5xl font-bold text-blue-600">{stats.totalUrls}</p>
      </div>
      <div className="backdrop-blur-md bg-white/40 shadow-md p-6 rounded-2xl w-52 text-center">
        <h2 className="text-lg font-semibold text-gray-700">Total Visits</h2>
        <p className="text-5xl font-bold text-green-600">{stats.totalVisits}</p>
      </div>
    </div>
  );
}

export default Stats;
