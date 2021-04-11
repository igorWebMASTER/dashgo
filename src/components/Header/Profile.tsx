import { Avatar, Box, Flex, Text} from '@chakra-ui/react';

export function Profile(){
  return (
    <Flex align="center">
        <Box mr="4" textAlign="right">
          <Text>Diego Fernandes</Text>
          <Text color="gray.300" fontSize="small">
            igor_1917@hotmail.com
          </Text>
        </Box>

        <Avatar size="md" name="Diego Fernandes" />
    </Flex>
  )
}