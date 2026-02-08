import { useState } from 'react';
import {
  useAdminResources,
  useSaveResource,
  useDeleteResource,
  useMoveResource,
} from '../../hooks/useApi';
import type { Resource } from '../../api/client';

const CATEGORIES = [
  { key: 'studies', label: 'Scientific Studies' },
  { key: 'testosterone', label: 'Testosterone' },
  { key: 'intimacy', label: 'Real Intimacy' },
  { key: 'wisdom', label: 'Wisdom' },
];

export function AdminResources() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form state
  const [formWeek, setFormWeek] = useState(1);
  const [formCategory, setFormCategory] = useState('studies');
  const [formTitle, setFormTitle] = useState('');
  const [formSource, setFormSource] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formLink, setFormLink] = useState('');

  const { data, isLoading, error } = useAdminResources(selectedWeek);
  const saveResource = useSaveResource();
  const deleteResource = useDeleteResource();
  const moveResource = useMoveResource();

  const resources = data?.resources || [];
  const weekCounts = data?.weekCounts || [];

  const filtered = categoryFilter === 'all'
    ? resources
    : resources.filter(r => r.category === categoryFilter);

  const countByCategory = (cat: string) => resources.filter(r => r.category === cat).length;

  const resetForm = () => {
    setEditId(null);
    setFormWeek(selectedWeek);
    setFormCategory('studies');
    setFormTitle('');
    setFormSource('');
    setFormSummary('');
    setFormLink('');
  };

  const handleEdit = (r: Resource) => {
    setEditId(r.id);
    setFormWeek(r.week);
    setFormCategory(r.category);
    setFormTitle(r.title);
    setFormSource(r.source || '');
    setFormSummary(r.summary);
    setFormLink(r.link || '');
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formSummary.trim()) return;

    try {
      await saveResource.mutateAsync({
        id: editId || undefined,
        week: formWeek,
        category: formCategory,
        title: formTitle.trim(),
        source: formSource.trim() || undefined,
        summary: formSummary.trim(),
        link: formLink.trim() || undefined,
      });
      resetForm();
      setShowForm(false);
    } catch {
      // Error handled by mutation
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this resource? All user bookmarks for it will also be removed.')) return;
    try {
      await deleteResource.mutateAsync(id);
    } catch {
      // Error handled by mutation
    }
  };

  const handleMove = async (id: string, week: number) => {
    try {
      await moveResource.mutateAsync({ id, week });
    } catch {
      // Error handled by mutation
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load resources. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
        <div className="flex items-center gap-3">
          {/* Week selector */}
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
            className="input w-auto"
          >
            {Array.from({ length: 52 }, (_, i) => i + 1).map(w => {
              const count = weekCounts.find(wc => wc.week === w)?._count.id || 0;
              return (
                <option key={w} value={w}>
                  Week {w} ({count})
                </option>
              );
            })}
          </select>

          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input w-auto"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(c => (
              <option key={c.key} value={c.key}>{c.label}</option>
            ))}
          </select>

          <button
            onClick={() => {
              if (showForm && !editId) {
                setShowForm(false);
              } else {
                resetForm();
                setFormWeek(selectedWeek);
                setShowForm(true);
              }
            }}
            className="btn btn-primary"
          >
            {showForm && !editId ? 'Cancel' : 'Add Resource'}
          </button>
        </div>
      </div>

      {/* Category count cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {CATEGORIES.map(c => (
          <div key={c.key} className="card text-center py-3">
            <p className="text-2xl font-bold text-gray-900">{countByCategory(c.key)}</p>
            <p className="text-xs text-gray-500">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <form onSubmit={handleSave} className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editId ? 'Edit Resource' : 'Add Resource'}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Week</label>
              <select
                value={formWeek}
                onChange={(e) => setFormWeek(parseInt(e.target.value))}
                className="input"
              >
                {Array.from({ length: 52 }, (_, i) => i + 1).map(w => (
                  <option key={w} value={w}>Week {w}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="input"
              >
                {CATEGORIES.map(c => (
                  <option key={c.key} value={c.key}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="input"
                placeholder="Resource title"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Source (optional)</label>
              <input
                type="text"
                value={formSource}
                onChange={(e) => setFormSource(e.target.value)}
                className="input"
                placeholder="e.g. Journal of Urology, Marcus Aurelius"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
              <textarea
                value={formSummary}
                onChange={(e) => setFormSummary(e.target.value)}
                className="input"
                rows={3}
                placeholder="Resource summary or quote text"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Link (optional)</label>
              <input
                type="text"
                value={formLink}
                onChange={(e) => setFormLink(e.target.value)}
                className="input"
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            {editId && (
              <button
                type="button"
                onClick={() => { resetForm(); setShowForm(false); }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={saveResource.isPending}
              className="btn btn-primary"
            >
              {saveResource.isPending ? 'Saving...' : editId ? 'Update Resource' : 'Save Resource'}
            </button>
          </div>
        </form>
      )}

      {/* Resource list */}
      {filtered.length === 0 ? (
        <div className="card text-center py-8">
          <p className="text-gray-500">
            No resources for Week {selectedWeek}
            {categoryFilter !== 'all' ? ` in ${CATEGORIES.find(c => c.key === categoryFilter)?.label}` : ''}.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(r => (
            <div key={r.id} className="card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {CATEGORIES.find(c => c.key === r.category)?.label}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{r.title}</h3>
                  {r.source && (
                    <p className="text-sm text-primary-600">{r.source}</p>
                  )}
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{r.summary}</p>
                  {r.link && (
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary-500 hover:underline mt-1 inline-block"
                    >
                      {r.link}
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={r.week}
                    onChange={(e) => handleMove(r.id, parseInt(e.target.value))}
                    className="input w-auto text-xs py-1 px-2"
                    title="Move to week"
                  >
                    {Array.from({ length: 52 }, (_, i) => i + 1).map(w => (
                      <option key={w} value={w}>Wk {w}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleEdit(r)}
                    className="text-primary-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
