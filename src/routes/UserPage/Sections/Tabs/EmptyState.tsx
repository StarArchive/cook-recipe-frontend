import { Box, Button, Center, Text } from "@mantine/core";
import { TbChefHat, TbPlus } from "react-icons/tb";
import { Link } from "wouter";

interface Props {
  type: "created" | "starred";
}

export default function EmptyState({ type }: Props) {
  return (
    <Center style={{ height: 250 }}>
      <Box ta="center">
        <TbChefHat size={48} style={{ opacity: 0.4, marginBottom: 10 }} />
        <Text fz="lg" fw={500}>
          无数据
        </Text>
        {type === "created" && (
          <Button
            component={Link}
            to="/recipe/new"
            leftSection={<TbPlus size={16} />}
            variant="outline"
            mt="md"
          >
            创建食谱
          </Button>
        )}
        {type === "starred" && (
          <Text size="sm" c="dimmed" mt="xs">
            收藏过的食谱将会出现在此处
          </Text>
        )}
      </Box>
    </Center>
  );
}
