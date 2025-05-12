import { Group, Stack, Text, Image } from "@mantine/core";
import { useState } from "react";

import { getImageUrl } from "@/client";
import type { RecipeStep } from "@/client/types";
import PhotoPreview from "@/components/PhotoPreview";

interface Props {
  steps: RecipeStep[];
}

export default function RecipeStep({ steps }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <Stack gap="md">
      {steps.map((step, index) => (
        <Group
          key={`step-${index}`}
          align="center"
          wrap="nowrap"
          className="min-h-10"
        >
          <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
            <span className="font-semibold text-white">{index + 1}</span>
          </div>
          <p className="flex-1">
            <Text className="whitespace-pre-wrap">{step.content}</Text>
            {step.images.length > 0 && (
              <Image
                src={getImageUrl(step.images[0])}
                w={300}
                radius="md"
                fallbackSrc="https://via.placeholder.com/300"
                onClick={() =>
                  setPreviewUrl(getImageUrl(step.images[0]).toString())
                }
              />
            )}
          </p>
        </Group>
      ))}

      <PhotoPreview previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} />
    </Stack>
  );
}
