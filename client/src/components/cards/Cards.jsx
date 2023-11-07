import { useEffect, useState } from "react"
import Card from "../card/Card"
import { useSelector, useDispatch } from "react-redux"
import FunctionButton from "../buttons/FunctionButton"
import style from "./cards.module.css"
import { setPage } from "../../redux/actions/actions"

const COUNTRIES_IN_PAGE = 10

const Cards = () => {
    const [pageNumber, setPageNumber] = useState(0)
    const {filteredCountries, currentPage} = useSelector((state) => state)
    const dispatch = useDispatch()
    

    const LAST_PAGE = Math.ceil(filteredCountries.length/COUNTRIES_IN_PAGE) - 1
    const pageCountries = filteredCountries.slice(pageNumber * COUNTRIES_IN_PAGE, (pageNumber + 1) * COUNTRIES_IN_PAGE)

    useEffect(() => {
        if(!pageNumber)
        {
            setPageNumber(currentPage)
        } else{
            dispatch(setPage(0))
            setPageNumber(0)
        }
    }, [filteredCountries])

    useEffect(() => {
        setPageNumber(currentPage)
    }, [currentPage])

    const nextPage = () => {
        dispatch(setPage(currentPage + 1))
    }
    
    const prevPage = () => {
        dispatch(setPage(currentPage - 1))
    }
    
    const firstPage = () => {
        dispatch(setPage(0))
    }
    
    const lastPage = () => {
        dispatch(setPage(LAST_PAGE))
    }

    return (
        <div className={style.container}>
            <div className={style.pageButtons}> 
                {Array.isArray(filteredCountries) &&
                <div>
                <FunctionButton name="First page" onClick={firstPage} disabled={pageNumber == 0} />
                <FunctionButton name="Prev" onClick={prevPage} disabled={pageNumber == 0} />
                <span>{pageNumber + 1}</span>
                <FunctionButton name="Next" onClick={nextPage} disabled={filteredCountries.length <= (pageNumber + 1) * COUNTRIES_IN_PAGE} />
                <FunctionButton name="Last Page" onClick={lastPage} disabled={pageNumber == LAST_PAGE || filteredCountries.length <= COUNTRIES_IN_PAGE} />
                </div>
                }
            </div>
            <div className={style.cardContainer}>
                {Array.isArray(pageCountries) ? pageCountries?.map(({flag, name, continent, id}) => {
                    return (
                        <Card
                        key={id}
                        id={id}
                        flag={flag}
                        name={name}
                        continent={continent} />
                    )
                }) : 
                <h1>{filteredCountries}</h1>
                }
            </div>
            <div className={style.pageButtons}> 
                {Array.isArray(filteredCountries) &&
                <div>
                <FunctionButton name="First page" onClick={firstPage} disabled={pageNumber == 0} />
                <FunctionButton name="Prev" onClick={prevPage} disabled={pageNumber == 0} />
                <span>{pageNumber + 1}</span>
                <FunctionButton name="Next" onClick={nextPage} disabled={filteredCountries.length <= (pageNumber + 1) * COUNTRIES_IN_PAGE} />
                <FunctionButton name="Last Page" onClick={lastPage} disabled={pageNumber == LAST_PAGE || filteredCountries.length <= COUNTRIES_IN_PAGE} />
                </div>
                }
            </div>
        </div>
    )
}

export default Cards