import { useEffect, useState } from "react"
import Card from "../card/Card"
import { useSelector } from "react-redux"
import FunctionButton from "../buttons/FunctionButton"
import { useDispatch } from "react-redux"
import { orderCountries } from "../../redux/actions/actions"

const COUNTRIES_PAGE = 10

const Cards = ({order}) => {
    const [pageNumber, setPageNumber] = useState(0)
    const {filteredCountries, selectedCountries} = useSelector((state) => state)
    const dispatch = useDispatch()

    //const shownCountries = filteredCountries.length > 0 ? filteredCountries : selectedCountries

    const LAST_PAGE = Math.ceil(filteredCountries.length/10) - 1
    const pageCountries = filteredCountries.slice(pageNumber * 10, (pageNumber + 1) * 10)

    useEffect(() => {
        setPageNumber(0)
        if(Array.isArray(filteredCountries)){
            dispatch(orderCountries(order))
        }
    }, [filteredCountries])


    const nextPage = () => {
        setPageNumber(pageNumber + 1)
    }
    
    const prevPage = () => {
        setPageNumber(pageNumber - 1)
    }
    
    const firstPage = () => {
        setPageNumber(0)
    }
    
    const lastPage = () => {
        setPageNumber(LAST_PAGE)
    }

    return (
        <div>
            <FunctionButton name="First page" onClick={firstPage} disabled={pageNumber == 0} />
            <FunctionButton name="Prev" onClick={prevPage} disabled={pageNumber == 0} />
            <p>{pageNumber + 1}</p>
            <FunctionButton name="Next" onClick={nextPage} disabled={filteredCountries.length <= (pageNumber + 1) * 10} />
            <FunctionButton name="Last Page" onClick={lastPage} disabled={pageNumber == LAST_PAGE} />
            {Array.isArray(pageCountries) ? pageCountries?.map(({flag, name, continent, id}) => {
                return <Card
                key={id}
                id={id}
                flag={flag}
                name={name}
                continent={continent} />
            }) : 
            <h1>{filteredCountries}</h1>
            }
        </div>
    )
}

export default Cards