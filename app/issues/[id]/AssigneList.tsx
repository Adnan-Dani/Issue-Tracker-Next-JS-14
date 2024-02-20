"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import axios from "axios";

const AssigneList = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get<User[]>("/api/users");
      console.log(data);
      setUsers(data);
    };
    fetchUser();
  }, []);
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assigne..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneList;
