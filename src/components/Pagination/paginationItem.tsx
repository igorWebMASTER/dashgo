import { Button } from "@chakra-ui/button";


interface PaginationItemProps{
  number: number;
  isCurrent?: boolean;
  onPageChange: (page : number) => void;
}

export function PaginationItem({
  isCurrent = false,
  onPageChange,
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
          onClick={() => onPageChange(number)}
          >
            {number}
        </Button>
    )
}