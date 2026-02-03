import { useState } from 'react';
import {
  useAdminAffirmations,
  useSaveAffirmation,
  useDeleteAffirmation,
} from '../../hooks/useApi';

export function AdminAffirmations() {
  const { data: affirmations, isLoading, error } = useAdminAffirmations();
  const saveAffirmation = useSaveAffirmation();
  const deleteAffirmation = useDeleteAffirmation();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newDayNum, setNewDayNum] = useState('');
  const [newText, setNewText] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const dayNum = parseInt(newDayNum);
    if (isNaN(dayNum) || dayNum < 1 || dayNum > 365 || !newText.trim()) return;

    try {
      await saveAffirmation.mutateAsync({ dayNum, text: newText.trim() });
      setNewDayNum('');
      setNewText('');
      setShowAdd(false);
    } catch {
      // Error handled by mutation
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this affirmation?')) return;
    try {
      await deleteAffirmation.mutateAsync(id);
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
        <p className="text-red-600">Failed to load affirmations. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Affirmations</h1>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="btn btn-primary"
        >
          {showAdd ? 'Cancel' : 'Add Affirmation'}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleSave} className="card">
          <div className="grid gap-4 md:grid-cols-[100px_1fr]">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Day #
              </label>
              <input
                type="number"
                min="1"
                max="365"
                value={newDayNum}
                onChange={(e) => setNewDayNum(e.target.value)}
                className="input"
                placeholder="1-365"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Affirmation Text
              </label>
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="input"
                placeholder="Enter affirmation text..."
                required
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={saveAffirmation.isPending}
              className="btn btn-primary"
            >
              {saveAffirmation.isPending ? 'Saving...' : 'Save Affirmation'}
            </button>
          </div>
        </form>
      )}

      <div className="card">
        <p className="text-sm text-gray-600 mb-4">
          {affirmations?.length || 0} of 365 affirmations created
        </p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-2 text-sm font-medium text-gray-500 w-20">Day</th>
                <th className="text-left py-2 px-2 text-sm font-medium text-gray-500">Text</th>
                <th className="text-right py-2 px-2 text-sm font-medium text-gray-500 w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {affirmations?.map((aff) => (
                <tr key={aff.id} className="border-b border-gray-100">
                  <td className="py-2 px-2 text-gray-900">{aff.dayNum}</td>
                  <td className="py-2 px-2">
                    {editingId === aff.id ? (
                      <input
                        type="text"
                        defaultValue={aff.text}
                        className="input text-sm"
                        onBlur={(e) => {
                          if (e.target.value !== aff.text) {
                            saveAffirmation.mutate({ dayNum: aff.dayNum, text: e.target.value });
                          }
                          setEditingId(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.currentTarget.blur();
                          } else if (e.key === 'Escape') {
                            setEditingId(null);
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      <span className="text-gray-700">{aff.text}</span>
                    )}
                  </td>
                  <td className="py-2 px-2 text-right">
                    <button
                      onClick={() => setEditingId(aff.id)}
                      className="text-primary-600 hover:underline text-sm mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(aff.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {(!affirmations || affirmations.length === 0) && (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-gray-500">
                    No affirmations yet. Add your first one above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
