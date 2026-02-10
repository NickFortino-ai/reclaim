import { useState, useRef } from 'react';
import {
  useAdminImages,
  useSaveImage,
  useDeleteImage,
} from '../../hooks/useApi';

const DIFFICULTY_OPTIONS = [
  { value: 0, label: 'Neutral (0 points)', labelLong: 'Neutral (0 points) - Pattern interrupt', color: 'bg-blue-100 text-blue-700' },
  { value: 1, label: 'Easy (1 point)', labelLong: 'Easy (1 point)', color: 'bg-green-100 text-green-700' },
  { value: 2, label: 'Medium (2 points)', labelLong: 'Medium (2 points)', color: 'bg-yellow-100 text-yellow-700' },
  { value: 3, label: 'Hard (3 points)', labelLong: 'Hard (3 points)', color: 'bg-orange-100 text-orange-700' },
];

const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

type ImageInputMode = 'url' | 'upload';

export function AdminImages() {
  const { data: images, isLoading, error } = useAdminImages();
  const saveImage = useSaveImage();
  const deleteImage = useDeleteImage();

  const [newDayNum, setNewDayNum] = useState('');
  const [newOverlayText, setNewOverlayText] = useState('');
  const [newDifficulty, setNewDifficulty] = useState(2);
  const [inputMode, setInputMode] = useState<ImageInputMode>('url');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<number | 'all'>('all');
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Count images by difficulty
  const difficultyCount = DIFFICULTY_OPTIONS.reduce((acc, opt) => {
    acc[opt.value] = images?.filter(img => img.difficulty === opt.value).length || 0;
    return acc;
  }, {} as Record<number, number>);

  // Filter images by difficulty
  const filteredImages = images?.filter(img =>
    filterDifficulty === 'all' || img.difficulty === filterDifficulty
  );

  const handleModeChange = (mode: ImageInputMode) => {
    setInputMode(mode);
    setUploadError(null);
    // Clear the other input method
    if (mode === 'url') {
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      setImageUrl('');
      setPreviewUrl(null);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError(null);

    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setUploadError('Invalid file type. Please upload a JPG, PNG, or WebP image.');
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File too large. Maximum size is 10MB.');
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    setSelectedFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (url: string) => {
    setImageUrl(url);
    setUploadError(null);
    // Set preview for URL mode
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);

    const dayNum = parseInt(newDayNum);
    if (isNaN(dayNum) || dayNum < 1 || dayNum > 365) {
      setUploadError('Day number must be between 1 and 365.');
      return;
    }

    if (!newOverlayText.trim()) {
      setUploadError('Overlay text is required.');
      return;
    }

    // Validate based on input mode
    if (inputMode === 'upload' && !selectedFile) {
      setUploadError('Please select an image file.');
      return;
    }

    if (inputMode === 'url' && !imageUrl.trim()) {
      setUploadError('Please enter an image URL.');
      return;
    }

    try {
      await saveImage.mutateAsync({
        dayNum,
        overlayText: newOverlayText.trim(),
        difficulty: newDifficulty as number,
        imageFile: inputMode === 'upload' && selectedFile ? selectedFile : undefined,
        imageUrl: inputMode === 'url' ? imageUrl.trim() : undefined,
      });

      // Reset form
      setNewDayNum('');
      setNewOverlayText('');
      setNewDifficulty(2);
      setImageUrl('');
      setSelectedFile(null);
      setPreviewUrl(null);
      setShowAdd(false);
      setEditingId(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Failed to save image');
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

  const handleEdit = (img: { id: string; dayNum: number; overlayText: string; difficulty: number; imageUrl: string }) => {
    setEditingId(img.id);
    setShowAdd(true);
    setNewDayNum(String(img.dayNum));
    setNewOverlayText(img.overlayText);
    setNewDifficulty(img.difficulty);
    setInputMode('url');
    setImageUrl(img.imageUrl);
    setPreviewUrl(img.imageUrl);
    setSelectedFile(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setShowAdd(false);
    setEditingId(null);
    setNewDayNum('');
    setNewOverlayText('');
    setNewDifficulty(2);
    setInputMode('url');
    setImageUrl('');
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const hasValidImage = !!editingId || (inputMode === 'upload' ? !!selectedFile : !!imageUrl.trim());

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
            onChange={(e) => setFilterDifficulty(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
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
            onClick={() => showAdd ? resetForm() : setShowAdd(true)}
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
            <div className="font-semibold">{opt.label.split(' (')[0]}</div>
            <div className="text-2xl font-bold">{difficultyCount[opt.value]}</div>
            <div className="text-xs opacity-75">images</div>
          </div>
        ))}
      </div>

      {showAdd && (
        <form onSubmit={handleSave} className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? 'Edit Image' : 'Add Image'}
          </h2>
          <div className="grid gap-4">
            {/* Error message */}
            {uploadError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {uploadError}
              </div>
            )}

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
                  Difficulty
                </label>
                <select
                  value={newDifficulty}
                  onChange={(e) => setNewDifficulty(parseInt(e.target.value))}
                  className="input"
                  required
                >
                  {DIFFICULTY_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.labelLong}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image Input Mode Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Source
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleModeChange('url')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    inputMode === 'url'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Paste URL
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange('upload')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    inputMode === 'upload'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Upload File
                </button>
              </div>
            </div>

            {/* URL Input */}
            {inputMode === 'url' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="input"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter a direct link to an image (JPG, PNG, WebP)
                </p>
              </div>
            )}

            {/* File Upload */}
            {inputMode === 'upload' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image File
                </label>
                <div className="flex items-center gap-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="btn btn-secondary cursor-pointer"
                  >
                    {selectedFile ? 'Change Image' : 'Choose Image'}
                  </label>
                  {selectedFile && (
                    <span className="text-sm text-gray-600">
                      {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Accepts JPG, PNG, WebP. Max 10MB.
                </p>
              </div>
            )}

            {/* Image Preview */}
            {previewUrl && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preview
                </label>
                <div className="relative w-full max-w-md aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={() => {
                      if (inputMode === 'url') {
                        setPreviewUrl(null);
                        setUploadError('Could not load image from URL. Please check the link.');
                      }
                    }}
                  />
                  {newOverlayText && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                      <p className="text-white text-lg font-bold text-center">
                        {newOverlayText}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

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
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={resetForm}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saveImage.isPending || !hasValidImage}
              className="btn btn-primary"
            >
              {saveImage.isPending ? 'Saving...' : editingId ? 'Update Image' : 'Save Image'}
            </button>
          </div>
        </form>
      )}

      <div className="card">
        <p className="text-sm text-gray-600 mb-4">
          {filteredImages?.length || 0} images {filterDifficulty !== 'all' ? `(${filterDifficulty}pt)` : 'total'} · {images?.length || 0} of 365 uploaded
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
                      {img.difficulty}pt
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(img)}
                      className="text-primary-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {(!filteredImages || filteredImages.length === 0) && (
            <div className="col-span-full py-8 text-center text-gray-500">
              {filterDifficulty === 'all'
                ? 'No images yet. Add your first one above.'
                : `No ${filterDifficulty}pt images yet.`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
