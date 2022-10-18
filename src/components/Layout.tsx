import { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  AppShell,
  Aside,
  Burger,
  Center,
  Footer,
  Header,
  MediaQuery,
  Navbar,
  ScrollArea,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { IconShield, IconSword } from '@tabler/icons'

import { NavBarContent } from './NavBar'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const [opened, setOpened] = useState(false)
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <NavBarContent />
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Text>Application sidebar</Text>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={60} p="md">
          <Center>Created By Sammy</Center>
        </Footer>
      }
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Center sx={{ gap: '30px', width: '100%' }}>
              <IconSword size={40} />
              <Title sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                Web Duelist
              </Title>
              <IconShield size={40} />
            </Center>
          </div>
        </Header>
      }
    >
      <ScrollArea>{children}</ScrollArea>
    </AppShell>
  )
}
