import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Group,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { TbPlus, TbX } from "react-icons/tb";

interface Recipe {
  title: string;
  description: string;
  published: boolean;
  ingredients: { name: string; quantity: string }[];
  steps: { content: string }[];
}

export default function RecipeForm() {
  const form = useForm<Recipe>({
    initialValues: {
      title: "",
      description: "",
      published: false,
      ingredients: [],
      steps: [],
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log("Submitted Recipe:", values);
    form.reset();
  };

  return (
    <Container mx="auto" mt="xl">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction="column" gap="md">
          <TextInput
            label="食谱标题"
            placeholder="输入食谱标题"
            required
            {...form.getInputProps("title")}
          />
          <Textarea
            label="描述"
            placeholder="输入描述"
            {...form.getInputProps("description")}
          />
          <Checkbox
            label="是否发布"
            {...form.getInputProps("published", { type: "checkbox" })}
          />
        </Flex>

        <Box mt="md">
          <Group mb="xs">
            <strong>食材</strong>
            <Button
              variant="light"
              size="xs"
              onClick={() =>
                form.insertListItem("ingredients", { name: "", quantity: "" })
              }
            >
              <TbPlus size={16} />
            </Button>
          </Group>
          {form.values.ingredients.map((_, index) => (
            <Group key={index} mt="sm">
              <TextInput
                placeholder="食材名称"
                required
                {...form.getInputProps(`ingredients.${index}.name`)}
              />
              <TextInput
                placeholder="用量"
                required
                {...form.getInputProps(`ingredients.${index}.quantity`)}
              />
              <ActionIcon
                color="red"
                onClick={() => form.removeListItem("ingredients", index)}
              >
                <TbX size={16} />
              </ActionIcon>
            </Group>
          ))}
        </Box>

        <Box mt="md">
          <Group mb="xs">
            <strong>步骤</strong>
            <Button
              variant="light"
              size="xs"
              onClick={() => form.insertListItem("steps", { content: "" })}
            >
              <TbPlus size={16} />
            </Button>
          </Group>
          {form.values.steps.map((_, index) => (
            <Group key={index} mt="sm">
              <TextInput
                placeholder={`步骤 ${index + 1}`}
                required
                {...form.getInputProps(`steps.${index}.content`)}
              />
              <ActionIcon
                color="red"
                onClick={() => form.removeListItem("steps", index)}
              >
                <TbX size={16} />
              </ActionIcon>
            </Group>
          ))}
        </Box>

        <Group mt="xl">
          <Button type="submit">提交</Button>
        </Group>
      </form>
    </Container>
  );
}
