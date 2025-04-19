import {
  ActionIcon,
  Anchor,
  Avatar,
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title,
  Transition,
} from "@mantine/core";
import { useDisclosure, useScrollIntoView } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import markdownit from "markdown-it";
import { useEffect, useMemo, useState } from "react";
import {
  TbArrowsMaximize,
  TbArrowsMinimize,
  TbEdit,
  TbMessage,
  TbSend,
  TbStar,
  TbX,
} from "react-icons/tb";
import { Link, useLocation } from "wouter";

import { getImageUrl } from "@/client";
import {
  getUserDisplayName,
  useAddRecipeToCollectionsMutation,
  useChatRecipeMutation,
  useCollections,
  useCollectionsByRecipeId,
  useCurrentUser,
  useRecipe,
  useUserProfile,
} from "@/client/hooks";
import type { Collection, Recipe, RecipeChatMessageDto } from "@/client/types";
import ImagesCarousel from "@/components/ImagesCarousel";
import IngredientsTable from "@/components/IngredientsTable";
import RecipeStep from "@/components/RecipeStep";
import RootLayout from "@/layouts/RootLayout";

import NotFound from "./NotFound";

const md = markdownit();

interface Props {
  id: string;
}

enum MessageRole {
  USER = "user",
  SYSTEM = "system",
  ASSISTANT = "assistant",
}

