import { Link } from 'react-router-dom'

import { Stack, Text } from '@mantine/core'

export const HomePage = () => {
  return (
    <Stack spacing={'md'}>
      <Text>This is the home page</Text>
      <Link to={'/register'}>Go to Register page</Link>
      <Link to={'/login'}>Go to Login page</Link>
    </Stack>
  )
}
