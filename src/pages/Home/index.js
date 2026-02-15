import React, { useState } from "react"
import { Link, useLocation } from "wouter"
import UsePics from "../../hooks/usePics"
import ListOfPics from "../../components/ListOfPics"
import Collections from "../../components/Collections"



export default function Home() {
    const[keyword, setKeyword] = useState('')
    const [path, pushLocation] = useLocation()
    const {loading, pics} =UsePics()

    const handleSubmit = evt => {
        evt.preventDefault()
        //Navegar a otra ruta
        pushLocation (`/search/${keyword}`)
    }

    const handlechange = evt => {
        setKeyword(evt.target.value)
    }
    return (
     <>
     
        <section className="hero">                   
            <Link to="/">
                <img src="/Glogo.svg" alt="Logo" className='Logo'/>
            </Link>
                <h1>Genes - Deine Galerie für visuelle Inspiration</h1>
                <p>Entdecke Millionen hochqualitative Fotografien und erstelle deine eigenen Sammlungen.</p>
        </section>

        <form onSubmit={handleSubmit}>
            <input placeholder="Fotos suchen (z.B. Natur, Stadt, Essen...)"onChange={handlechange}type='text' value={keyword}/>
           </form>

        <div className="quick-searches">
                <p>Beliebte Suchen:</p>
            <div className="tags">
                {['Natur', 'Architektur', 'Tiere', 'Essen', 'Reisen'].map(tag => (
                <Link key={tag} href={`/search/${tag.toLowerCase()}`} className="tag">
                {tag}
                </Link>
                ))}
            </div>
        </div>
        <div>
            <div className="App-results">
                <h3 className="App-title">
                    Letzte Suche
                </h3>
                <ListOfPics pics={pics}/>
            </div>
            <div className="App-category"id="collections">
                <Collections />
            </div>
        </div>
     </>    
            
               
    )
}