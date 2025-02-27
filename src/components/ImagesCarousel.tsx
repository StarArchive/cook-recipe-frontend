import { Carousel } from "@mantine/carousel";
import { Image, Modal } from "@mantine/core";
import { useState } from "react";

import { getImageUrl } from "@/client";
import type { Recipe } from "@/client/types";

type Props = Pick<Recipe, "images" | "title">;

export default function ImagesCarousel({ images, title }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    const imageUrl = getImageUrl(images[0]).toString();

    return (
      <>
        <Image
          className="flex-auto"
          src={imageUrl}
          alt={title}
          radius="md"
          w={660}
          h={420}
          onClick={() => setPreviewUrl(imageUrl)}
        />
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

  return (
    <>
      <Carousel withIndicators className="h-96">
        {images.map((image, index) => (
          <Carousel.Slide key={index}>
            <Image
              className="h-96"
              src={getImageUrl(image)}
              alt={title}
              fit="contain"
              onClick={() => setPreviewUrl(getImageUrl(image).toString())}
              fallbackSrc="https://via.placeholder.com/660x420"
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
