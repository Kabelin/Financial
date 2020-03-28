import { FaBars, FaTrash } from 'react-icons/fa'
import React from 'react'
import Drawer from '../../components/Drawer'
import api from '../../services/api'
import './styles.css'

export default function Employees() {
  return (
    <>
      <Drawer />
      <FaBars
        data-drawer-trigger
        aria-controls="drawer-name"
        aria-expanded="false"
        className="toggle-button"
      />
      <div className="employees-container">
        <h1>Funcionários</h1>

        <ul className="data-container">
          <li className="list-header">
            <span>Nome</span>
            <span style={{ textAlign: 'center' }}>Saldo</span>
            <span style={{ textAlign: 'end' }}>Ações</span>
          </li>
          {/* {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.name}</p>
          </li>
        ))} */}

          <li>
            <span>João</span>

            <span style={{ textAlign: 'center' }}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(120)}
            </span>
            <FaTrash
              style={{ marginLeft: 'auto', marginRight: 25 }}
              size={18}
              fontWeight="bold"
            />
          </li>
          <li>
            <span>Felipe</span>

            <span style={{ textAlign: 'center' }}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(120)}
            </span>
            <FaTrash
              style={{ marginLeft: 'auto', marginRight: 25 }}
              size={18}
              fontWeight="bold"
            />
          </li>
        </ul>
      </div>
    </>
  )
}
