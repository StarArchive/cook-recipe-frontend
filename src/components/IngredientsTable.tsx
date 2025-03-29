import { Anchor, Table, rem } from "@mantine/core";
import { Link, useLocation } from "wouter";

import type { RecipeIngredient } from "@/client/types";

interface Props {
  ingredients: RecipeIngredient[];
}

export default function IngredientsTable({ ingredients }: Props) {
  const [, navigate] = useLocation();

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
            <Table.Td>
              {ingredient.categoryId ? (
                <Anchor
                  component={Link}
                  onClick={() =>
                    navigate(
                      `/category/${ingredient.categoryId}?title=${encodeURIComponent(ingredient.name)}`,
                    )
                  }
                >
                  {ingredient.name}
                </Anchor>
              ) : (
                ingredient.name
              )}
            </Table.Td>
            <Table.Td>{ingredient.quantity}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
