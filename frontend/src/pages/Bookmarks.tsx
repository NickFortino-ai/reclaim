import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBookmarks, useToggleBookmark } from '../hooks/useApi';
import type { Resource } from '../api/client';

type Tab = 'studies' | 'drive' | 'intimacy' | 'wisdom';

const TABS: { key: Tab; label: string }[] = [
  { key: 'studies', label: 'Scientific Studies' },
  { key: 'drive', label: 'Drive' },
  { key: 'intimacy', label: 'Real Intimacy' },
  { key: 'wisdom', label: 'Wisdom' },
];

export function Bookmarks() {
  const [activeTab, setActiveTab] = useState<Tab>('studies');
  const { data, isLoading, error } = useBookmarks();
  const toggleBookmark = useToggleBookmark();

  const allResources = data?.resources || [];
  const filteredResources = allResources.filter(r => r.category === activeTab);

  const countByCategory = (cat: string) => allResources.filter(r => r.category === cat).length;

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
        <p className="text-red-600">Failed to load bookmarks. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Bookmarks</h1>
        <Link to="/resources" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          &larr; Back to Resources
        </Link>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 overflow-x-auto">
        {TABS.map(tab => {
          const count = countByCategory(tab.key);
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {count > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {filteredResources.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500">
            No bookmarked {TABS.find(t => t.key === activeTab)?.label.toLowerCase()} resources yet.
          </p>
          <Link to="/resources" className="text-sm text-primary-600 hover:underline mt-2 inline-block">
            Browse this week's resources
          </Link>
        </div>
      ) : (
        <div className={activeTab === 'drive' ? 'grid md:grid-cols-2 gap-4' : 'space-y-4'}>
          {filteredResources.map(r => (
            <BookmarkCard key={r.id} resource={r} onUnbookmark={() => toggleBookmark.mutate(r.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

function BookmarkCard({ resource, onUnbookmark }: { resource: Resource; onUnbookmark: () => void }) {
  const isWisdom = resource.category === 'wisdom';

  return (
    <div className="card relative">
      {/* Unbookmark heart */}
      <button
        onClick={onUnbookmark}
        className="absolute top-3 right-3 p-1 hover:scale-110 transition-transform"
        title="Remove bookmark"
      >
        <svg
          className="w-5 h-5 text-red-500 fill-red-500"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          fill="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <span className="text-xs text-gray-400 mb-1 block">Week {resource.week}</span>

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
