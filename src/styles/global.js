import { createGlobalStyle } from 'styled-components'

const Global = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

body {
  font: 400 16px Roboto, sans-serif;
  background: #121212;
  color: white;
  -webkit-font-smoothing: antialiased;
}

.nav-link{
  text-decoration: none;
  color: white
}
`
export default Global
