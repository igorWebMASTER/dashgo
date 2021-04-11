import { Button } from "@chakra-ui/button";


interface PaginationItemProps{
  number: number;
  isCurrent?: boolean;
}

export function PaginationItem({
  isCurrent = false,
  number
}: PaginationItemProps){

    if(isCurrent){
      return (
        <Button
          size="sm"
          fontSize="xs"
          width="4"
          colorScheme="pink"
          disabled
          _disabled={{
            bg: 'pink.500',
            cursor: 'default'
          }}
        >
            {number}
        </Button>
      )
    }


    return (
        <Button
          size="sm"
          fontSize="xs"
          width="4"
          colorScheme="pink"
          _hover={{
            bg: 'pink.800',
          }}
          >
            {number}
        </Button>
    )
}