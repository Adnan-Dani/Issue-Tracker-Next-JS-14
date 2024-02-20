"use client";

import { Select } from "@radix-ui/themes";

const AssigneList = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assigne..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="1">Adnan</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneList;
