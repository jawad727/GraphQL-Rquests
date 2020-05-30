import React, { Component } from 'react';
import Card from "../../Shared/Card"

import { gql } from "apollo-boost"
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

class BookList extends Component {

    state = {
        title: ""
    }

    changeHandler = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    render() {
        console.log(this.state.title)
        return (
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
                            
                            <Mutation mutation={ADD_BOOK} >
                            {(addBook, { data }) => (
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    addBook({ 
                                        variables: { title: this.state.title }
                                    })
                                }}>
                                    <input placeholder="title" value={this.state.title} onChange={(e) => this.changeHandler(e)} />
                                    <button> Submit </button>
                                </form>
                            )}
                            </Mutation>

                            {data.books.map(item => (
                                <div key={item.id}>                
                                    <Mutation mutation={CHANGE_AVAILABILITY} >
                                        {(changeAvailability, { data }) => (

                                            <div>
                                                <Card item={item} changeAvailability={changeAvailability} />
                                            </div>

                                        )}
                                    </Mutation>
                                </div>
                            ))}

                        </div>
                    )
                }}
            </Query>
        );
        }

}

export default BookList;
