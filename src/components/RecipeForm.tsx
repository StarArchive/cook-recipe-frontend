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
import { useState } from "react";
import { TbPlus, TbX } from "react-icons/tb";
import useSWRMutation from "swr/mutation";
import { useLocation } from "wouter";

import { createRecipe, uploadRecipeCovers } from "@/client";
import type { CreateRecipeDto } from "@/client/types";

import GalleryPhotoPicker from "./GalleryPhotoPicker";

const RECIPE_FORM_CONFIG = {
  initialValues: {
    title: "",
    description: "",
    published: false,
    ingredients: [],
    steps: [],
    images: [],
  },

  transformValues: (values: CreateRecipeDto) => ({
    ...values,
    steps: values.steps.map((step, idx) => ({
      order: idx,
      content: step.content,
      images: step.images,
    })),
  }),
};

export default function RecipeForm() {
  const [, navigate] = useLocation();
  const [files, setFiles] = useState<File[]>([]);
  const [stepFiles, setStepFiles] = useState<File[]>([]);

  const form = useForm<CreateRecipeDto>(RECIPE_FORM_CONFIG);
  const uploadMutation = useSWRMutation(
    "/upload",
    (_url, { arg }: { arg: File[] }) => uploadRecipeCovers(arg),
    {
      onError: (error) => {
        notifications.show({
          title: "上传图片失败",
          message: error.message || "未知错误",
          color: "red",
          position: "top-center",
        });
      },
    },
  );

  const uploadImages = async (files: File[]) => {
    const responses = await uploadMutation.trigger(files);
    return responses
      .filter((response) => response.status !== "rejected")
      .map((file) => `/uploads/${file.value.filename}`);
  };

  const mutation = useSWRMutation(
    "/recipes/new",
    (_url, { arg }: { arg: CreateRecipeDto }) => createRecipe(arg),
    {
      onSuccess: () => {
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
      },
    },
  );

  const handleSubmit = async () => {
    const uploadedStepsImages = await uploadImages(stepFiles);
    const values = form.getTransformedValues();
    const steps = values.steps.map((step, idx) => ({
      ...step,
      images: uploadedStepsImages[idx] ? [uploadedStepsImages[idx]] : [],
    }));
    
    const uploadedCovers = await uploadImages(files);

    mutation.trigger({
      ...values,
      images: uploadedCovers,
      steps,
    });
  };

  return (
    <Container mx="auto" mt="xl">
      <div className="mb-4">
        <GalleryPhotoPicker maxCount={5} onChange={setFiles} />
      </div>
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
            <Group key={index} mt="sm" align="center">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                <span className="font-semibold text-white">{index + 1}</span>
              </div>
              <Textarea
                className="w-1/2"
                placeholder={`步骤 ${index + 1}`}
                required
                autosize
                minRows={3}
                {...form.getInputProps(`steps.${index}.content`)}
              />
              <GalleryPhotoPicker maxCount={1} onChange={setStepFiles} />
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
          <Button type="submit" disabled={mutation.isMutating}>
            提交
          </Button>
        </Group>
      </form>
    </Container>
  );
}
