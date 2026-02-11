import React from 'react'
import './App.css'
import StaticContext from './context/StaticContext'
import { Link, Route } from 'wouter'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import Detail from './pages/Detail'
import { PicsContextProvider } from './context/PicsContext'
import CollectionDetail from './pages/Collectionspage/CollectionDetail'
import Header from './components/Header'

export default function App() {
  return (
 <StaticContext.Provider value={{
    name:'Juan',
    ok: true
    }}>
    <div className="App">
      <Header />
      
      <section className="App-content">
        
        <Link to="/">
           <img src="/Glogo.svg" alt="Logo" className='Logo'/>
        </Link>

        
        <PicsContextProvider>
          <Route 
          component={Home}
          path="/"
          />
         <Route 
          component={SearchResults}
          path="/search/:keyword"/>

         <Route 
          component={Detail}
          path="/photo/:id"
          />
          <Route 
          component={CollectionDetail}
           path="/collections/:id"
           />
         </PicsContextProvider>
      </section>
      </div>
    </StaticContext.Provider>
)}


