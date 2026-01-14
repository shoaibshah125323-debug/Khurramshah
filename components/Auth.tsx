
import React, { useState } from 'react';

interface Props {
  onLogin: (username: string, password: string) => void;
}

const Auth: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      onLogin(username, password);
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div className="min-h-screen bg-[#07070e] flex flex-col items-center justify-center p-6 text-white">
      <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-pink-500 to-indigo-600 mb-8 flex items-center justify-center text-5xl font-black shadow-2xl shadow-pink-500/20">W</div>
      
      <div className="glass w-full max-w-md rounded-[3rem] p-10 space-y-8 border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-8">
        <div className="text-center">
          <h1 className="text-3xl font-black mb-2">{isRegistering ? 'Join WePlay' : 'Welcome Back'}</h1>
          <p className="text-sm text-gray-500 uppercase font-black tracking-widest">Elite Social Gaming</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-500 uppercase ml-4">Display Name</label>
            <input 
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter Username"
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 ring-indigo-500 transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-500 uppercase ml-4">Secure Password</label>
            <input 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 ring-indigo-500 transition-all placeholder:text-gray-600"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full py-5 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-2xl font-black text-xs uppercase shadow-xl shadow-indigo-600/20 active:scale-95 transition-all mt-4"
          >
            {isRegistering ? 'Create Elite ID' : 'Login Securely'}
          </button>
        </form>

        <button 
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full text-[10px] font-black uppercase text-gray-500 hover:text-white transition-colors"
        >
          {isRegistering ? 'Already have an account? Login' : "New here? Create an ID"}
        </button>
      </div>
      
      <p className="mt-8 text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">SocialVerse Encryption Active</p>
    </div>
  );
};

export default Auth;
