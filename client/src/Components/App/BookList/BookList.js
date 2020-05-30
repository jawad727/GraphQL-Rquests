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

class BookList extends Component {

render() {
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
                        <input />
                        <input />

                        {console.log(data.books)}
                        {data.books.map(item => (
                            <div key={item.id}>                
                                <Mutation mutation={CHANGE_AVAILABILITY} >
                                    {(changeAvailability, { data }) => (

                                        <div>
                                            {`${item.title}: ${item.available ? 'Available' : 'Not Available'}`}
                                            <button onClick={(e) => {
                                                changeAvailability({
                                                    variables: { id: item.id, available: !item.available }
                                                })
                                            }}> 
                                                Change Availability 
                                            </button>
                                      
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
