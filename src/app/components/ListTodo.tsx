"use client";
import React from "react";
import { VStack, HStack, Button, StackDivider, Text } from "@chakra-ui/react";
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import Todo from "../types/TypeTodo";
import { useState } from "react";

export default function ListTodo({ todos }: { todos: Todo[] }) {
  const [ltodo, setLTodo] = useState(todos);

  const handleMark = (todo: Todo) => {
    let newTD = ltodo.map((item) => {
      if (item.id === todo.id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setLTodo(newTD);
  };

  const handleDelete = (todo: Todo) => {
    let newTD = [...ltodo];
    newTD = ltodo.filter((td) => {
      if (td === todo) {
        return false;
      }
      return true;
    });

    setLTodo(newTD);
  };

  return (
    <>
      <VStack
        alignItems={"stretch"}
        divider={<StackDivider />}
        borderColor={"gray.50"}
        border={"2px"}
        p={4}
        borderRadius={"lg"}
        w={"100%"}
        maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
      >
        {ltodo.map((todo) => (
          <HStack key={todo.id} justify={"space-between"}>
            <Text
              color={""}
              textDecoration={todo.completed ? "line-through" : ""}
              key={todo.id}
            >
              {todo.title}
            </Text>

            <HStack justify={"flex-end"}>
              <Button
                colorScheme="green"
                size="sm"
                onClick={() => {
                  handleMark(todo);
                }}
              >
                <CheckIcon />
              </Button>

              <Button
                colorScheme="red"
                size="sm"
                onClick={() => {
                  handleDelete(todo);
                }}
              >
                <DeleteIcon />
              </Button>
            </HStack>
          </HStack>
        ))}
      </VStack>
    </>
  );
}
