import { Checkbox, Flex, Heading } from "@radix-ui/themes";

function OptionListCC({ header, options }) {
  console.log(options);
  return (
    <Flex direction="column" gap="1">
      <Heading as="h3">{header}</Heading>
      {options.map((opt) => (
        <Flex key={opt}>
          <Checkbox />
          <label>{opt}</label>
        </Flex>
      ))}
    </Flex>
  );
}

export default OptionListCC;
