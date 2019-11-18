import { convertoCamelCase } from "./string";

it("should convert to SNAKE_CASE to lowerCamelCase", async () => {
  expect(convertoCamelCase("SNAKE_CASE")).toBe("snakeCase");
  expect(convertoCamelCase("LOWER_CAMEL_CASE")).toBe("lowerCamelCase");
  expect(convertoCamelCase("lowerCamelCase")).toBe("lowerCamelCase");
  expect(convertoCamelCase("lowercase")).toBe("lowercase");
  expect(convertoCamelCase("UPPERCASE")).toBe("UPPERCASE");
});
