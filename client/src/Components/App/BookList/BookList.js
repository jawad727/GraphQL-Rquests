import React, { Component, useState } from 'react';
import Card from "../../Shared/Card"
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from "graphql-tag"
import { Query, Mutation } from "react-apollo"

const GET_BOOKS = gql`
    query {
        books {
            id,
            title,
            available
        }
    }
`

const GET_BOOKS2 = gql`
    query book($id: Int!) {
        book(id: $id) {
            title
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

const ADD_BOOK = gql`
    mutation addBook($title: String) {
        addBook(title: $title) {
            title
        }
    }  
`


function BookList() {


    const [title, setTitle] = useState("")
    const [booksArr, setBooksArr] = useState([])

    const changeHandler = (e) => {
        setTitle(e.target.value)
    }

    const { qdata, qclient } = useQuery(GET_BOOKS2, {
        variables: { id: 1 }
      });

    const [changeAvailability, { availableData }] = useMutation(CHANGE_AVAILABILITY);
    const [addBook, { addedBookData }] = useMutation(ADD_BOOK);

      {console.log(qdata, qclient)}

        return (
            <>
           
            <Query query={GET_BOOKS}>
            
                
                {({ loading, error, data }) => {
                    if (loading) {
                        return <div> Loading </div>
                    }

                    if (error) {
                        return <div> Error {error.toString()} </div>
                    }
                    return (
                        <div>

                            <p> Add a book </p>
                            
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    addBook({ 
                                        variables: { title: title }
                                    }).then(() => {
                                        console.log("asd")
                                    })
                                }}>
                                    <input placeholder="title" value={title} onChange={(e) => changeHandler(e)} />
                                    <button> Submit </button>
                                </form>

                            {data.books.map(item => (
                                <div key={item.id}>


                                            <div>
                                                <Card item={item} changeAvailability={changeAvailability} />
                                            </div>

                                </div>
                            ))}

                        </div>
                    )
                }}
            </Query>
            </>
        );

}

export default BookList;
