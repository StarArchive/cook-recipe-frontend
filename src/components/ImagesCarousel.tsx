import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";

import { getImageUrl } from "@/client";

interface Props {
  images: { url: string }[];
  title: string;
}

export default function ImagesCarousel({ images, title }: Props) {
  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return (
      <Image src={getImageUrl(images[0].url)} alt={title} radius="md" w={450} />
    );
  }

  return (
    <Carousel slideSize="70%" height={200} align="center" slideGap="md">
      {images.map((image, index) => (
        <Carousel.Slide key={index}>
          <Image src={getImageUrl(image.url)} alt={title} w={450} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
