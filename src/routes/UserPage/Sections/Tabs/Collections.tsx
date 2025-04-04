import {
  Button,
  Checkbox,
  Grid,
  Group,
  Menu,
  NavLink,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useEffect, useState } from "react";
import {
  TbDots,
  TbEdit,
  TbFolder,
  TbFolderPlus,
  TbTrash,
} from "react-icons/tb";

import {
  useCollection,
  useCollectionDeleteMutation,
  useCollectionEditMutation,
  useCollectionMutation,
  useCollections,
  useCurrentUser,
} from "@/client/hooks";
import { CollectionType } from "@/client/types";
import RecipeGrid from "@/components/RecipeGrid";

interface Props {
  userId: number;
}

interface CollectionFormProps {
  name: string;
  isPublic: boolean;
  description: string;
}

function CollectionDetail({ id }: { id: number }) {
  const { collection } = useCollection(id);

  if (!collection) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <RecipeGrid recipes={collection.recipes} />
    </div>
  );
}

function CollectionForm({
  initialValues,
  onSubmit,
}: {
  initialValues?: CollectionFormProps;
  onSubmit: (values: CollectionFormProps) => void;
}) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues,
    validate: {
      name: (value) => (value.length > 0 ? null : "名称不能为空"),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onSubmit(values);
        modals.closeAll();
      })}
    >
      <TextInput
        withAsterisk
        label="名称"
        placeholder="快来给你的收藏夹命名吧"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />

      <Textarea
        mt="md"
        label="描述"
        key={form.key("description")}
        placeholder="可以简单描述一下你的收藏夹"
        autosize
        minRows={2}
        maxRows={5}
        {...form.getInputProps("description")}
      />

      <Checkbox
        mt="md"
        label="公开"
        key={form.key("isPublic")}
        {...form.getInputProps("isPublic", { type: "checkbox" })}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit" fullWidth>
          确定
        </Button>
      </Group>
    </form>
  );
}

function CollectionCreate() {
  const { trigger } = useCollectionMutation();

  return (
    <CollectionForm
      initialValues={{ name: "", isPublic: false, description: "" }}
      onSubmit={trigger}
    />
  );
}

function CollectionEdit({
  initialValues,
  id,
}: {
  initialValues: CollectionFormProps;
  id: string | number;
}) {
  const { trigger } = useCollectionEditMutation(id);

  return <CollectionForm initialValues={initialValues} onSubmit={trigger} />;
}

export default function UserPageCollectionsTab({ userId }: Props) {
  const { collections } = useCollections(userId);
  const { user } = useCurrentUser();
  const [currentCollectionId, setCurrentCollectionId] = useState<
    number | undefined
  >();
  const { trigger: deleteCollection } = useCollectionDeleteMutation();

  useEffect(() => {
    setCurrentCollectionId(collections?.[0]?.id);
  }, [collections]);

  return (
    <Grid>
      <Grid.Col span={3}>
        {user?.id === userId && (
          <>
            <NavLink
              label="新建收藏夹"
              leftSection={<TbFolderPlus size={20} />}
              onClick={(e) => {
                modals.open({
                  title: "新建收藏夹",
                  children: <CollectionCreate />,
                });
                e.stopPropagation();
              }}
            />
          </>
        )}
        {collections?.map((collection) => (
          <NavLink
            key={collection.id}
            active={currentCollectionId === collection.id}
            label={collection.name}
            description={collection.description}
            leftSection={<TbFolder size={20} />}
            onClick={() => setCurrentCollectionId(collection.id)}
            rightSection={
              collection.type === CollectionType.MANUAL &&
              user?.id === userId && (
                <Menu trigger="hover">
                  <Menu.Target>
                    <TbDots size={20} />
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={<TbEdit size={14} />}
                      onClick={(e) => {
                        modals.open({
                          title: "收藏夹信息",
                          children: (
                            <CollectionEdit
                              id={collection.id}
                              initialValues={{
                                ...collection,
                                description: collection.description || "",
                              }}
                            />
                          ),
                        });
                        e.stopPropagation();
                      }}
                    >
                      编辑信息
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<TbTrash size={14} />}
                      onClick={(e) => {
                        modals.openConfirmModal({
                          title: "确认提示",
                          children: <Text>确定删除这个收藏夹吗？</Text>,
                          labels: { confirm: "确定", cancel: "取消" },
                          onConfirm: () => {
                            deleteCollection(collection.id);
                          },
                        });
                        e.stopPropagation();
                      }}
                    >
                      删除
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )
            }
          />
        ))}
      </Grid.Col>
      <Grid.Col span={9}>
        {currentCollectionId && <CollectionDetail id={currentCollectionId} />}
      </Grid.Col>
    </Grid>
  );
}
