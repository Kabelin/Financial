import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Container, Header } from './styles'
import EnhancedTable from '../../components/Table'
import api from '../../services/api'

export default function Home() {
  const [data, setData] = useState([])
  const [date, setDate] = useState()
  const [loading, setLoading] = useState(true)

  // TODO: Add employee field on tables

  const getIndex = (value) => {
    api
      .get(
        `postings?date=${value ? moment(value).format() : moment().format()}`
      )
      .then((res) => {
        setData(res.data.postings)
        setDate(value ? moment(value).format() : moment().format())
        setLoading(false)
      })
  }

  useEffect(() => getIndex(), [])
  return (
    <Container>
      <Header>Home</Header>
      <EnhancedTable
        loading={loading}
        setLoading={setLoading}
        getData={getIndex}
        rows={data}
        date={date}
        component="Home"
      />
    </Container>
  )
}
