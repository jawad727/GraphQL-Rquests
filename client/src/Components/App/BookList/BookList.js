import React, { useState, useEffect, useContext } from 'react';
import Card from "../../Shared/Card"
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_BOOKS, CHANGE_AVAILABILITY, DELETE_BOOK, ADD_BOOK } from "../../../API/gqlQueries"
import "./BookList.css"
import { store } from "../../../Store/store"




function BookList() {

    // State

    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(true)
    const [booksArr, setBooksArr] = useState([])
    const [contextInput, setContextInput] = useState("")

    const tempContext = useContext(store)

    // Lifecycle functions

    useEffect(() => {
        console.log( tempContext.state.myFormFieldValue )
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
            setBooksArr(res.books);
            setLoading(false);
        }
    })


        return (
            <>
            {loading ? <p> loading... </p> : 

            <div className="bookList" >

                {booksLoading ? <div> Loading... </div> : null}
                        
                {booksError ? <div> Error </div> : null}

        
                
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

                    <p> {tempContext.state.myFormFieldValue} </p>

                    <form>
                        <input
                            type="text"
                            value={contextInput}
                            onChange={(e) => {
                                setContextInput(e.target.value)
                            }}
                        />
                        <button onClick={(e) => {
                            e.preventDefault()
                            tempContext.dispatch({
                                type: "UPDATE_VALUE",
                                payload: contextInput
                            })
                        }} > set </button>
                    </form>

                </div>  
           

            </div> }
            </>
        );

}

export default BookList;
