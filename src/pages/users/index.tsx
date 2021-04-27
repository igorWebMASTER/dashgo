
import { Box, Button, Flex, Heading, Icon, Table, Th, Thead, Tr, Checkbox, Tbody, Td, Text, useBreakpointValue, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { useQuery } from 'react-query'

import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
 
export default function UserList(){
    const { data, isLoading, isFetching, error } = useQuery('users', async () => {
      const {data} =  await api.get('users')

      const users = data.users.map(user => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })
        }
      })
      
      return users;
  }, {
    staleTime: 1000 * 5 // 5 seconds
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/users')
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  // }, [])

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
                { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="5" />}
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
                {data.map(user => {
                  return(<Tr key={user.id}>
                    <Td px={["4" , "4" , "6"]}>
                        <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">{user.name}</Text>
                        <Text fontSize="sm" color="gray.300" >{user.email}</Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>{user.created_at}</Td>} 
                  </Tr>
                )})}
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