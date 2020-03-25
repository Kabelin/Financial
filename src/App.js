import React from 'react'
import Drawer from './Drawer'

function App() {
  return (
    <div className="App">
      <Drawer />
      <button
        type="button"
        data-drawer-trigger
        aria-controls="drawer-name"
        aria-expanded="false"
      >
        Open Drawer
      </button>
    </div>
  )
}

export default App
