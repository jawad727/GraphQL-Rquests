import React, { Component, useState, useEffect } from 'react';
import Card from "../../Shared/Card"
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_BOOKS, CHANGE_AVAILABILITY, DELETE_BOOK, ADD_BOOK } from "../../../API/gqlQueries"
import "./BookList.css"


function BookList() {

    // State

    const [title, setTitle] = useState("")
    const [booksArr, setBooksArr] = useState([])

    // Lifecycle functions

    useEffect(() => {
        console.log(booksArr)
    })

    // Other functions

    const changeHandler = (e) => {
        setTitle(e.target.value)
    }

    // API calls

    const [changeAvailability, { data: availableData }] = useMutation(CHANGE_AVAILABILITY);

    const [addBook, { data: addedBookData }] = useMutation(ADD_BOOK, {
        onCompleted: (res) => {
            setBooksArr([...booksArr, res.addBook])
            console.log(res.addBook)
        }
    });
    
    const [deleteBook, { data: deletedBookData } ] = useMutation(DELETE_BOOK, {
        onCompleted: (res) => {
            console.log(res.deleteBook)
            setBooksArr(booksArr.filter(item => item.id != res.deleteBook.id))
        }
    });

    const { loading: booksLoading, error: booksError, data: booksData } = useQuery(GET_BOOKS, {
        onCompleted: (res) => {
            setBooksArr(res.books)
        }
    })


        return (
            <div className="bookList" >

                {booksLoading ? <div> Loading... </div> : null}
                        
                {booksError ? <div> Error </div> : null}

                {/* {booksArr ?   */}
                
                <div>

                    <p className="addAbookTitle"> Add a book </p>
                
                    <form className="addBookForm" onSubmit={(e) => {
                        e.preventDefault()
                        addBook({ 
                            variables: { title: title }
                        }).then(() => {
                            console.log(addedBookData)
                        })
                    }}>
                        <input placeholder="title" value={title} onChange={(e) => changeHandler(e)} />
                        <button> Submit </button>
                    </form>

               

                    {booksArr.map(item => (
                        <div key={item.id}>
                            <div>
                                <Card item={item} changeAvailability={changeAvailability} deleteBook={deleteBook} />
                            </div>
                        </div>
                    ))}

                </div>  
                {/* : null } */}

            </div>
        );

}

export default BookList;
