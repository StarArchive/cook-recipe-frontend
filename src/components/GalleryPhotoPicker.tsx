import { FileButton, Flex, UnstyledButton } from "@mantine/core";
import { useRef, useState } from "react";
import { TbPlus } from "react-icons/tb";

import GalleryPhotoPickerItem from "./GalleryPhotoPickerItem";
import PhotoPreview from "./PhotoPreview";

interface GalleryPhotoPickerProps {
  maxCount?: number;
  initialImages?: string[];
  onChange?: (files: File[]) => void;
  onInitialImagesChange?: (images: string[]) => void;
}

export default function GalleryPhotoPicker({
  maxCount = 5,
  initialImages,
  onChange,
  onInitialImagesChange,
}: GalleryPhotoPickerProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const resetRef = useRef<() => void>(null);
  const initialImagesCount = initialImages?.length || 0;

  const handleFileChange = (uploadedFiles: File[]) => {
    const newFiles = [...files];
    uploadedFiles.forEach((file) => {
      if (newFiles.length < maxCount - initialImagesCount) {
        newFiles.push(file);
      }
    });
    setFiles(newFiles);
    onChange?.(newFiles);
    resetRef.current?.();
  };

  return (
    <>
      <Flex gap="md" wrap="wrap">
        {initialImages?.map((imageUrl, index) => (
          <GalleryPhotoPickerItem
            key={index}
            imageUrl={imageUrl}
            onImageClick={() => setPreviewUrl(imageUrl)}
            onActionClick={() => {
              const newImages = initialImages.filter((_, i) => i !== index);
              console.log("newImages", newImages);
              onInitialImagesChange?.(newImages);
            }}
          />
        ))}
        {files.map((file, index) => {
          return (
            <GalleryPhotoPickerItem
              key={index}
              imageUrl={URL.createObjectURL(file)}
              onImageClick={() => setPreviewUrl(URL.createObjectURL(file))}
              onActionClick={() => {
                const newFiles = files.filter((_, i) => i !== index);
                setFiles(newFiles);
                onChange?.(newFiles);
              }}
            />
          );
        })}
        {files.length + initialImagesCount < maxCount && (
          <FileButton
            resetRef={resetRef}
            onChange={handleFileChange}
            accept="image/png,image/jpeg"
            multiple
          >
            {(props) => (
              <UnstyledButton
                className="flex h-24 w-24 items-center justify-center rounded-md border-2 border-dashed border-gray-900/20 text-gray-900/20 dark:border-gray-400/20 dark:text-gray-400/20"
                {...props}
              >
                <TbPlus size={48} />
              </UnstyledButton>
            )}
          </FileButton>
        )}
      </Flex>

      <PhotoPreview previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} />
    </>
  );
}
