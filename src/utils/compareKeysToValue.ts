export const compareKeysToValue = (
  schema: (string | Record<string, string[]>)[],
  targets: any[][],
): Record<string, any>[] => {
  return targets.map((target) =>
    schema.reduce<Record<string, any>>((acc, schemaItem, index) => {
      if (typeof schemaItem === "string") {
        if (target[index] != null) acc[schemaItem] = target[index];
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const [key, nestedSchema] = Object.entries(schemaItem)[0];
        const nestedValues = target[index];

        if (Array.isArray(nestedValues) && nestedValues.length > 0) {
          // Некоректно брать 0 элемент, но в нашем случаи backend отдает в таком формате
          acc[key] = compareKeysToValue(nestedSchema, [nestedValues])[0];
        }
      }

      return acc;
    }, {}),
  );
};
