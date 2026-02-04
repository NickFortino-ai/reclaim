import { useState } from 'react';
import { useReferralStats } from '../hooks/useApi';

export function ReferralWidget() {
  const { data, isLoading } = useReferralStats();
  const [copied, setCopied] = useState(false);

  if (isLoading || !data) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = data.referralLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Bring Brothers to the Fight
          </h3>
        </div>
        {data.referralCount > 0 && (
          <span className="bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {data.referralCount}
          </span>
        )}
      </div>

      {data.referralCount > 0 ? (
        <p className="text-primary-800 mb-3">
          You've helped <span className="font-bold">{data.referralCount} brother{data.referralCount !== 1 ? 's' : ''}</span> start their journey.
          {data.totalCreditDays > 0 && (
            <span className="text-primary-600 text-sm block mt-1">
              Earned {data.totalCreditDays} days of free access
            </span>
          )}
        </p>
      ) : (
        <p className="text-primary-700 text-sm mb-3">
          Share your link. When someone signs up, you both get 1 week free.
        </p>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={data.referralLink}
          readOnly
          className="flex-1 px-3 py-2 text-sm bg-white border border-primary-200 rounded-lg text-gray-600 truncate"
        />
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}
