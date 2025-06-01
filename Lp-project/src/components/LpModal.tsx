import { useState, useRef } from "react";
import { IoClose } from "react-icons/io5";

interface LpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    artist: string;
    tags: string[];
    thumbnail: File | null;
  }) => void;
}

const LpModal = ({ isOpen, onClose, onSubmit }: LpModalProps) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle("");
    setArtist("");
    setTag("");
    setTags([]);
    setThumbnail(null);
    setThumbnailPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      artist,
      tags,
      thumbnail,
    });
    resetForm();
    onClose();
  };

  const handleAddTag = () => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
      setTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnail(file);

      // 이미지 미리보기 생성
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 모달 오버레이 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-10"
        onClick={handleClose}
      ></div>

      {/* 모달 */}
      <div className="relative bg-white text-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 z-10 border border-gray-300">
        {/* 모달 닫기 버튼 */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          aria-label="닫기"
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-xl font-bold mb-6 text-center text-gray-900">
          LP 추가
        </h2>

        <form onSubmit={handleSubmit}>
          {/* LP 앨범 썸네일 */}
          <div
            className="mb-6 flex justify-center cursor-pointer"
            onClick={handleThumbnailClick}
          >
            {thumbnailPreview ? (
              <div className="relative w-40 h-40">
                <img
                  src={thumbnailPreview}
                  alt="앨범 커버"
                  className="w-full h-full object-cover rounded-full border-2 border-gray-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm">사진 변경</p>
                </div>
              </div>
            ) : (
              <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                <div className="text-center text-gray-500">
                  <p className="text-lg font-medium">LP</p>
                  <p className="text-sm mt-1">클릭하여 이미지 업로드</p>
                </div>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              aria-label="LP 이미지 업로드"
            />
          </div>

          {/* 제목 입력 */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              디스크 이름
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-gray-800 placeholder-gray-500"
              placeholder="디스크 이름을 입력하세요"
              required
            />
          </div>

          {/* 아티스트 입력 */}
          <div className="mb-4">
            <label
              htmlFor="artist"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              아티스트
            </label>
            <input
              type="text"
              id="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-gray-800 placeholder-gray-500"
              placeholder="아티스트 이름을 입력하세요"
              required
            />
          </div>

          {/* 태그 입력 */}
          <div className="mb-4">
            <label
              htmlFor="tag"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              LP 태그
            </label>
            <div className="flex">
              <input
                type="text"
                id="tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-gray-800 placeholder-gray-500"
                placeholder="태그를 입력하세요"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-red-500 text-white rounded-r-md hover:bg-red-700"
              >
                추가
              </button>
            </div>
          </div>

          {/* 태그 리스트 */}
          {tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {tags.map((t, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-full"
                >
                  <span className="mr-1 text-sm">{t}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(t)}
                    className="text-gray-600 hover:text-red-500"
                    aria-label={`태그 ${t} 삭제`}
                  >
                    <IoClose size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors font-bold text-base"
          >
            추가
          </button>
        </form>
      </div>
    </div>
  );
};

export default LpModal;
