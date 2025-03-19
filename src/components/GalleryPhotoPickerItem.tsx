import { ActionIcon, Image } from "@mantine/core";
import { TbX } from "react-icons/tb";

interface Props {
  imageUrl: string;
  onImageClick?: () => void;
  onActionClick?: () => void;
}

export default function GalleryPhotoPickerItem({
  imageUrl,
  onImageClick,
  onActionClick,
}: Props) {
  return (
    <div className="relative">
      <Image
        className="cursor-pointer"
        src={imageUrl}
        w={96}
        h={96}
        fit="contain"
        onClick={onImageClick}
      />
      <ActionIcon
        className="absolute top-1 right-0"
        size={24}
        variant="default"
        onClick={onActionClick}
      >
        <TbX size={24} />
      </ActionIcon>
    </div>
  );
}
