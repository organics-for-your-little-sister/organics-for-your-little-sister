import React from 'react'
import { Navbar, AllProducts, SideBar } from './components'
import Routes from './routes'


const App = () => {
  return (
    <div>
      <Navbar />

      <div className="row">

          <div className="col-sm-2">
            <SideBar />
          </div>

          <div className="col-sm-10">
            <Routes />
          </div>

      </div>
    </div>
  )
}

export default App
