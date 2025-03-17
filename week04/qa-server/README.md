# `qa-server`

The `qa-server` is the server-side app companion for HeapOverrun. It presents some APIs to perform some CRUD operations on questions and their answers.

## APIs
Hereafter, we report the designed HTTP APIs, also implemented in the project.

### ___List all questions___

URL: `/questions`

HTTP Method: GET

Description: Returns all questions available in the sqlite database.

Response: `200 OK` for success, `500 Internal Server Error` for generic error.
- Success: returns an array of questions in JSON format (see below).
- Error: returns an error message.

Response body:
```
[
    {
        "id": 1,
        "text": "Is Javascript better than Python?",
        "email": "luigi.derussis@polito.it",
        "userId": 1,
        "date": "2025-02-07"
    },
    ...
]
```

### ___Get a single questions___

URL: `/api/questions/<id>`

HTTP Method: GET

Description: Returns the question represented by the `<id>` specified in the URL.

Response: `200 OK` for success, `404 Not Found` for bad id, `500 Internal Server Error` for generic error.
- Success: returns the requested question in JSON format (see below).
- Error: returns an error message.

Response body:
```
{
    "id": 1,
    "text": "Is Javascript better than Python?",
    "email": "luigi.derussis@polito.it",
    "userId": 1,
    "date": "2025-02-07"
}
```

### ___Get all the answers of a single question___

URL: `/api/questions/<id>`

HTTP Method: GET

Description: Returns all the answers of the question represented by the `<id>` specified in the URL.

Response: `200 OK` for success, `404 Not Found` for bad id, `500 Internal Server Error` for generic error.
- Success: returns the requested answers in JSON format (see below).
- Error: returns an error message.

Response body:
```
[
    {
        "id": 1,
        "text": "Yes",
        "email": "stefano.zeta@email.it",
        "userId": 2,
        "score": -10,
        "date": "2025-03-10"
    },
    ...
]
```

### ___Vote for an answer___

URL: `/api/answers/<id>/vote`

HTTP Method: POST

Description: Upvote (+1) or downvote (-1) and existing answer identified by `<id>`.

Request body:
```
{
    "vote": "up"
}
```

Response: `204 No Content` for success, `503 Service Unavailable` for generic error.