import { Link } from 'react-router-dom';
import { PartnerInfo } from '../api/client';

interface PartnerCardProps {
  partner: PartnerInfo;
  unreadCount: number;
}

function getThemeColor(theme: string): string {
  const colors: Record<string, string> = {
    slate: '#475569',
    navy: '#334e68',
    charcoal: '#333333',
    gunmetal: '#3e4c59',
    forest: '#15803d',
    olive: '#4d5638',
    burgundy: '#8c1f3b',
    leather: '#71453a',
  };
  return colors[theme] || colors.slate;
}

export function PartnerCard({ partner, unreadCount }: PartnerCardProps) {
  return (
    <Link to="/partner" className="card hover:shadow-md transition-shadow block">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: getThemeColor(partner.colorTheme) }}
          >
            {partner.displayName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">{partner.displayName}</span>
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  partner.checkedInToday ? 'bg-green-500' : 'bg-amber-400'
                }`}
                title={partner.checkedInToday ? 'Checked in today' : 'Not checked in yet'}
              />
            </div>
            <p className="text-sm text-gray-600">
              Day {partner.currentStreak} streak
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <span className="bg-primary-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
