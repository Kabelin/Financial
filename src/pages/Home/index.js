import { FaBars } from 'react-icons/fa'
import React, { useEffect, useState } from 'react'
import Drawer from '../../components/Drawer'
import api from '../../services/api'

import './styles.css'

export default function Home() {
  const [incidents, setIncidents] = useState([])

  useEffect(() => {
    api.get('ongs').then((res) => {
      setIncidents(res.data)
    })
  }, [])

  return (
    <>
      <Drawer />
      <FaBars
        data-drawer-trigger
        aria-controls="drawer-name"
        aria-expanded="false"
        className="toggle-button"
      />
      <div className="balance-sheet-container">
        <h1>Balancete de Março</h1>

        <form onSubmit={() => {}}>
          <select defaultValue="">
            <option value="" disabled>
              Selecione um mês
            </option>
            <option value="Março">Março</option>
            <option value="Abril">Abril</option>
            <option value="Maio">Maio</option>
          </select>
          <select defaultValue="">
            <option value="" disabled>
              Selecione um funcionário
            </option>
            <option value="João">João</option>
            <option value="José">José</option>
          </select>
          <button type="submit">Buscar</button>
        </form>
        <ul>
          <li className="list-header">
            <span>Nome</span>
            <span>Data</span>
            <span>Tipo</span>
            <span>Valor</span>
          </li>
          {/* {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.name}</p>
          </li>
        ))} */}

          <li>
            <span>João</span>
            <span>18/02</span>
            <span>Crédito</span>
            <span>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(120)}
            </span>
          </li>
          <li>
            <span>João</span>
            <span>18/02</span>
            <span>Crédito</span>
            <span>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(120)}
            </span>
          </li>
          <li>
            <span>João</span>
            <span>18/02</span>
            <span>Crédito</span>
            <span>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(120)}
            </span>
          </li>
          <li>
            <span>João</span>
            <span>18/02</span>
            <span>Crédito</span>
            <span>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(120)}
            </span>
          </li>
          <li>
            <span>João</span>
            <span>18/02</span>
            <span>Crédito</span>
            <span>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(120)}
            </span>
          </li>
        </ul>
      </div>
    </>
  )
}
