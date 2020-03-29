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
  background: rgba(0,0,0,0.8);
  color: white;
  -webkit-font-smoothing: antialiased;
}

.nav-link{
  text-decoration: none;
  color: white
}

.menu{
  position: absolute;
  cursor: pointer;
  color: rgba(255,255,255,.5);
  transition: all .15s ease-in-out;
  margin: 1rem;
  &:hover {
    color: white
  }
}
`
export default Global
