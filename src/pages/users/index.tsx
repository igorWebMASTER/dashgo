
import {useState} from 'react'
import { Box, Link, Button, Flex, Heading, Icon, Table, Th, Thead, Tr, Checkbox, Tbody, Td, Text, useBreakpointValue, Spinner } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import NextLink from "next/link";
import { GetServerSideProps } from 'next';

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useUsers, getUsers } from "../../services/hooks/useUsers";
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';


export default function UserList({ users }){
  const [page, setPage]  = useState(1)
  const { data, isLoading, isFetching, error } = useUsers(page, {
    initialData: users,
  })

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  async function handlePrefetchUser(userId: string){
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)

      return response.data;
    }, {
      staleTime: 1000 * 60 * 10, // 10 MINUTES FRESH
    })
  }

  return (
    <Box>
      <Header />

      <Flex 
        w="100%" 
          my="6" 
          maxWidth={1480} 
          mx="auto" 
          px="6"
      >
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

                <NextLink href="/users/create" passHref>
                  <Button
                    as="a"  
                    size="sm" 
                    fontSize="sm" 
                    colorScheme="pink" 
                    leftIcon={<Icon as={RiAddLine} fontSize="16"/>}
                  >
                    Criar novo
                  </Button>
                </NextLink>
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
                {data.users.map(user => {
                  return(<Tr key={user.id}>
                    <Td px={["4" , "4" , "6"]}>
                        <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Box>
                        <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                          <Text fontWeight="bold">{user.name}</Text>
                        </Link>
                        <Text fontSize="sm" color="gray.300" >{user.email}</Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>{user.createdAt}</Td>} 
                  </Tr>
                )})}
              </Tbody>
          </Table>

          <Pagination 
            totalCountOfRegisters={data.totalCount}
            currentPage={page}
            onPageChange={setPage}
          />
          </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

// export const getServerSideProps : GetServerSideProps = async () => {
//   const { users, totalCount } = await getUsers(1)

//   return {
//     props: {
//       users, 
//       totalCount
//     }
//   }
// }