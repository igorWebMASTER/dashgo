import { Box, Stack, Text , Link, Icon} from "@chakra-ui/react";
import { RiDashboardLine, RiContactsLine, RiInputMethodLine, RiGitMergeLine } from "react-icons/ri";


export function Sidebar(){
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
          <Box>
            <Text fontweight="bold" color="gray.400"  fontSize="small" >
                Geral
            </Text>
            <Stack spacing="4" mt="8" align="stretch" >
              <Link display="flex" align="center">
                <Icon  as={RiDashboardLine} fontSize="20" />
                <Text ml="4" fontweight="medium">Dashboard</Text>
              </Link>
            </Stack>
            <Stack spacing="4" mt="8" align="stretch" >
              <Link display="flex" align="center"  >
                <Icon  as={RiContactsLine} fontSize="20" />
                <Text ml="4" fontweight="medium">Usuários</Text>
              </Link>
            </Stack>
          </Box>
          <Box>
            <Text fontweight="bold" color="gray.400"  fontSize="small" >
                AUTOMAÇÃO
            </Text>
            <Stack spacing="4" mt="8" align="stretch" >
              <Link display="flex" align="center">
                <Icon  as={RiInputMethodLine} fontSize="20" />
                <Text ml="4" fontweight="medium">Formulários</Text>
              </Link>
            </Stack>
            <Stack spacing="4" mt="8" align="stretch" >
              <Link display="flex" align="center"  >
                <Icon  as={RiGitMergeLine} fontSize="20" />
                <Text ml="4" fontweight="medium">Usuários</Text>
              </Link>
            </Stack>
          </Box>
      </Stack>
    </Box>
  )  
}