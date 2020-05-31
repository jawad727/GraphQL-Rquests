import React, { Component, useState, useEffect } from 'react';
import Card from "../../Shared/Card"
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from "graphql-tag"
import { Query, Mutation } from "react-apollo"
import "./BookList.css"

const GET_BOOKS = gql`
    query {
        books {
            id,
            title,
            available
        }
    }
`

const CHANGE_AVAILABILITY = gql`
    mutation editBook($id: Int!, $available: Boolean!) {
        editBook(id: $id, available: $available) {
            id,
            available
        }
    }  
`

const DELETE_BOOK = gql`
    mutation deleteBook($id: Int!) {
        deleteBook(id: $id) {
            title
        }
    }  
`

const ADD_BOOK = gql`
    mutation addBook($title: String) {
        addBook(title: $title) {
            title
        }
    }  
`


function BookList() {

    // State

    const [title, setTitle] = useState("")
    const [booksArr, setBooksArr] = useState([])

    // Lifecycle functions

    useEffect(() => {
        console.log(data)
    })

    // Other functions

    const changeHandler = (e) => {
        setTitle(e.target.value)
    }

    // API calls
    
    const [changeAvailability, { availableData }] = useMutation(CHANGE_AVAILABILITY);
    const [addBook, { addedBookData }] = useMutation(ADD_BOOK);
    const [deleteBook, { deletedBookData } ] = useMutation(DELETE_BOOK);

    const { loading, error, data } = useQuery(GET_BOOKS)
    
    // const { loading, error, data } = useQuery(GET_BOOKS2, {
    //     variables: { id: 1 }
    // });


        return (
            <div className="bookList" >

                {loading ? <div> Loading... </div> : console.log('loading complete')}
                        
                {error ? <div> Error </div> : console.log('error free')}

                {data ?  
                
                <div>

                        <p className="addAbookTitle"> Add a book </p>
                    
                        <form className="addBookForm" onSubmit={(e) => {
                            e.preventDefault()
                            addBook({ 
                                variables: { title: title }
                            }).then(() => {
                                console.log("ADDED")
                            })
                        }}>
                            <input placeholder="title" value={title} onChange={(e) => changeHandler(e)} />
                            <button> Submit </button>
                        </form>

                        {/* {console.log(booksArr, data)} */}

                    {data.books.map(item => (
                        <div key={item.id}>
                            <div>
                                <Card item={item} changeAvailability={changeAvailability} deleteBook={deleteBook} />
                            </div>
                        </div>
                    ))}

                </div>  : console.log("data fetching")}

            </div>
        );

}

export default BookList;
