import { useState } from 'react';
import {
  useAdminImages,
  useSaveImage,
  useDeleteImage,
} from '../../hooks/useApi';

const DIFFICULTY_OPTIONS = [
  { value: 'beginner', label: 'Beginner (Days 1-30)', color: 'bg-green-100 text-green-700' },
  { value: 'intermediate', label: 'Intermediate (Days 31-90)', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'advanced', label: 'Advanced (Days 91-180)', color: 'bg-orange-100 text-orange-700' },
  { value: 'mixed', label: 'Mixed (Days 181-365)', color: 'bg-purple-100 text-purple-700' },
];

export function AdminImages() {
  const { data: images, isLoading, error } = useAdminImages();
  const saveImage = useSaveImage();
  const deleteImage = useDeleteImage();

  const [newDayNum, setNewDayNum] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newOverlayText, setNewOverlayText] = useState('');
  const [newDifficulty, setNewDifficulty] = useState('beginner');
  const [showAdd, setShowAdd] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  // Count images by difficulty
  const difficultyCount = DIFFICULTY_OPTIONS.reduce((acc, opt) => {
    acc[opt.value] = images?.filter(img => img.difficulty === opt.value).length || 0;
    return acc;
  }, {} as Record<string, number>);

  // Filter images by difficulty
  const filteredImages = images?.filter(img =>
    filterDifficulty === 'all' || img.difficulty === filterDifficulty
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const dayNum = parseInt(newDayNum);
    if (isNaN(dayNum) || dayNum < 1 || dayNum > 365 || !newImageUrl.trim() || !newOverlayText.trim()) return;

    try {
      await saveImage.mutateAsync({
        dayNum,
        imageUrl: newImageUrl.trim(),
        overlayText: newOverlayText.trim(),
        difficulty: newDifficulty,
      });
      setNewDayNum('');
      setNewImageUrl('');
      setNewOverlayText('');
      setNewDifficulty('beginner');
      setShowAdd(false);
    } catch {
      // Error handled by mutation
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    try {
      await deleteImage.mutateAsync(id);
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
        <p className="text-red-600">Failed to load images. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with filter */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Desensitization Images</h1>
        <div className="flex gap-2">
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="input"
          >
            <option value="all">All Difficulties</option>
            {DIFFICULTY_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label} ({difficultyCount[opt.value]})
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="btn btn-primary"
          >
            {showAdd ? 'Cancel' : 'Add Image'}
          </button>
        </div>
      </div>

      {/* Difficulty coverage stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {DIFFICULTY_OPTIONS.map(opt => (
          <div key={opt.value} className={`p-4 rounded-lg ${opt.color}`}>
            <div className="font-semibold capitalize">{opt.value}</div>
            <div className="text-2xl font-bold">{difficultyCount[opt.value]}</div>
            <div className="text-xs opacity-75">images</div>
          </div>
        ))}
      </div>

      {showAdd && (
        <form onSubmit={handleSave} className="card">
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-[100px_1fr_180px]">
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
                  Image URL
                </label>
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="input"
                  placeholder="https://..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  value={newDifficulty}
                  onChange={(e) => setNewDifficulty(e.target.value)}
                  className="input"
                  required
                >
                  {DIFFICULTY_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Overlay Text
              </label>
              <input
                type="text"
                value={newOverlayText}
                onChange={(e) => setNewOverlayText(e.target.value)}
                className="input"
                placeholder="Text to display over the image..."
                required
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={saveImage.isPending}
              className="btn btn-primary"
            >
              {saveImage.isPending ? 'Saving...' : 'Save Image'}
            </button>
          </div>
        </form>
      )}

      <div className="card">
        <p className="text-sm text-gray-600 mb-4">
          {filteredImages?.length || 0} images {filterDifficulty !== 'all' ? `(${filterDifficulty})` : 'total'} · {images?.length || 0} of 365 uploaded
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredImages?.map((img) => {
            const diffOption = DIFFICULTY_OPTIONS.find(d => d.value === img.difficulty);
            return (
              <div key={img.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src={img.imageUrl}
                    alt={`Day ${img.dayNum}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                    <p className="text-white text-sm font-bold text-center">
                      {img.overlayText}
                    </p>
                  </div>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">Day {img.dayNum}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${diffOption?.color || 'bg-gray-100 text-gray-700'}`}>
                      {img.difficulty || 'beginner'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
          {(!filteredImages || filteredImages.length === 0) && (
            <div className="col-span-full py-8 text-center text-gray-500">
              {filterDifficulty === 'all'
                ? 'No images yet. Add your first one above.'
                : `No ${filterDifficulty} images yet.`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
