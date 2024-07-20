import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/nav'
import Home from './components/Home'
import About from './components/About'
import Signup from './components/Signup'
import Signin from './components/Signin'

const App = () => {
  return (
      <BrowserRouter>
        <div>
          <Nav />
        </div>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/signin' element={<Signin />}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App