import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { Link } from "react-router-dom";

import { getImageUrl } from "@/client";

interface Props {
  title: string;
  image?: string;
  description: string;
}

export default function RecipeCard({ title, image, description }: Props) {
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

      <Text size="sm" c="dimmed">
        {description}
      </Text>

      <Button
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        component={Link}
        to="/recipe/1"
      >
        查看食谱
      </Button>
    </Card>
  );
}
