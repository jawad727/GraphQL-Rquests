import gql from "graphql-tag"

export const GET_BOOKS = gql`
    query {
        books {
            id,
            title,
            available
        }
    }
`

export const CHANGE_AVAILABILITY = gql`
    mutation editBook($id: Int!, $available: Boolean!) {
        editBook(id: $id, available: $available) {
            id,
            available
        }
    }  
`

export const DELETE_BOOK = gql`
    mutation deleteBook($id: Int!) {
        deleteBook(id: $id) {
            id
        }
    }  
`

export const ADD_BOOK = gql`
    mutation addBook($title: String) {
        addBook(title: $title) {
            id,
            title,
            available
        }
    }  
`