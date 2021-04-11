import { Avatar, Box, Flex, Text} from '@chakra-ui/react';

interface ProfileProps{
  showProfileData?: boolean;
}

export function Profile({showProfileData =  true} : ProfileProps){
  return (
    <Flex align="center">
        {showProfileData && (
          <Box mr="4" textAlign="right">
            <Text>Diego Fernandes</Text>
            <Text color="gray.300" fontSize="small">
              igor_1917@hotmail.com
            </Text>
          </Box>
        )}

        <Avatar size="md" name="Diego Fernandes" src="http://github.com/diego3g.png"/>
    </Flex>
  )
}