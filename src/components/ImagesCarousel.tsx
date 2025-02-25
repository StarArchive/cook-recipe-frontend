import { Carousel } from "@mantine/carousel";
import { Image, Modal } from "@mantine/core";
import { useState } from "react";

import { getImageUrl } from "@/client";

interface Props {
  images: { url: string }[];
  title: string;
}

export default function ImagesCarousel({ images, title }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    const imageUrl = getImageUrl(images[0].url).toString();

    return (
      <Image
        src={imageUrl}
        alt={title}
        radius="md"
        w={450}
        onClick={() => setPreviewUrl(imageUrl)}
      />
    );
  }

  return (
    <>
      <Carousel withIndicators className="h-96">
        {images.map((image, index) => (
          <Carousel.Slide key={index}>
            <Image
              className="h-96"
              src={getImageUrl(image.url)}
              alt={title}
              fit="contain"
              onClick={() => setPreviewUrl(getImageUrl(image.url).toString())}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
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
