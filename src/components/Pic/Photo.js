import React from "react";
import '../Pic/styles.css'
import { Link } from "wouter";

export default function Photo ({url, description, id}) {
    return (
        <div className="Photo">
            <Link to={`/photo/${id}`} className={'Pic-link'}>
                
                <img loading="lazy" alt={description} src={url} />
            </Link>
     </div>
    )
}
