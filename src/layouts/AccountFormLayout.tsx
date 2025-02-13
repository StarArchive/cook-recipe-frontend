import { Flex } from "@mantine/core";
import { JSX, ReactNode } from "react";

interface Props {
  title: string;
  children?: JSX.Element | ReactNode;
}

export default function AccountFormLayout({ title, children }: Props) {
  return (
    <Flex mih="screen" className="min-h-screen bg-gray-50">
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
            {children}
          </div>
        </div>
      </div>
    </Flex>
  );
}
