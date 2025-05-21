// "!" means mandatory field
// " Author & Book " are the Custom_types, whereas "ID" "Int" & "String" are the built-in types(scalar types)

// anything that you wanted to get, we have to define inside a type which is called "Query" (all the methods that need to be called in terms of fetching data) has to be there

//all the methods in order to update the data has to be there inside the "Mutation" type

export const typeDefs = `#graphql

    type Author {
        id: ID!
        name: String!
        books: [Book]
    }

    type Book {
        id: ID!
        title: String!
        publishedYear: Int
        author: Author
    }

    type Query {
        authors: [Author]
        books: [Book]
    }

    type Mutation {
        addBook(title: String!, publishedYear: Int, authorId: ID!) : Book!        
    }

`