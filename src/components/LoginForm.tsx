import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-relay'
import { Link, useNavigate } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import * as Yup from 'yup'

import { useAuth } from '@/auth/useAuth'
import { LoginWithEmail } from '@/graphql/mutations/LoginWithEmail'
import { LoginWithEmailMutation } from '@/graphql/mutations/__generated__/LoginWithEmailMutation.graphql'
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
})
export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })

  const { signin } = useAuth()
  const store = useStore()
  const navigate = useNavigate()

  const [commitMutation] = useMutation<LoginWithEmailMutation>(LoginWithEmail)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    commitMutation({
      variables: { input: data },
      onCompleted: ({ LoginWithEmailMutation }) => {
        if (LoginWithEmailMutation?.error) {
          alert(`Credentials Error`)
          return
        }
        if (LoginWithEmailMutation?.token) {
          signin(LoginWithEmailMutation.token, () => {
            store.setUser({
              _id: LoginWithEmailMutation.me?._id,
              name: LoginWithEmailMutation.me?.name,
              email: LoginWithEmailMutation.me?.email,
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
        Login
      </Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="sm">
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
            {isSubmitting ? 'Loading...' : 'Login'}
          </Button>
          <Group position="apart" sx={{ marginTop: '12px' }}>
            <Text sx={{ fontSize: '14px' }}>Doesnt have an account yet? </Text>
            <Link to={'/register'}>
              <Anchor sx={{ fontSize: '14px' }}>Create One</Anchor>
            </Link>
          </Group>
        </Paper>
      </form>
    </Container>
  )
}
