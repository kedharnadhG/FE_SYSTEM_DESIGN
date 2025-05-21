#### Requirement

//STRUCTURE  (that i need)

books {
    id,
    title,
    publishedYear,
    author
}

author {
    id,
    name,
    books
}


// Data I need

1. list of books
2. list of authors
3. list of books with author details  (relations)
4. list of author with book details  (relations)
(we write relations outside the Query/Mutation types)

// all the methods in order to get/Update the data has to be there inside the "Query"/"Mutation" types inside of (typeDefs.js)  i.e all about schemas including get the data & update the data


//those ( w.r.t those Queries/ Mutations ) methods-definitions(implementations) will be there inside the (resolvers.js)

#### Mutation Example
 (i.e updating the data in Schema)
 type Mutation {
        addBook(title: String!, publishedYear: Int, authorId: ID!) (what we are passing) : Book!   (what we are mandatorily returning)     
    }


##############################################

//from client you can make copy the fetch call
/*
    fetch("http://localhost:4000/", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": "http://localhost:4000/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"query\":\"query ExampleQuery {\\n  authors {\\n    id\\n    name\\n  }\\n}\\n\",\"variables\":{},\"operationName\":\"ExampleQuery\"}",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}).then(res=>res.json()).then(data=>console.log(data))

OUTPUT: {
    "authors": [
        {
            "id": "1",
            "name": "Kedharnadh"
        }
    ]
}
*/




---------------------------------------------------
query ExampleQuery {
  
  books {
    id
    title
    author {
      id
      name
    }
  }
  authors {
    id
    name
    books {
      id
      title
    }
  }
}


OUTPUT: 

{
  "data": {
    "books": [
      {
        "id": "101",
        "title": "Namaste Frontend System Design",
        "author": {
          "id": "1",
          "name": "Chirag Goel"
        }
      },
      {
        "id": "102",
        "title": "Namaste React",
        "author": {
          "id": "1",
          "name": "Chirag Goel"
        }
      },
      {
        "id": "103",
        "title": "Namaste Node",
        "author": {
          "id": "2",
          "name": "Akshay Saini"
        }
      }
    ],
    "authors": [
      {
        "id": "1",
        "name": "Chirag Goel",
        "books": [
          {
            "id": "101",
            "title": "Namaste Frontend System Design"
          },
          {
            "id": "102",
            "title": "Namaste React"
          }
        ]
      },
      {
        "id": "2",
        "name": "Akshay Saini",
        "books": [
          {
            "id": "103",
            "title": "Namaste Node"
          }
        ]
      }
    ]
  }
}