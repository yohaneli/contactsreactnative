import {ADD_CONTACT,DELETE_CONTACT,UP_CONTACT} from './types'

export const ajouterContact = (payload) => ({
    type: ADD_CONTACT,
    payload
})

export const supprimerContact = (payload) => ({
    type: DELETE_CONTACT,
    payload
})

export const majContact = (payload) => ({
    type: UP_CONTACT,
    payload
})