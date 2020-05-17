import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Container, Header } from './styles'
import EnhancedTable from '../../components/Table'
import api from '../../services/api'

export default function Home() {
  const [data, setData] = useState([])
  const [date, setDate] = useState(moment().format())
  const [loading, setLoading] = useState(true)

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

  const handleNewPosting = async (post) => {
    const form = {
      description: post.description,
      type: post.type,
      value: post.value,
      employee: post.employee.name,
      employeeId: post.employee.id,
    }
    try {
      await api.post('postings', form)
    } catch (error) {
      // TODO
      alert(error)
    } finally {
      getIndex()
    }
  }

  useEffect(() => getIndex(), [])
  return (
    <Container>
      <Header>Home</Header>
      <EnhancedTable
        loading={loading}
        handleNewPosting={handleNewPosting}
        setLoading={setLoading}
        getData={getIndex}
        rows={data}
        date={date}
        component="Home"
      />
    </Container>
  )
}
