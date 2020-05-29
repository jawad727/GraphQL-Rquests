import React, { Component } from 'react';

import { gql } from "apollo-boost"
import { Query } from "react-apollo"

const GET_BOOKS = gql`
    query {
        books {
            id,
            title,
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
                        {console.log(data.books)}
                        {data.books.map(items => (
                            <div key={items.id}>
                            <p>{items.title}</p>
                            <p>{items.available.toString()}</p>
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
