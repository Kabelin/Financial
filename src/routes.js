import React from 'react'
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { MdMenu, MdHome, MdPeople } from 'react-icons/md'
import Employees from './pages/Employees'
import Home from './pages/Home'

export default function Routes() {
  const [state, setState] = React.useState({
    left: false,
  })
  const [active, setActive] = React.useState('Home')

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ left: open })
  }

  return (
    <BrowserRouter>
      <>
        <MdMenu className="menu" size={35} onClick={toggleDrawer(true)} />
        <Drawer anchor="left" open={state.left} onClose={toggleDrawer(false)}>
          <List style={{ padding: 0 }} onClick={toggleDrawer(false)}>
            {['Home', 'Funcionários'].map((text) => (
              <NavLink
                className="nav-link"
                key={text}
                exact
                onClick={() => setActive(text)}
                to={text === 'Home' ? '/' : '/employees'}
              >
                <ListItem selected={active === text} button>
                  <ListItemIcon>
                    {text === 'Home' ? (
                      <MdHome size={30} />
                    ) : (
                      <MdPeople size={30} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Drawer>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/employees" component={Employees} />
        </Switch>
      </>
    </BrowserRouter>
  )
}
