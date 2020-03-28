import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'
import Routes from './routes'
import Global from './styles/global'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes />
        <Global />
      </div>
    </ThemeProvider>
  )
}
