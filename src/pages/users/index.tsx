
import { Box, Button, Flex, Heading, Icon, Table, Th, Thead, Tr, Checkbox, Tbody, Td, Text, useBreakpointValue, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { useQuery } from 'react-query'

import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
 
export default function UserList(){
    const { data, isLoading, error } = useQuery('users', async () => {
      const response =  await fetch('http://localhost:3000/api/users');
      const data = await response.json();

      return data;
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
    .then(response => response.json())
    .then(data => console.log(data))
  })

  return (
    <Box>
      <Header />

      <Flex w="100%" mx="auto" px="6" >
        <Sidebar />

        <Box 
          flex="1" 
          borderRadius={8}  
          bg="gray.800"  
          p="8"
          mt="2" 
        >
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal">
                Usuários
              </Heading>

                <Link href="/users/create" passHref>
                  <Button
                    as="a"  
                    size="sm" 
                    fontSize="sm" 
                    colorScheme="pink" 
                    leftIcon={<Icon as={RiAddLine} fontSize="16"/>}
                  >
                    Criar novo
                  </Button>
                </Link>
            </Flex>
          {isLoading ? (
            <Flex justiyfy="center"> 
              <Spinner />
            </Flex>
          ) : error ? (
              <Text>Falha ao obter dados dos usuários.</Text>
          ) : (
            <>
              <Table colorScheme="whiteAlpha" >
              <Thead>
                <Tr>
                  <Th px={["4" , "4" , "6"]} color="gray.300" width="8">
                    <Checkbox colorScheme="pink" />
                  </Th>
                  <Th> Usuário</Th>
                  {isWideVersion && <Th>Data de cadastro</Th>} 
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td px={["4" , "4" , "6"]}>
                      <Checkbox colorScheme="pink" />
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight="bold">Igor Ribeiro</Text>
                      <Text fontSize="sm" color="gray.300" >igor_1917@hotmail.com</Text>
                    </Box>
                  </Td>
                  {isWideVersion && <Td>04 de Abril de 2021</Td>} 
                </Tr>
              </Tbody>
          </Table>

          <Pagination />
          </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}