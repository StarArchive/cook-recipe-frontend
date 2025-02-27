import { Group, Image, Stack, Text } from "@mantine/core";

import { getImageUrl } from "@/client";
import type { RecipeStep } from "@/client/types";

interface Props {
  steps: RecipeStep[];
}

export default function RecipeStep({ steps }: Props) {
  return (
    <Stack gap="md">
      {steps.map((step, index) => (
        <Group
          key={`step-${index}`}
          align="center"
          wrap="nowrap"
          className="min-h-10"
        >
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
            <span className="font-semibold text-white">{index + 1}</span>
          </div>
          <Text className="whitespace-pre-wrap">{step.content}</Text>
          {step.images.length > 0 && (
            <Image
              src={getImageUrl(step.images[0])}
              h={300}
              radius="md"
              fallbackSrc="https://via.placeholder.com/300"
            />
          )}
        </Group>
      ))}
    </Stack>
  );
}
