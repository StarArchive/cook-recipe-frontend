import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { Link } from "wouter";

import { getImageUrl } from "@/client";

interface Props {
  id: number;
  title: string;
  image?: string;
  description: string;
}

export default function RecipeCard({ id, title, image, description }: Props) {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Card.Section>
        <Image
          src={image && getImageUrl(image)}
          height={160}
          alt={title}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
      </Card.Section>

      <Group mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        <Badge color="pink" variant="light">
          NEW
        </Badge>
      </Group>

      <Text size="sm" c="dimmed" className="mb-4">
        {description}
      </Text>

      <Button
        className="mt-auto!"
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        component={Link}
        to={`/recipe/${id}`}
      >
        查看食谱
      </Button>
    </Card>
  );
}
