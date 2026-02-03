import { Link } from 'react-router-dom';

export function RegisterCancel() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="card max-w-md w-full text-center">
        <div className="text-4xl mb-4">🤔</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Changed Your Mind?
        </h1>
        <p className="text-gray-600 mb-6">
          That's okay. Your journey can start whenever you're ready.
        </p>
        <div className="space-y-4">
          <Link to="/register" className="block btn btn-primary py-3">
            Try Again
          </Link>
          <Link to="/" className="block btn btn-secondary py-3">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
