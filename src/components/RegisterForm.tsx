import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-relay'
import { useNavigate } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Container, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import * as Yup from 'yup'

import { useAuth } from '@/auth/useAuth'
import { RegisterWithEmail } from '@/graphql/mutations/RegisterWithEmail'
import { RegisterWithEmailMutation } from '@/graphql/mutations/__generated__/RegisterWithEmailMutation.graphql'
import { useStore } from '@/store/useStore'

type Inputs = {
  name: string
  email: string
  password: string
}

const schema = Yup.object({
  email: Yup.string().email('The supplied email is invalid').required('Email is required'),
  password: Yup.string()
    .min(6, 'The password must be at least 6 characters long')
    .required('Password is required'),
  name: Yup.string().required('A username is required'),
})
export function RegisterForm() {
  const { signin } = useAuth()
  const store = useStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })

  const navigate = useNavigate()

  const [commitMutation] = useMutation<RegisterWithEmailMutation>(RegisterWithEmail)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    commitMutation({
      variables: { input: data },
      onCompleted: ({ RegisterWithEmailMutation }, error) => {
        if (RegisterWithEmailMutation?.error || error) {
          alert(`Registration Error`)
          navigate('/')
          return
        }
        if (RegisterWithEmailMutation?.token) {
          signin(RegisterWithEmailMutation.token, () => {
            store.setUser({
              _id: RegisterWithEmailMutation.me?._id,
              name: RegisterWithEmailMutation.me?.name,
              email: RegisterWithEmailMutation.me?.email,
            })
            navigate('/', { replace: true })
          })
        }
      },
    })
  }

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome!
      </Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="sm">
          <TextInput {...register('name')} label="Name" placeholder="you@mantine.dev" required />
          {errors.name && (
            <Text size={'xs'} color="red">
              {errors.name.message}
            </Text>
          )}
          <TextInput {...register('email')} label="Email" placeholder="you@mantine.dev" required />
          {errors.email && (
            <Text size={'xs'} color="red">
              {errors.email.message}
            </Text>
          )}
          <PasswordInput
            {...register('password')}
            label="Password"
            placeholder="Your password"
            required
          />
          {errors.password && (
            <Text size={'xs'} color="red">
              {errors.password.message}
            </Text>
          )}
          <Button fullWidth mt="xl" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Loading...' : 'Create Account'}
          </Button>
        </Paper>
      </form>
    </Container>
  )
}
