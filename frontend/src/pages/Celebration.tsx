import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Celebration() {
  const { user } = useAuth();

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="card max-w-lg text-center">
        <div className="text-6xl mb-6">🎉</div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          You Did It!
        </h1>

        <p className="text-xl text-gray-600 mb-6">
          365 days of strength, discipline, and growth.
        </p>

        <div className="bg-primary-50 rounded-lg p-6 mb-6">
          <div className="text-5xl font-bold text-primary-600 mb-2">365</div>
          <p className="text-primary-700">Days of Freedom</p>
        </div>

        <p className="text-gray-600 mb-6">
          Your subscription has been automatically canceled. You've proven that
          you have what it takes. The strength you've built is yours forever.
        </p>

        <div className="space-y-4">
          {user && (
            <Link to="/dashboard" className="block btn btn-primary py-3">
              View Your Journey
            </Link>
          )}
          <Link to="/community" className="block btn btn-outline py-3">
            Celebrate with the Community
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            "The chains of habit are too light to be felt until they are too heavy to be broken."
            <br />
            — You broke them. You're free.
          </p>
        </div>
      </div>
    </div>
  );
}
