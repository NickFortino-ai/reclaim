import { Link } from 'react-router-dom';
import { LockedOverlay } from '../../components/LockedOverlay';

// Mock leaderboard data for demo with cool warrior names
const mockLeaderboard = [
  { id: '1', rank: 1, streak: 142, theme: 'navy', displayName: 'Iron Wolf', isCompleted: false },
  { id: '2', rank: 2, streak: 98, theme: 'charcoal', displayName: 'Silent Titan', isCompleted: false },
  { id: '3', rank: 3, streak: 87, theme: 'forest', displayName: 'Steel Guardian', isCompleted: false },
  { id: '4', rank: 4, streak: 71, theme: 'slate', displayName: 'Shadow Phoenix', isCompleted: false },
  { id: '5', rank: 5, streak: 65, theme: 'burgundy', displayName: 'Granite Sentinel', isCompleted: false },
  { id: '6', rank: 6, streak: 52, theme: 'leather', displayName: 'Frost Viking', isCompleted: false },
  { id: '7', rank: 7, streak: 45, theme: 'olive', displayName: 'Thunder Hawk', isCompleted: false },
  { id: '8', rank: 8, streak: 38, theme: 'gunmetal', displayName: 'Obsidian Ronin', isCompleted: false },
];

const themeColors: Record<string, string> = {
  slate: '#475569',
  navy: '#334e68',
  charcoal: '#333333',
  gunmetal: '#3e4c59',
  forest: '#15803d',
  olive: '#4d5638',
  burgundy: '#8c1f3b',
  leather: '#71453a',
};

export function DemoCommunity() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Community</h1>
        <p className="text-gray-600">
          You're not alone. See others on the same journey and send them encouragement.
        </p>
      </div>

      {/* Leaderboard Section - Visible */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Brotherhood Leaderboard</h2>
          <span className="text-sm text-gray-500">Live rankings</span>
        </div>

        <div className="space-y-2">
          {mockLeaderboard.slice(0, 5).map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
            >
              <div className="flex items-center gap-3">
                {/* Rank Badge */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    member.rank === 1
                      ? 'bg-yellow-500 text-white'
                      : member.rank === 2
                      ? 'bg-gray-400 text-white'
                      : member.rank === 3
                      ? 'bg-amber-700 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {member.rank}
                </div>

                {/* User Theme Color */}
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: themeColors[member.theme] }}
                />

                <span className="font-medium text-gray-700">
                  {member.displayName}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-primary-600">
                  Day {member.streak}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Locked remaining leaderboard */}
        <LockedOverlay message="Sign up to see full leaderboard" blur={false}>
          <div className="space-y-2 mt-2">
            {mockLeaderboard.slice(5).map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-gray-200 text-gray-700">
                    {member.rank}
                  </div>
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: themeColors[member.theme] }}
                  />
                  <span className="font-medium text-gray-700">
                    {member.displayName}
                  </span>
                </div>
                <span className="text-lg font-bold text-primary-600">
                  Day {member.streak}
                </span>
              </div>
            ))}
          </div>
        </LockedOverlay>

        <p className="text-sm text-gray-500 text-center mt-3">
          Showing top warriors • Join to see your rank
        </p>
      </div>

      {/* Support Cards Section - Locked */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Send Support</h2>
      <LockedOverlay message="Sign up to send support to brothers">
        <div className="grid gap-4 sm:grid-cols-2">
          {mockLeaderboard.slice(0, 4).map((member) => (
            <div key={member.id} className="card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: themeColors[member.theme] }}
                  />
                  <span className="font-medium text-gray-900">
                    {member.displayName}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center mb-3">
                <div>
                  <div className="text-2xl font-bold text-primary-600">
                    {member.streak}
                  </div>
                  <div className="text-xs text-gray-500">Current Streak</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {member.streak + Math.floor(Math.random() * 20)}
                  </div>
                  <div className="text-xs text-gray-500">Total Days</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className="text-green-600">♥</span>
                    {Math.floor(Math.random() * 5) + 1} today
                  </span>
                </span>
                <button className="btn btn-outline text-sm py-1 px-3">
                  Send Support ♥
                </button>
              </div>
            </div>
          ))}
        </div>
      </LockedOverlay>

      {/* Demo Navigation */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Explore the demo: <Link to="/demo/dashboard" className="text-primary-600 hover:underline">Dashboard</Link> • <Link to="/demo/resources" className="text-primary-600 hover:underline">Resources</Link></p>
      </div>
    </div>
  );
}
