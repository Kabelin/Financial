import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'
import { ptBR } from '@material-ui/core/locale'
import Routes from './routes'
import Global from './styles/global'

const theme = createMuiTheme(
  {
    palette: {
      type: 'dark',
      primary: {
        light: '#FFFFF',
        main: '#FFFFFF',
        dark: '#FFFFF',
        contrastText: '#000000',
      },
    },
  },
  ptBR
)

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
