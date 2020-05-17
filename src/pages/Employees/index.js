import React, { useState, useEffect } from 'react'
import EnhancedTable from '../../components/Table'
import { Container, Header } from './styles'
import api from '../../services/api'

export default function Employees() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const getIndex = () => {
    api.get('employees').then((res) => {
      setData(res.data)
      setLoading(false)
    })
  }

  const handleNewEmployee = async (employee) => {
    try {
      await api.post('employees', { name: employee })
    } catch (error) {
      // TODO
      // alert('Erro ao cadastrar funcionário, tente novamente')
    } finally {
      setLoading(true)
      getIndex()
    }
  }

  useEffect(() => getIndex(), [])

  return (
    <Container>
      <Header>Funcionários</Header>

      <EnhancedTable
        loading={loading}
        setLoading={setLoading}
        handleNewEmployee={handleNewEmployee}
        rows={data}
        getData={getIndex}
        component="Employees"
      />
    </Container>
  )
}
