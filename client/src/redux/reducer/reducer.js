import {FILTER_BY_NAMES, GET_ALL_COUNTRIES, ORDER_COUNTRIES, GET_DATA, FILTER} from "../actions/action-types"
import { orderSelectedCountries, filterCountries} from "../utils/utils"

const initialState = {
    selectedCountries: [],
    allCountries: [],
    activities: [],
    continents: {},
    filteredCountries: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                selectedCountries: action.payload,
                allCountries: action.payload,
            }
        case FILTER_BY_NAMES:
            const countries = filterCountries(action.payload.data, action.payload.filters) 
            return {
                ...state,
                selectedCountries: action.payload.data,
                filteredCountries: countries
            }
        case ORDER_COUNTRIES:
            const orderedCountries = orderSelectedCountries(state, action.payload)
            return {
                ...state,
                selectedCountries: orderedCountries,
            }
        case GET_DATA: 
            return {
                ...state,
                continents: action.payload.continents,
                activities: action.payload.activities
            }
        case FILTER:
            const filteredCountries = filterCountries(state.allCountries, action.payload)
            return {
                ...state,
                filteredCountries: filteredCountries
            }
        default:
            return {...state}
    }
}

export default reducer