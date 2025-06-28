"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Download, Mail, Hash, AlertCircle, Loader2 } from "lucide-react";

export default function DownloadsList() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const response = await fetch("/api/download-marker");
        if (!response.ok) {
          throw new Error("Failed to fetch Link");
        }
        const data = await response.json();
        setDownloads(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloads();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-slate-600 font-medium">Loading Playlist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl border border-red-200 p-8 mx-4 max-w-md w-full">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <h3 className="text-lg font-semibold text-slate-900">Error</h3>
          </div>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Download className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Purchase</h1>
          </div>
          <p className="text-slate-600">
            Manage and track your purchase history
          </p>
          <div className="mt-4 text-sm text-slate-500">
            Total purchase:{" "}
            <span className="font-semibold text-blue-600">
              {downloads.length}
            </span>
          </div>
        </div>

        {/* Downloads Grid/List */}
        {downloads.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
            <Download className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No purchases yet
            </h3>
            <p className="text-slate-600">
              Your purchases will appear here once you start downloading.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-slate-900">
                        <div className="flex items-center space-x-2">
                          <Hash className="h-4 w-4" />
                          <span>ID</span>
                        </div>
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-slate-900">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>Email</span>
                        </div>
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-slate-900">
                        <div className="flex items-center space-x-2">
                          <Download className="h-4 w-4" />
                          <span>Purchase ID</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {downloads.map((download, index) => (
                      <tr
                        key={download.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-xs font-bold text-blue-600">
                                {index + 1}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-slate-400 mr-2" />
                            <span className="text-slate-900">
                              {download.email}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {download.presetId}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {downloads.map((download, index) => (
                <div
                  key={download.id}
                  className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">
                        {index + 1}
                      </span>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {download.presetId}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center text-sm text-slate-500 mb-1">
                        <Hash className="h-3 w-3 mr-1" />
                        ID
                      </div>
                      <div className="font-mono text-sm text-slate-900">
                        {download.id}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center text-sm text-slate-500 mb-1">
                        <Mail className="h-3 w-3 mr-1" />
                        Email
                      </div>
                      <div className="text-slate-900">{download.email}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
