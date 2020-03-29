import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  @media (min-width: 1000px) {
    padding: 0 100px;
  }
`
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 50px;
  width: 100%;
  color: white;
`
