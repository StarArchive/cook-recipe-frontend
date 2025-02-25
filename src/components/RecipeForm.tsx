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
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { TbPlus, TbX } from "react-icons/tb";
import { useLocation } from "wouter";

import { createRecipe, uploadRecipeCovers } from "@/client";
import { CreateRecipeDto } from "@/client/types";

import GalleryPhotoPicker from "./GalleryPhotoPicker";

export default function RecipeForm() {
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm<CreateRecipeDto>({
    initialValues: {
      title: "",
      description: "",
      published: false,
      ingredients: [],
      steps: [],
      images: [],
    },

    transformValues: (values) => ({
      ...values,
      steps: values.steps.map((step, idx) => ({
        step: idx,
        content: step.content,
      })),
    }),
  });
  const [pending, setPending] = useState(false);

  const uploadMutation = useMutation({
    mutationFn: uploadRecipeCovers,
    onSuccess: (data) => {
      const images = data
        .filter((response) => response.status !== "rejected")
        .map((file) => ({
          url: `/uploads/${file.value.filename}`,
        }));

      mutation.mutate({
        ...form.getTransformedValues(),
        images,
      });
    },
    onError: (error) => {
      notifications.show({
        title: "上传图片失败",
        message: error.message || "未知错误",
        color: "red",
        position: "top-center",
      });
      setPending(false);
    },
  });

  const mutation = useMutation({
    mutationFn: async (recipe: CreateRecipeDto) => {
      await createRecipe(recipe);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes/list"] });
      notifications.show({
        title: "创建食谱成功",
        message: "发布成功！\n即将跳转到食谱页",
        color: "green",
        position: "top-center",
        autoClose: 1500,
      });
      navigate("/");
    },
    onError: (error) => {
      notifications.show({
        title: "创建食谱失败",
        message: error.message || "未知错误",
        color: "red",
        position: "top-center",
      });
      setPending(false);
    },
  });

  const handleSubmit = () => {
    setPending(true);
    uploadMutation.mutate(files);
  };

  return (
    <Container mx="auto" mt="xl">
      <GalleryPhotoPicker maxCount={5} onChange={setFiles} />
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
            autosize
            minRows={2}
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
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                <span className="font-semibold text-white">{index + 1}</span>
              </div>
              <Textarea
                className="w-1/2"
                placeholder={`步骤 ${index + 1}`}
                required
                autosize
                minRows={2}
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
          <Button type="submit" disabled={pending}>
            提交
          </Button>
        </Group>
      </form>
    </Container>
  );
}
