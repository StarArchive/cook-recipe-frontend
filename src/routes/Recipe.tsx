import {
  Container,
  Flex,
  Image,
  List,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import RootLayout from "@/layouts/RootLayout";

export default function Recipe() {
  return (
    <RootLayout>
      <Container>
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap={{ base: "sm", sm: "lg" }}
          justify={{ sm: "center" }}
        >
          <Stack>
            <Title order={2}>薄饼</Title>
            <Image
              src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F02%2F17%2F21014-Good-old-Fashioned-Pancakes-mfs_002.jpg&q=60&c=sc&poi=auto&orient=true&h=512"
              alt="薄饼"
              height={300}
              fit="cover"
            />
          </Stack>
          <Stack>
            <Title order={2}>配方</Title>
            <List withPadding>
              <List.Item>1 杯面粉</List.Item>
              <List.Item>2 勺糖</List.Item>
              <List.Item>1 勺小苏打</List.Item>
              <List.Item>½ 勺盐</List.Item>
              <List.Item>1 杯牛奶</List.Item>
              <List.Item>1 个鸡蛋</List.Item>
              <List.Item>2 勺黄油</List.Item>
            </List>
            <Title order={2}>步骤</Title>
            <Title order={3}>第 1 步</Title>
            <Text>在一个碗中，混合面粉、糖、发酵粉和盐。</Text>
            <Title order={3}>第 2 步</Title>
            <Text>在另一个碗中，搅拌牛奶、鸡蛋、融化的黄油和香草精。</Text>
            <Title order={3}>第 3 步</Title>
            <Text>将湿的材料倒入干的材料中，搅拌至刚刚混合。</Text>
            <Title order={3}>第 4 步</Title>
            <Text>中火加热不粘锅，并轻轻涂油。</Text>
            <Title order={3}>第 5 步</Title>
            <Text>每个薄饼倒入1/4杯面糊。</Text>
            <Title order={3}>第 6 步</Title>
            <Text>煮至表面出现气泡，然后翻面煮至金黄色。</Text>
            <Title order={3}>第 7 步</Title>
            <Text>趁热配上你喜欢的配料食用。</Text>
          </Stack>
        </Flex>
      </Container>
    </RootLayout>
  );
}
