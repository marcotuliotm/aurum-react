import React from 'react'
import {Route, BrowserRouter} from 'react-router-dom';
import Home from '../home'

const App = () => (
  <BrowserRouter>
    <main>
      <Route exact path="/" component={Home} />
      <Route path='/source' component={() => {
        window.location.href = 'https://github.com/marcotuliotm/aurum-spring-boot';
        return null;
      }} />
    </main>
  </BrowserRouter>
)

export default App
