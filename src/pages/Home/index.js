import React, { useState, useEffect } from 'react'
import api from '../../services/api'

import { Container, Header } from './styles'
import EnhancedTable from '../../components/Table'

export default function Home() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('employees')
      .then((res) => {
        setData(res.data)
        setLoading(false)
      })
      .catch(() => {
        alert('Não foi possível carregar os dados! Tente novamente mais tarde!')
      })
  }, [data, loading])

  return (
    <Container>
      <Header>Home</Header>
      <EnhancedTable data={data} component="Home" />
    </Container>
  )
}
