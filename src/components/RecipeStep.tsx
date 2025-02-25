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
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold">{index + 1}</span>
          </div>
          <p className="text-base flex-1">{step.content}</p>
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
