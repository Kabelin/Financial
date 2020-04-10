import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import EnhancedTable from '../../components/Table'
import { Container, Header } from './styles'
import api from '../../services/api'

export default function Employees() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('employees').then((res) => {
      setData(res.data)
      setLoading(false)
    })
  }, [])
  return (
    <Container>
      <Header>Funcionários</Header>
      {loading && <CircularProgress />}
      {!loading && <EnhancedTable rows={data} component="Employees" />}
    </Container>
  )
}