function RecipeChat({ recipeId }: { recipeId: string }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { user } = useCurrentUser();
  const { profile } = useUserProfile(user?.id.toString());
  const { trigger, isMutating } = useChatRecipeMutation(
    Number.parseInt(recipeId),
  );
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<RecipeChatMessageDto[]>([]);

  const { scrollIntoView, scrollableRef, targetRef } =
    useScrollIntoView<HTMLDivElement>({
      duration: 200,
      offset: 20,
    });

  const [isExpanded, setIsExpanded] = useState(false);
  const defaultSize = { width: 320, height: 400 };
  const expandedSize = { width: 500, height: 600 };

  useEffect(() => {
    if (messages.length > 0) {
      scrollIntoView({
        alignment: "end",
      });
    }
  }, [messages, scrollIntoView]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !user || !profile || isMutating) return;

    const userMessage: RecipeChatMessageDto = {
      role: MessageRole.USER,
      content: message,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setMessage("");

    try {
      const response = await trigger({ messages: updatedMessages });

      if (response && response.message) {
        const assistantMessage: RecipeChatMessageDto = {
          role: MessageRole.ASSISTANT,
          content: response.message,
        };
        setMessages([...updatedMessages, assistantMessage]);
      }
    } catch (error) {
      console.error("Chat error:", error);
    }
  };

  return (
    <>
      <Transition mounted={opened} transition="slide-left" duration={300}>
        {(styles) => (
          <Paper
            style={{
              ...styles,
              position: "fixed",
              right: 20,
              bottom: 80,
              width: isExpanded ? expandedSize.width : defaultSize.width,
              height: isExpanded ? expandedSize.height : defaultSize.height,
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              transition: "width 0.3s, height 0.3s",
            }}
            shadow="md"
            withBorder
          >
            <Group p="xs" bg="blue.6" style={{ color: "white" }}>
              <TbMessage size={20} />
              <Text fw={500} size="sm">
                Deepseek 问答
              </Text>
              <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
                {/* Expand/collapse button */}
                <ActionIcon
                  variant="transparent"
                  color="white"
                  onClick={toggleExpand}
                  title={isExpanded ? "收起" : "展开"}
                >
                  {isExpanded ? (
                    <TbArrowsMinimize size={18} />
                  ) : (
                    <TbArrowsMaximize size={18} />
                  )}
                </ActionIcon>
                {/* Close button */}
                <ActionIcon variant="transparent" color="white" onClick={close}>
                  <TbX size={18} />
                </ActionIcon>
              </div>
            </Group>

            <ScrollArea style={{ flex: 1 }} viewportRef={scrollableRef} p="xs">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 ${
                    msg.role === MessageRole.USER ? "text-right" : "text-left"
                  }`}
                >
                  <Stack gap="xs">
                    <Group
                      gap="xs"
                      justify={
                        msg.role === MessageRole.USER
                          ? "flex-end"
                          : "flex-start"
                      }
                    >
                      {msg.role !== MessageRole.USER && (
                        <Avatar color="blue" radius="xl" size="sm">
                          AI
                        </Avatar>
                      )}
                      <Text size="xs" c="dimmed">
                        {msg.role === MessageRole.USER
                          ? user?.name
                          : "Deepseek AI"}
                      </Text>
                      {msg.role === MessageRole.USER && (
                        <Avatar
                          src={
                            profile?.avatar &&
                            getImageUrl(profile.avatar).toString()
                          }
                          radius="xl"
                          size="sm"
                        />
                      )}
                    </Group>
                    <Paper
                      p="xs"
                      shadow="sm"
                      radius="md"
                      bg={msg.role === MessageRole.USER ? "blue.1" : "gray.0"}
                      className={`max-w-3/4 ${
                        msg.role === MessageRole.USER ? "ml-auto" : "mr-auto"
                      }`}
                    >
                      {msg.role === MessageRole.USER ? (
                        <Text size="sm">{msg.content}</Text>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: md.render(msg.content),
                          }}
                        />
                      )}
                    </Paper>
                  </Stack>
                </div>
              ))}
              {isMutating && (
                <div className="mb-3 text-left">
                  <Stack gap="xs">
                    <Group gap="xs" justify="flex-start">
                      <Avatar color="blue" radius="xl" size="sm">
                        AI
                      </Avatar>
                      <Text size="xs" c="dimmed">
                        Deepseek AI
                      </Text>
                    </Group>
                    <Paper
                      p="xs"
                      shadow="sm"
                      radius="md"
                      bg="gray.0"
                      className="mr-auto max-w-3/4"
                    >
                      <Text size="sm">思考中...</Text>
                    </Paper>
                  </Stack>
                </div>
              )}
              <div ref={targetRef} />
            </ScrollArea>

            <Group gap="xs" p="xs" style={{ borderTop: "1px solid #eee" }}>
              <TextInput
                placeholder="输入信息..."
                style={{ flex: 1 }}
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isMutating}
              />
              <ActionIcon
                size={36}
                color="blue"
                variant="filled"
                onClick={handleSendMessage}
                disabled={!message.trim() || isMutating}
                loading={isMutating}
              >
                <TbSend size={16} />
              </ActionIcon>
            </Group>
          </Paper>
        )}
      </Transition>

      <ActionIcon
        variant="filled"
        color="blue"
        radius="xl"
        size="xl"
        style={{
          position: "fixed",
          right: 30,
          bottom: 30,
          zIndex: 90,
        }}
        onClick={opened ? close : open}
      >
        <TbMessage size={24} />
      </ActionIcon>
    </>
  );
}

function RecipeStarForm({
  recipeId,
  collections,
  starredCollections,
}: {
  recipeId: string | number;
  collections: Collection[];
  starredCollections: Collection[];
}) {
  const [value, setValue] = useState<string[]>(
    starredCollections.map((c) => c.id.toString()),
  );
  const { trigger } = useAddRecipeToCollectionsMutation(recipeId);

  return (
    <>
      <Checkbox.Group value={value} onChange={setValue}>
        <Stack mt="xs">
          {collections.map((collection) => (
            <Checkbox
              key={collection.id}
              label={`${collection.name}${!collection.isPublic ? " [私密]" : ""}`}
              value={collection.id.toString()}
            />
          ))}
        </Stack>
      </Checkbox.Group>

      <Group justify="flex-end" mt="md">
        <Button
          fullWidth
          onClick={() => {
            trigger({
              collectionIds: value.map((collectionId) =>
                Number.parseInt(collectionId),
              ),
            });
            modals.closeAll();
          }}
        >
          确定
        </Button>
      </Group>
    </>
  );
}

function RecipeStar({ recipe }: { recipe: Recipe }) {
  const { collections } = useCollections();
  const { collections: starredCollections } = useCollectionsByRecipeId(
    recipe.id,
  );

  return (
    <ActionIcon
      variant="subtle"
      size="lg"
      color={
        starredCollections && starredCollections.length > 0 ? "yellow" : "gray"
      }
      onClick={() =>
        modals.open({
          title: "添加到收藏夹",
          children: (
            <RecipeStarForm
              recipeId={recipe.id}
              collections={collections!}
              starredCollections={starredCollections!}
            />
          ),
        })
      }
    >
      <TbStar size={20} />
    </ActionIcon>
  );
}

export default function Recipe({ id }: Props) {
  const [, navigate] = useLocation();
  const { user } = useCurrentUser();
  const { recipe, isLoading } = useRecipe(id);
  const avatarUrl = useMemo(
    () =>
      recipe?.author.profile.avatar &&
      getImageUrl(recipe.author.profile.avatar).toString(),
    [recipe?.author],
  );
  const displayName = useMemo(
    () => recipe?.author && getUserDisplayName(recipe.author),
    [recipe?.author],
  );

  if (isLoading)
    return (
      <RootLayout>
        <Container>
          <Stack gap="xl">
            <Stack gap="lg">
              <Title order={1}>加载中...</Title>
            </Stack>
          </Stack>
        </Container>
      </RootLayout>
    );
  if (!recipe) return <NotFound />;

  return (
    <RootLayout>
      <Container>
        <Stack gap="xl">
          <Stack gap="lg">
            <Title className="flex items-center gap-1" order={1}>
              {recipe.title}
              {user?.id === recipe.author.id && (
                <ActionIcon
                  variant="subtle"
                  size="lg"
                  onClick={() => {
                    navigate(`/recipe/${id}/edit`);
                  }}
                >
                  <TbEdit size={20} />
                </ActionIcon>
              )}
              {recipe.published && <RecipeStar recipe={recipe} />}
            </Title>
            <ImagesCarousel images={recipe.images} title={recipe.title} />
            <Divider my="md" />

            <Group
              gap="xs"
              onClick={() => navigate(`/user/${recipe.author.id}`)}
            >
              <Avatar
                src={avatarUrl}
                alt={displayName || ""}
                className="cursor-pointer"
              ></Avatar>
              <Anchor underline="never" component={Link}>
                {recipe.author.name}
              </Anchor>
            </Group>

            <Text>{recipe.description}</Text>
          </Stack>

          <Stack gap="lg">
            <Title order={2}>用料</Title>
            <IngredientsTable ingredients={recipe.ingredients} />
          </Stack>

          <Stack gap="lg">
            <Title order={2}>{recipe.title}的做法</Title>
            <RecipeStep steps={recipe.steps} />
          </Stack>
        </Stack>
      </Container>

      <RecipeChat recipeId={id} />
    </RootLayout>
  );
}
