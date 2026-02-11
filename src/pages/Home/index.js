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
        <form onSubmit={handleSubmit}>
            <input placeholder="Text hier eingeben..."onChange={handlechange}type='text' value={keyword}/>
           </form>
        <div>
            <div className="App-results">
                <h3 className="App-title">Letzte Suche</h3>
                <ListOfPics pics={pics}/>
            </div>
            <div className="App-category">
                <Collections />
            </div>
        </div>
     </>    
            
               
    )
}