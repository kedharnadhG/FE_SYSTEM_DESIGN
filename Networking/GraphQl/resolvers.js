//here we will define all the methods that will be called in terms of fetching data  &  updating the data

//we have created a schema called "Query" , in that (what methods we need to call) we have to define those methods inside the "Query" type

//sample data
const data = {
    authors: [
        { id: "1", name: "Chirag Goel", booksIds: ["101", "102"] },
        { id: "2", name: "Akshay Saini", booksIds: ["103"] }
    ],
    books: [
        { id: "101", title: "Namaste Frontend System Design", authorId: "1", publishedYear: 2023 },
        { id: "102", title: "Namaste React", authorId: "1" , publishedYear: 2025},
        { id: "103", title: "Namaste Node", authorId: "2" ,publishedYear: 2024}
    ]
}


export const resolvers = {

    //relations (1Book -> 1Author) 
    Book: {
        author: (parent, args, context, info) => {
            console.log(parent);
            return data.authors.find(authorDetails => authorDetails.id === parent.authorId)
        }
    },

    //relations (1Author -> ManyBooks) 
    // ("parent" will contain the respective info of Author)
    Author: {
        books: (parent, args, context, info) => {
            return data.books.filter(book => parent.booksIds.includes(book.id))
        }
    },

    Query: {
        authors: (parent, args, context, info) => {
            //eventually in future we can fetch  data from the db
            return data.authors
        },
        books: (parent, args, context, info) => {
            return data.books
        }
    },

    Mutation: {
        addBook: (parent, args, context, info) => {
            console.log(args);
            const newBook = {...args, id: `${data.books.length + 1}`}
            data.books.push(newBook);

            const author = data.authors.find(
              (author) => author.id === args.authorId
            );
            if (author) {
              author.booksIds.push(newBook.id);
            }

            return newBook;
        }
    }
}