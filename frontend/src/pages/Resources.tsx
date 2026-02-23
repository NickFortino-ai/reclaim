import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useResources, useToggleBookmark } from '../hooks/useApi';
import type { Resource } from '../api/client';

type Tab = 'studies' | 'drive' | 'intimacy' | 'wisdom';

const TABS: { key: Tab; label: string }[] = [
  { key: 'studies', label: 'Scientific Studies' },
  { key: 'drive', label: 'Drive' },
  { key: 'intimacy', label: 'Real Intimacy' },
  { key: 'wisdom', label: 'Wisdom' },
];

export function Resources() {
  const [activeTab, setActiveTab] = useState<Tab>('studies');
  const { data, isLoading, error } = useResources();
  const toggleBookmark = useToggleBookmark();

  const filteredResources = data?.resources.filter(r => r.category === activeTab) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-red-600">Failed to load resources. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Week {data?.week} Resources
        </h1>
        <Link to="/bookmarks" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View My Bookmarks
        </Link>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-gray-100 p-1 rounded-lg mb-6 overflow-x-auto gap-1">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {filteredResources.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500">No resources for this week yet. Check back later or browse your bookmarks.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeTab === 'drive' ? (
            <>
              <div className="card bg-primary-50 border-primary-200">
                <p className="text-primary-800 text-sm">
                  <strong>Note:</strong> Individual experiences vary. The goal isn't just hormones — it's reclaiming your energy, drive, and self-control.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {filteredResources.map(r => (
                  <ResourceCard key={r.id} resource={r} onBookmark={() => toggleBookmark.mutate(r.id)} />
                ))}
              </div>
            </>
          ) : activeTab === 'intimacy' ? (
            <>
              <div className="card bg-primary-50 border-primary-200">
                <p className="text-primary-800 text-sm">
                  <strong>Why This Matters:</strong> Quitting porn isn't just about stopping a bad habit — it's about preparing yourself for real, fulfilling intimacy.
                </p>
              </div>
              {filteredResources.map(r => (
                <ResourceCard key={r.id} resource={r} onBookmark={() => toggleBookmark.mutate(r.id)} />
              ))}
            </>
          ) : (
            filteredResources.map(r => (
              <ResourceCard key={r.id} resource={r} onBookmark={() => toggleBookmark.mutate(r.id)} />
            ))
          )}
        </div>
      )}

      {/* Submit Wisdom section */}
      {activeTab === 'wisdom' && (
        <div className="card bg-primary-50 border-primary-200 text-center mt-6">
          <p className="text-primary-800 text-sm mb-3">
            Have wisdom to share with the community? Submit your own quote or lesson.
          </p>
          <a
            href="mailto:support@reclaim365.app?subject=Wisdom%20Submission&body=Quote:%0A%0ASource%20(optional,%20e.g.%20Marcus%20Aurelius,%20your%20therapist):%0A%0ALesson/Explanation:%0A"
            className="btn btn-primary inline-block"
          >
            Submit Wisdom
          </a>
        </div>
      )}
    </div>
  );
}

function ResourceCard({ resource, onBookmark }: { resource: Resource; onBookmark: () => void }) {
  const isWisdom = resource.category === 'wisdom';

  return (
    <div className="card relative">
      {/* Bookmark heart */}
      <button
        onClick={onBookmark}
        className="absolute top-3 right-3 p-2 hover:scale-110 transition-transform"
        title={resource.isBookmarked ? 'Remove bookmark' : 'Bookmark'}
      >
        <svg
          className={`w-5 h-5 ${resource.isBookmarked ? 'text-red-500 fill-red-500' : 'text-gray-300 hover:text-gray-400'}`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          fill={resource.isBookmarked ? 'currentColor' : 'none'}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {isWisdom ? (
        <>
          <blockquote className="text-lg text-gray-900 italic mb-2 pr-8">
            "{resource.summary}"
          </blockquote>
          {resource.source && (
            <p className="text-sm text-primary-600 mb-2">-- {resource.source}</p>
          )}
          {resource.link && (
            <p className="text-gray-600 text-sm">{resource.link}</p>
          )}
        </>
      ) : (
        <>
          <h3 className="font-semibold text-gray-900 mb-1 pr-8">{resource.title}</h3>
          {resource.source && (
            <p className="text-sm text-primary-600 mb-2">{resource.source}</p>
          )}
          <p className="text-gray-600 text-sm mb-3">{resource.summary}</p>
          {resource.link && (
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-600 hover:underline"
            >
              Read full study →
            </a>
          )}
        </>
      )}
    </div>
  );
}
