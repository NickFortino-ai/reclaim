import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LockedOverlay } from '../../components/LockedOverlay';

type Tab = 'studies' | 'drive' | 'intimacy' | 'wisdom';

export function DemoResources() {
  const [activeTab, setActiveTab] = useState<Tab>('studies');

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Resources</h1>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 overflow-x-auto">
        <TabButton
          active={activeTab === 'studies'}
          onClick={() => setActiveTab('studies')}
        >
          Scientific Studies
        </TabButton>
        <TabButton
          active={activeTab === 'drive'}
          onClick={() => setActiveTab('drive')}
        >
          Drive
        </TabButton>
        <TabButton
          active={activeTab === 'intimacy'}
          onClick={() => setActiveTab('intimacy')}
        >
          Real Intimacy
        </TabButton>
        <TabButton
          active={activeTab === 'wisdom'}
          onClick={() => setActiveTab('wisdom')}
        >
          Wisdom
        </TabButton>
      </div>

      {/* Tab Content */}
      {activeTab === 'studies' && <DemoStudiesContent />}
      {activeTab === 'drive' && <DemoDriveContent />}
      {activeTab === 'intimacy' && <DemoIntimacyContent />}
      {activeTab === 'wisdom' && <DemoWisdomContent />}

      {/* Demo Navigation */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Explore the demo: <Link to="/demo/dashboard" className="text-primary-600 hover:underline">Dashboard</Link> • <Link to="/demo/community" className="text-primary-600 hover:underline">Community</Link></p>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        active
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      {children}
    </button>
  );
}

function DemoStudiesContent() {
  const studies = [
    {
      title: 'Neuroscience of Internet Pornography Addiction',
      source: 'Behavioral Sciences, 2015',
      summary: 'Research shows pornography consumption can lead to neuroplastic changes in the brain similar to substance addiction, affecting dopamine pathways and reward circuits.',
    },
    {
      title: 'Pornography and the Male Sexual Script',
      source: 'Archives of Sexual Behavior, 2016',
      summary: 'Study found that higher pornography use was associated with lower sexual satisfaction...',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Show first study normally */}
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-1">{studies[0].title}</h3>
        <p className="text-sm text-primary-600 mb-2">{studies[0].source}</p>
        <p className="text-gray-600 text-sm mb-3">{studies[0].summary}</p>
        <span className="text-sm text-primary-600 hover:underline cursor-pointer">
          Read full study →
        </span>
      </div>

      {/* Lock remaining content */}
      <LockedOverlay message="Sign up to access all studies">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card">
              <h3 className="font-semibold text-gray-900 mb-1">Study Title {i + 1}</h3>
              <p className="text-sm text-primary-600 mb-2">Journal Name, Year</p>
              <p className="text-gray-600 text-sm mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </p>
              <span className="text-sm text-primary-600">Read full study →</span>
            </div>
          ))}
        </div>
      </LockedOverlay>
    </div>
  );
}

function DemoDriveContent() {
  return (
    <div className="space-y-4">
      <div className="card bg-primary-50 border-primary-200">
        <p className="text-primary-800 text-sm">
          <strong>Note:</strong> Individual experiences vary. The goal isn't just hormones — it's reclaiming your energy, drive, and self-control.
        </p>
      </div>

      {/* Show one fact */}
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-2">The Dopamine Reset</h3>
        <p className="text-gray-600 text-sm">
          Neuroscience research shows that frequent pornography use downregulates dopamine D2 receptors, reducing motivation and drive. Recovery allows these receptors to resensitize, restoring natural energy and ambition.
        </p>
      </div>

      {/* Lock rest */}
      <LockedOverlay message="Sign up for full access">
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card">
              <h3 className="font-semibold text-gray-900 mb-2">Health Benefit {i}</h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.
              </p>
            </div>
          ))}
        </div>
      </LockedOverlay>
    </div>
  );
}

function DemoIntimacyContent() {
  return (
    <div className="space-y-6">
      <div className="card bg-primary-50 border-primary-200">
        <p className="text-primary-800 text-sm">
          <strong>Why This Matters:</strong> Quitting porn isn't just about stopping a bad habit—it's about preparing yourself for real, fulfilling intimacy with a real partner.
        </p>
      </div>

      {/* Show one study */}
      <h3 className="text-lg font-semibold text-gray-900">Research on Real Intimacy</h3>
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-1">Oxytocin and Pair Bonding in Humans</h3>
        <p className="text-sm text-primary-600 mb-2">Psychoneuroendocrinology, 2012</p>
        <p className="text-gray-600 text-sm mb-3">
          Physical intimacy with a real partner triggers sustained oxytocin release, strengthening emotional bonds and attachment. This "bonding hormone" creates lasting connection that pornography cannot replicate.
        </p>
        <span className="text-sm text-primary-600">Read full study →</span>
      </div>

      {/* Lock rest */}
      <LockedOverlay message="Sign up for full intimacy research">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card">
              <h3 className="font-semibold text-gray-900 mb-1">Intimacy Study {i + 1}</h3>
              <p className="text-sm text-primary-600 mb-2">Journal Name, Year</p>
              <p className="text-gray-600 text-sm mb-3">
                Research findings about real intimacy, pair bonding, and recovery...
              </p>
              <span className="text-sm text-primary-600">Read full study →</span>
            </div>
          ))}
        </div>
      </LockedOverlay>
    </div>
  );
}

function DemoWisdomContent() {
  return (
    <div className="space-y-4">
      {/* Show one wisdom item */}
      <div className="card">
        <blockquote className="text-lg text-gray-900 italic mb-2">
          "The urge is temporary. The regret lasts much longer."
        </blockquote>
        <p className="text-gray-600 text-sm">
          When you feel the pull, remember: this feeling will pass in minutes, but breaking your streak affects your momentum for days.
        </p>
      </div>

      {/* Lock rest */}
      <LockedOverlay message="Sign up for community wisdom">
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card">
              <blockquote className="text-lg text-gray-900 italic mb-2">
                "Wisdom quote {i} goes here..."
              </blockquote>
              <p className="text-gray-600 text-sm">
                Explanation and practical advice about applying this wisdom.
              </p>
            </div>
          ))}
        </div>
      </LockedOverlay>
    </div>
  );
}
