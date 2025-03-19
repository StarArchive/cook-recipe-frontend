import { Button, Text } from "@mantine/core";

interface Props {
  icon: React.ReactNode;
  text: string;
  onActionClick: () => void;
}

export default function UserActionItem({ icon, text, onActionClick }: Props) {
  return (
    <Button leftSection={icon} variant="default" bd={0} onClick={onActionClick}>
      <Text size="sm">{text}</Text>
    </Button>
  );
}
