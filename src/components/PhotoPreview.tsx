import { Modal, Image } from "@mantine/core";

interface Props {
  previewUrl: string | null;
  setPreviewUrl: (previewUrl: string | null) => void;
}

export default function PhotoPreview({ previewUrl, setPreviewUrl }: Props) {
  return (
    <Modal
      onClose={() => setPreviewUrl(null)}
      opened={!!previewUrl}
      size="xl"
      padding="xs"
    >
      {previewUrl && (
        <Image src={previewUrl} fit="contain" maw="100%" mah="80vh" />
      )}
    </Modal>
  );
}
