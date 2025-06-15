// hooks/usePresetPacks.js
import { useState, useEffect } from "react";

export const usePresetPacks = () => {
  const [presetPacks, setPresetPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPresetPacks();
  }, []);

  const fetchPresetPacks = async () => {
    try {
      const response = await fetch("/api/preset-packs");
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setPresetPacks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { presetPacks, loading, error, refetch: fetchPresetPacks };
};
