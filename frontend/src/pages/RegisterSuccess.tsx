import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { stripe } from '../api/client';

export function RegisterSuccess() {
  const [searchParams] = useSearchParams();
  const [accessCode, setAccessCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      setError('Missing session ID');
      setLoading(false);
      return;
    }

    stripe.completeRegistration(sessionId)
      .then((response) => {
        setAccessCode(response.accessCode);
        login(response.token, response.user);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Registration failed');
        setLoading(false);
      });
  }, [searchParams, login]);

  const copyToClipboard = () => {
    if (accessCode) {
      navigator.clipboard.writeText(accessCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Setting up your account...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="card max-w-md w-full text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/register')}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="card max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome to Reclaim!</h1>
          <p className="text-gray-600 mt-2">Your journey to freedom starts now.</p>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-5 mb-6">
          <h2 className="font-bold text-yellow-800 mb-1 text-center text-lg">
            Save Your 4-Digit Code
          </h2>
          <p className="text-sm text-yellow-700 mb-4 text-center">
            This code is how you log in. Screenshot it, write it down, or memorize it.
          </p>

          <div className="bg-white rounded-lg p-6 text-center border border-yellow-200">
            <code className="text-5xl font-mono font-bold tracking-[0.5em] text-gray-900">
              {accessCode}
            </code>
          </div>

          <button
            onClick={copyToClipboard}
            className="w-full mt-4 btn btn-secondary"
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>

          <p className="text-sm text-red-700 font-semibold text-center mt-4">
            If you lose this code, contact support@reclaim365.app
          </p>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="w-full btn btn-primary py-3"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
