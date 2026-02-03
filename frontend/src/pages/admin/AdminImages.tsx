import { useState } from 'react';
import {
  useAdminImages,
  useSaveImage,
  useDeleteImage,
} from '../../hooks/useApi';

export function AdminImages() {
  const { data: images, isLoading, error } = useAdminImages();
  const saveImage = useSaveImage();
  const deleteImage = useDeleteImage();

  const [newDayNum, setNewDayNum] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newOverlayText, setNewOverlayText] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const dayNum = parseInt(newDayNum);
    if (isNaN(dayNum) || dayNum < 1 || dayNum > 365 || !newImageUrl.trim() || !newOverlayText.trim()) return;

    try {
      await saveImage.mutateAsync({
        dayNum,
        imageUrl: newImageUrl.trim(),
        overlayText: newOverlayText.trim(),
      });
      setNewDayNum('');
      setNewImageUrl('');
      setNewOverlayText('');
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Desensitization Images</h1>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="btn btn-primary"
        >
          {showAdd ? 'Cancel' : 'Add Image'}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleSave} className="card">
          <div className="grid gap-4">
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
          {images?.length || 0} of 365 images uploaded
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images?.map((img) => (
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
                <span className="font-medium text-gray-900">Day {img.dayNum}</span>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {(!images || images.length === 0) && (
            <div className="col-span-full py-8 text-center text-gray-500">
              No images yet. Add your first one above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
