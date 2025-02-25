import { Group, Stack } from "@mantine/core";

import type { RecipeStep } from "@/client/types";

interface Props {
  steps: RecipeStep[];
}

export default function RecipeStep({ steps }: Props) {
  return (
    <Stack gap="md">
      {steps.map((step, index) => (
        <Group key={`step-${index}`} align="center" wrap="nowrap">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
            <span className="font-semibold text-white">{index + 1}</span>
          </div>
          <p className="flex-1 text-base">{step.content}</p>
          {false && (
            <img
              src="https://placehold.co/600x400?text=Placeholder"
              width={300}
            />
          )}
        </Group>
      ))}
    </Stack>
  );
}
