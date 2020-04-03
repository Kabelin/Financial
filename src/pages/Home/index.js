import React from 'react'

import { Container, Header } from './styles'
import EnhancedTable from '../../components/Table'

export default function Home() {
  return (
    <Container>
      <Header>Home</Header>
      <EnhancedTable component="Home" />
    </Container>
  )
}
