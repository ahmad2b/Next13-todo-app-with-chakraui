"use client";
import React from "react";
import { useState } from "react";
import Todo from "../types/TypeTodo";
import { HStack, Input, Button } from "@chakra-ui/react";

export default function AddTodo({ todos }: { todos: Todo[] }) {

  const [mytodo, setMytodo] = useState(todos);
  let [todoInput, setTodoInput] = useState("");

  const handleAdd = () => {
    let newTD = [...mytodo];
    newTD.push({ id: todos.length + 1, title: todoInput, completed: false });
    setMytodo(newTD);
    setTodoInput("");
  };

  return (
    <>
      <HStack p={8}>
        <Input
          variant="filled"
          placeholder="Add Todo"
          value={todoInput}
          onChange={(e) => {
            setTodoInput(e.target.value);
          }}
        />
        <Button p={4} onClick={handleAdd}>
          Add Todo
        </Button>
      </HStack>
    </>
  );
}
