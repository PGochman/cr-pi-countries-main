import {FILTER_BY_NAMES, GET_ALL_COUNTRIES, ORDER_COUNTRIES, GET_DATA, FILTER, GET_DETAIL, ADD_ACTIVITY, SET_FILTERS, SET_CURRENT_ACTIVITY, SET_ORDER, CLEAN_DETAIL} from "../actions/action-types"
import { orderSelectedCountries, filterCountries} from "../utils/utils"

const initialState = {
    allCountries: [],
    filteredCountries: [],
    activities: [],
    continents: {},
    countryDetail: {},
    filters: {},
    currentActivity: "",
    order: {}
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
            const orderNameCountries = orderSelectedCountries(countries, state.order)
            return {
                ...state,
                filteredCountries: orderNameCountries
            }
        case ORDER_COUNTRIES:
            const orderedCountries = orderSelectedCountries(state.filteredCountries, state.order)
            return {
                ...state,
                filteredCountries: orderedCountries,
            }
        case GET_DATA: 
            return {
                ...state,
                continents: action.payload.continents,
                activities: action.payload.activities
            }
        case FILTER:
            const filteredCountries = filterCountries(state.allCountries, state.filters)
            const orderFilteredCountries = orderSelectedCountries(filteredCountries, state.order)
            return {
                ...state,
                filteredCountries: orderFilteredCountries
            }
        case GET_DETAIL:
            return {
                ...state,
                countryDetail: action.payload
            }
        case ADD_ACTIVITY: 
            return {
                ...state,
                activities: [...state.activities, action.payload]
            }
        case SET_FILTERS:
            return {
                ...state,
                filters: action.payload
            }
        case SET_CURRENT_ACTIVITY:
            return {
                ...state,
                currentActivity: action.payload
            }
        case SET_ORDER:
            return {
                ...state,
                order: action.payload
            }
        case CLEAN_DETAIL:
            return{
                ...state,
                countryDetail: {}
            }
        default:
            return {...state}
    }
}

export default reducer