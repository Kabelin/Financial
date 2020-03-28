import React from 'react'
import './styles.css'
import { FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import drawer from './DrawerEvents'

export default function Drawer() {
  drawer()

  return (
    <section
      className="drawer drawer--left"
      id="drawer-name"
      data-drawer-target
    >
      <div className="drawer__overlay" data-drawer-close tabIndex="-1" />
      <div className="drawer__wrapper">
        <div className="drawer__header">
          <div className="drawer__title">Financial App</div>
          <FaTimes
            size={20}
            type="button"
            className="drawer__close"
            data-drawer-close
            aria-label="Close Drawer"
          />
        </div>
        <div className="drawer__content">
          <ul className="nav">
            <NavLink exact to="/" activeClassName="active" className="nav-item">
              Balancetes
            </NavLink>
            <NavLink
              exact
              to="/employees"
              activeClassName="active"
              className="nav-item"
            >
              Funcionários
            </NavLink>
          </ul>
        </div>
      </div>
    </section>
  )
}
