import { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    protocol_type: 'tcp',
    service: 'http',
    flag: 'SF',
    src_bytes: 0,
    dst_bytes: 0,
    count: 0,
    srv_count: 0,
    num_failed_logins: 0,
    su_attempted: 0,
    is_guest_login: 0,
    num_compromised: 0,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while connecting to the backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center py-10 px-4">
      {/* Background decoration */}
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="z-10 w-full max-w-4xl tracking-tight">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Hybrid Explainable IDS
        </h1>
        <p className="text-center text-slate-400 mb-10 max-w-2xl mx-auto">
          Intrusion Detection System combining robust Rule-Based logic with an advanced Random Forest Machine Learning model for precise and explainable cyber-threat detection.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="glass rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-blue-500/20 text-blue-400 p-2 rounded-lg text-sm">🛡️</span>
              Input Parameters
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Categorical */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-slate-400 uppercase mb-1">Protocol Type</label>
                  <select name="protocol_type" value={formData.protocol_type} onChange={handleChange} className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 outline-none focus:border-blue-500 transition-colors">
                    <option value="tcp">tcp</option>
                    <option value="udp">udp</option>
                    <option value="icmp">icmp</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-slate-400 uppercase mb-1">Service</label>
                  <select name="service" value={formData.service} onChange={handleChange} className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 outline-none focus:border-blue-500 transition-colors">
                    <option value="http">http</option>
                    <option value="ftp_data">ftp_data</option>
                    <option value="private">private</option>
                    <option value="smtp">smtp</option>
                    <option value="other">other</option>
                  </select>
                </div>
                {/* Numerical */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-slate-400 uppercase mb-1">Src Bytes</label>
                  <input type="number" name="src_bytes" value={formData.src_bytes} onChange={handleChange} className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 outline-none focus:border-blue-500 transition-colors placeholder-slate-600" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-slate-400 uppercase mb-1">Dst Bytes</label>
                  <input type="number" name="dst_bytes" value={formData.dst_bytes} onChange={handleChange} className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-slate-400 uppercase mb-1">Failed Logins</label>
                  <input type="number" name="num_failed_logins" value={formData.num_failed_logins} onChange={handleChange} className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-slate-400 uppercase mb-1">SU Attempted (0/1)</label>
                  <input type="number" name="su_attempted" value={formData.su_attempted} onChange={handleChange} min="0" max="1" className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-slate-400 uppercase mb-1">Network Count</label>
                  <input type="number" name="count" value={formData.count} onChange={handleChange} className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-slate-400 uppercase mb-1">Srv Count</label>
                  <input type="number" name="srv_count" value={formData.srv_count} onChange={handleChange} className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? 'Analyzing Traffic...' : 'Analyze Traffic Network'}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="flex flex-col gap-6">
            <div className="glass rounded-2xl p-6 shadow-xl relative min-h-[300px] flex flex-col justify-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              
              {!result && !error && !loading && (
                <div className="text-center text-slate-500">
                  <div className="text-5xl mb-4 opacity-50">📡</div>
                  <p>Awaiting network data analysis...</p>
                  <p className="text-xs mt-2 opacity-70">Enter variables and click Analyze</p>
                </div>
              )}

              {loading && (
                <div className="text-center animate-pulse">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-blue-400 font-medium">Processing through Hybrid Engine...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl">
                  <p className="font-bold">Error Processing Data</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              )}

              {result && !loading && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                  {/* Main Prediction Banner */}
                  <div className={`p-5 rounded-xl border flex flex-col items-center justify-center text-center ${result.prediction === 'Attack' ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
                    <span className="text-xs font-bold uppercase tracking-wider mb-2 opacity-70">Detection Status</span>
                    <h3 className={`text-4xl font-extrabold ${result.prediction === 'Attack' ? 'text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.5)]' : 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]'}`}>
                      {result.prediction.toUpperCase()}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                      <p className="text-xs text-slate-400 uppercase tracking-wide">Confidence</p>
                      <p className="text-2xl font-bold mt-1 text-white">{(result.confidence * 100).toFixed(1)}%</p>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-blue-500/5"></div>
                      <p className="text-xs text-blue-400 uppercase tracking-wide relative z-10">Decision Engine</p>
                      <p className="text-xl font-bold mt-1 text-white relative z-10">{result.source}</p>
                    </div>
                  </div>

                  {/* Explainability Section */}
                  <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700">
                    <h4 className="flex items-center gap-2 font-bold mb-3 text-slate-200">
                      <span className="text-purple-400">🧠</span> Explanation Layer (XAI)
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {result.explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Architecture Info Card */}
            <div className="glass rounded-xl p-5 text-sm">
              <h4 className="font-semibold text-slate-300 mb-2 flex items-center gap-2">
                <span className="text-indigo-400">⚡</span> Live Detection Pipeline
              </h4>
              <div className="flex items-center gap-2 text-slate-400 mt-3 font-mono text-xs overflow-x-auto whitespace-nowrap pb-2">
                <span className="bg-slate-900 px-2 py-1 rounded border border-slate-700">User Input</span>
                <span>→</span>
                <span className="bg-slate-900 px-2 py-1 rounded border border-slate-700">Rule Engine</span>
                <span>→</span>
                <span className="bg-slate-900 px-2 py-1 rounded border border-slate-700 text-purple-400 border-purple-500/30">ML Model</span>
                <span>→</span>
                <span className="bg-emerald-900/30 px-2 py-1 rounded border border-emerald-500/30 text-emerald-400">Prediction</span>
              </div>
            </div>
          </div>
        </div>
        
        <footer className="mt-12 text-center text-slate-500 text-sm">
          NSL-KDD Hybrid Explainable IDS Project • Master Pipeline Demo
        </footer>
      </div>
    </div>
  );
}

export default App;
