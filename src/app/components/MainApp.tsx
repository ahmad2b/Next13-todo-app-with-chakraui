"use client";
import React from "react";
import { useState } from "react";
import {
  Badge,
  Heading,
  VStack,
  Button,
  useColorMode,
  HStack,
  Input,
  Text,
  StackDivider,
  useToast
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import Todo from "../types/TypeTodo";

export default function MainApp() {

  const toast = useToast();  
  const { colorMode, toggleColorMode } = useColorMode();
  let [todos, setTodos] = useState<Todo[]>([]);
  let [todoInput, setTodoInput] = useState("");

  const handleMark = (todo: Todo) => {
    let newTD = todos.map((item) => {
      if (item.id === todo.id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setTodos(newTD);
  };

  const handleDelete = (todo: Todo) => {
    let newTD = [...todos];
    newTD = todos.filter((td) => {
      if (td === todo) {
        return false;
      }
      return true;
    });
    setTodos(newTD);
  };

  const handleAdd = () => {

    if (todoInput === '') {
        toast({
          title: 'Error',
          description: 'Please enter a todo',
          status: 'warning',
          duration: 2500,
          isClosable: true,
        })
    } else {
    let newTD = [...todos];
    newTD.push({ id: todos.length + 1, title: todoInput, completed: false });
    setTodos(newTD);
    setTodoInput("");
    }
  };

  return (
    <>
      <VStack margin={4}>
        {/* Dark/Light Mode Bar */}
        <Button alignSelf={"flex-end"} onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon w={6} h={6} /> : <SunIcon w={6} h={6} />}
        </Button>

        {/* ToDo App Heading */}
        <Heading as="h1" size="2xl">
          Isagi ToDo App
        </Heading>

        {/* Add More ToDos */}
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

            {/* Show Notodo Badge */}
        {todos.length === 0 ? (
          <Badge colorScheme={"red"} p={4} m={4} borderRadius={"lg"}>
            No Todos
          </Badge>
        ) : (
          <>
            <Badge colorScheme="green"  p={4} m={4} borderRadius={"lg"} >{todos.length} Todos</Badge>

            {/* <ListTodo todos={todos} /> */}
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
              {todos.map((todo) => (
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
        )}
      </VStack>
    </>
  );
}
