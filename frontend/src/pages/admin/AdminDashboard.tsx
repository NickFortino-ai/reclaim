import { useAdminStats } from '../../hooks/useApi';

export function AdminDashboard() {
  const { data: stats, isLoading, error } = useAdminStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load stats. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-4">
        <StatCard
          label="Total Users"
          value={stats.users.total}
          color="blue"
        />
        <StatCard
          label="Active Users"
          value={stats.users.active}
          color="green"
        />
        <StatCard
          label="Completed (365)"
          value={stats.users.completed}
          color="purple"
        />
        <StatCard
          label="Check-ins Today"
          value={stats.checkInsToday}
          color="amber"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Streak Distribution</h2>
          <div className="space-y-3">
            <DistributionBar
              label="0 days"
              value={stats.streaks.distribution.zero}
              total={stats.users.total}
              color="red"
            />
            <DistributionBar
              label="1-7 days"
              value={stats.streaks.distribution['1-7']}
              total={stats.users.total}
              color="orange"
            />
            <DistributionBar
              label="8-30 days"
              value={stats.streaks.distribution['8-30']}
              total={stats.users.total}
              color="yellow"
            />
            <DistributionBar
              label="31-90 days"
              value={stats.streaks.distribution['31-90']}
              total={stats.users.total}
              color="lime"
            />
            <DistributionBar
              label="91+ days"
              value={stats.streaks.distribution['91+']}
              total={stats.users.total}
              color="green"
            />
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Average streak: {stats.streaks.average} days
          </p>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Coverage</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Affirmations</span>
                <span className="font-medium">{stats.content.affirmations}/365 ({stats.content.affirmationCoverage})</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-full bg-primary-500 rounded-full"
                  style={{ width: stats.content.affirmationCoverage }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Desens Images</span>
                <span className="font-medium">{stats.content.images}/365 ({stats.content.imageCoverage})</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: stats.content.imageCoverage }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Resources</span>
                <span className="font-medium">{stats.content.resources} ({stats.content.resourceWeeksCovered} weeks)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(parseInt(stats.content.resourceWeeksCovered) / 52) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Average total days won: {stats.totalDaysAverage}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    purple: 'bg-purple-50 text-purple-700',
    amber: 'bg-amber-50 text-amber-700',
  };

  return (
    <div className={`card ${colorClasses[color]}`}>
      <p className="text-sm opacity-75">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function DistributionBar({
  label,
  value,
  total,
  color,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
}) {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  const colorClasses: Record<string, string> = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    lime: 'bg-lime-500',
    green: 'bg-green-500',
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="text-gray-900">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-full ${colorClasses[color]} rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
