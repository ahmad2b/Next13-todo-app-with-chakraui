'use client';
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

type Props = {
    children: React.ReactNode
}

const ChakraWrapper = ({ children }: Props) => {
  return (
    <ChakraProvider>{children}</ChakraProvider>
  )
}

export default ChakraWrapper;
