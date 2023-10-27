import { FILTER_BY_NAMES, GET_ALL_COUNTRIES, ORDER_COUNTRIES, GET_DATA, FILTER, GET_DETAIL, ADD_ACTIVITY, SET_FILTERS, SET_CURRENT_ACTIVITY, SET_ORDER} from "./action-types"
import axios from "axios"
const URL_BASE = "http://localhost:3001"

export const selectCountriesByName = (name, filters) => {
    return async(dispatch) => {
        if(name.length){
            try{
                const data = (await axios(`${URL_BASE}/countries/name?name=${name}`)).data
                return dispatch({
                    type: FILTER_BY_NAMES,
                    payload: {data, filters} 
                })
            } catch (error){
                throw Error(error.message)
            }
        }
    }
}

export const getAllCountries = () => {
    return async(dispatch) => {
        try{
            const data = (await axios(`${URL_BASE}/countries`)).data
            return dispatch({
                type: GET_ALL_COUNTRIES,
                payload: data
            })
        } catch (error){
            throw Error(error.message)
        }
    }
}

export const getData = () => {
    return async(dispatch) => {
        try{
            const activities = (await axios(`${URL_BASE}/activities`)).data
            const continents = (await axios(`${URL_BASE}/continents`)).data

            return dispatch({
                type: GET_DATA,
                payload: {activities, continents}
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}

export const orderCountries = (parameter) => {
    return {type: ORDER_COUNTRIES, payload: parameter}
}

export const filterCountries = (filters) => {
    return {type: FILTER, payload: filters}
}

export const getDetail = (id) => {
    return async(dispatch) => {
        try {
            const data = (await axios(`${URL_BASE}/countries/${id}`)).data

            return dispatch({
                type: GET_DETAIL,
                payload: data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}

export const addActivity = (activity) => {
    return async(dispatch) => {
        try{
            const data = (await axios.post(`${URL_BASE}/activities`, activity)).data

            return dispatch({
                type: ADD_ACTIVITY,
                payload: data
            })
        } catch(error) {
            throw Error(error.message)
        }
    }
}

export const setFilters = (filters) => {
    return {type: SET_FILTERS, payload: filters}
}

export const setCurrentActivity = (activity) => {
    return {type: SET_CURRENT_ACTIVITY, payload: activity}
}

export const setOrder = (order) => {
    return {type: SET_ORDER, payload: order}
}