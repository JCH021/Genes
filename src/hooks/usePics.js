import { useContext, useEffect, useState } from "react";
import getPics from "../services/getPics";
import PicsContext from '../context/PicsContext'


const INITIAL_PAGE = 0

export default function UsePics ({ keyword } = { keyword: null }) {
        const[loading, setLoading] = useState(false)
        const[loadingNextPage, setLoadingNextPage] = useState(false)

        const[page,setPage] = useState(INITIAL_PAGE)
        const {pics, setPics} = useContext(PicsContext)
        
        const keywordToUse = keyword ? keyword : localStorage.getItem('lastkeyword')
               
              useEffect(function()  {
                if (!keywordToUse) return; 
                
                setLoading(true)
                
                



                getPics({ keyword: keywordToUse })
                .then(pics => {
                    setPics(pics)
                    setLoading(false)

                    if (keyword) {
                      localStorage.setItem('lastkeyword', keyword);
                      }
                })
              }, [keyword, keywordToUse, setPics])


              useEffect(function () {
                if (page === INITIAL_PAGE) return

                setLoadingNextPage(true)


                getPics({ keyword: keywordToUse, page })
                .then(nextPics => {
                    setPics(prevPics => prevPics.concat(nextPics))
                    setLoadingNextPage(false)
                })
              }, [keywordToUse, page, setPics])

    return {loading, loadingNextPage, pics, setPage}
}