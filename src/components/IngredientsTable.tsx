import { Table, rem } from "@mantine/core";

import type { RecipeIngredient } from "@/client/types";

interface Props {
  ingredients: RecipeIngredient[];
}

export default function IngredientsTable({ ingredients }: Props) {
  return (
    <Table>
      <Table.Tbody>
        {ingredients.map((ingredient, index) => (
          <Table.Tr
            key={`ingredient-${index}`}
            style={{
              borderBottom: `${rem(1)} solid var(--table-border-color)`,
            }}
          >
            <Table.Td>{ingredient.ingredient.name}</Table.Td>
            <Table.Td>{ingredient.quantity}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
