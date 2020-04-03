import React from 'react'
import EnhancedTable from '../../components/Table'
import { Container, Header } from './styles'

export default function Employees() {
  return (
    <Container>
      <Header>Funcionários</Header>
      <EnhancedTable component="Employees" />
    </Container>
  )
}
