import { Flex, Button , Stack} from '@chakra-ui/react';
import { FieldError, SubmitHandler, useForm, useFormState } from 'react-hook-form'
import { Input } from '../components/Form/Input';
import * as yup from 'yup'
import { yupResolver} from '@hookform/resolvers/yup'


type SignInFormData = {
  email: string;
  password: string;
  error: FieldError;
}

const signInFormData = yup.object().shape({
  email:yup.string().required('E-mail Obrigatório').email('Digite um e-mail válido'),
  password: yup.string().required('Digite uma senha')
})

export default function Home() {
  const {register, handleSubmit, formState, formState: { errors }} = useForm({
    resolver : yupResolver(signInFormData)
  })

  console.log(errors)
 
  const handleSignin:SubmitHandler<SignInFormData>  = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(values)
  }

  return (
    <Flex 
      w="100vw" 
      h="100vh"
      align="center" 
      justify="center"
    >
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignin)}
      >
        <Stack spacing={4}>
          <Input  
            type="email"
            name="email" 
            label="E-mail"
            error={errors.email}
            {...register} 
          
          />

          <Input
            type="password" 
            name="password" 
            label="Senha"
            error={errors.password}
            {...register} 
          />

        </Stack>

        <Button 
          type="submit"
          mt="6" 
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
