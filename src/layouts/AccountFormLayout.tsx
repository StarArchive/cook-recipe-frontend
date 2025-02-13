import { Flex, Paper, Title } from "@mantine/core";
import { JSX, ReactNode } from "react";

interface Props {
  title: string;
  children?: JSX.Element | ReactNode;
}

export default function AccountFormLayout({ title, children }: Props) {
  return (
    <Flex mih="100vh">
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Title
            order={2}
            className="mt-6 text-center text-2xl font-bold tracking-tight"
          >
            {title}
          </Title>
          <h2></h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <Paper shadow="sm" withBorder p="xl">
            {children}
          </Paper>
        </div>
      </div>
    </Flex>
  );
}
