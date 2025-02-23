import {
  ActionIcon,
  FileButton,
  Flex,
  Image,
  Modal,
  UnstyledButton,
} from "@mantine/core";
import { useRef, useState } from "react";
import { TbPlus, TbX } from "react-icons/tb";

interface GalleryPhotoPickerProps {
  maxCount?: number;
  onChange?: (files: File[]) => void;
  value?: File[];
}

export default function GalleryPhotoPicker({
  maxCount = 5,
  onChange,
  value,
}: GalleryPhotoPickerProps) {
  const [files, setFiles] = useState<File[]>(value || []);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const resetRef = useRef<() => void>(null);

  const handleFileChange = (uploadedFiles: File[]) => {
    const newFiles = [...files];
    uploadedFiles.forEach((file) => {
      if (newFiles.length < maxCount) {
        newFiles.push(file);
      }
    });
    setFiles(newFiles);
    onChange?.(newFiles);
    resetRef.current?.();
  };

  return (
    <>
      <div className="mb-4">
        <Flex gap="md" wrap="wrap">
          {files.map((file, index) => {
            const imageUrl = URL.createObjectURL(file);
            return (
              <div
                key={index}
                style={{
                  position: "relative",
                }}
              >
                <Image
                  className="cursor-pointer"
                  src={imageUrl}
                  w={96}
                  h={96}
                  fit="contain"
                  onClick={() => setPreviewUrl(imageUrl)}
                />
                <ActionIcon
                  className="absolute top-1 right-0"
                  size={24}
                  variant="default"
                  onClick={() => {
                    const newFiles = files.filter((_, i) => i !== index);
                    setFiles(newFiles);
                    onChange?.(newFiles);
                  }}
                >
                  <TbX size={24} />
                </ActionIcon>
              </div>
            );
          })}
          {files.length < maxCount && (
            <FileButton
              resetRef={resetRef}
              onChange={handleFileChange}
              accept="image/png,image/jpeg,image/webp"
              multiple
            >
              {(props) => (
                <UnstyledButton
                  className="flex justify-center items-center w-24 h-24 border-2 border-dashed rounded-md"
                  {...props}
                >
                  <TbPlus size={48} />
                </UnstyledButton>
              )}
            </FileButton>
          )}
        </Flex>
      </div>

      <Modal
        opened={!!previewUrl}
        onClose={() => setPreviewUrl(null)}
        size="xl"
        padding="xs"
      >
        {previewUrl && <Image src={previewUrl} fit="contain" maw="100%" />}
      </Modal>
    </>
  );
}
