import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Container, Header } from './styles'
import EnhancedTable from '../../components/Table'
import api from '../../services/api'

export default function Home() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('postings').then((res) => {
      setData(res.data)
      setLoading(false)
    })
  }, [])
  return (
    <Container>
      <Header>Home</Header>
      {loading && <CircularProgress />}
      {!loading && <EnhancedTable rows={data} component="Home" />}
    </Container>
  )
}
