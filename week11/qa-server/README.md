# `qa-server`

The `qa-server` is the server-side app companion for HeapOverrun. It presents some APIs to perform some CRUD operations on questions and their answers.

## APIs
Hereafter, we report the designed HTTP APIs, also implemented in the project.

### __List all questions__

URL: `/api/questions`

HTTP Method: GET.

Description: Retrieve all questions.

Response: `200 OK` (success) or `500 Internal Server Error` (generic error). In case of success, returns an array of questions in JSON format (see below). Else, returns an error message.

Response body:
```
[
  {
    "id": 1,
    "text": "Is JavaScript better than Python?",
    "email": "luigi.derussis@polito.it",
    "userId": 1,
    "date": "2025-02-07"
  },
  ...
]
```

### __Get a single question__

URL: `/api/questions/<id>`

HTTP Method: GET.

Description: Retrieve the question represented by `<id>`.

Response: `200 OK` (success), `404 Not Found` (wrong id), or `500 Internal Server Error` (generic error).

Response body:
```
{
  "id": 1,
  "text": "Is JavaScript better than Python?",
  "email": "luigi.derussis@polito.it",
  "userId": 1,
  "date": "2025-02-07"
} 
```

### __Get all the answers of a single question__

URL: `/api/questions/<id>/answers`

HTTP Method: GET.

Description: Get all the answers of the question represented by `<id>`.

Response: `200 OK` (success), `404 Not Found` (wrong id), or `500 Internal Server Error` (generic error).

Response body:
```
[
  {
    "id": 1,
    "text": "Yes",
    "email": "stefano.zeta@email.it",
    "userId": 2,
    "score": -10,
    "date": "2025-02-28"
  },
  ...
]
```

### __Create a new answer for a given question__

URL: `/api/questions/<id>/answers`

HTTP Method: POST.

Description: Create a new answer to the question represented by `<id>`.

Request body:
```
{
  "text": "Last year, it had about 2220 first-timers.",
  "email": "luigi.derussis@polito.it",
  "userId": 1,
  "score": 0,
  "date": "2025-03-17"
}
```

Response: `201 Created` (succes, with the created id), `404 Not Found` (wrong id), or `503 Service Unavailable` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: __None__

### __Update an existing answer__

URL: `/api/answers/<id>`

HTTP Method: PUT.

Description: Update an identified by `<id>`.

Request body: A JSON object representing the answer.
```
{
  text": "Last year, it had around 220 first-time students",
  "email": "luigi.derussis@polito.it",
  "userId": 1,
  "score": 0,
  "date": "2025-03-17"
}
```

Response: `200 OK` (success), `404 Not Found` (wrong id), or `503 Service Unavailable` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: _None_

### __Vote for an answer__

URL: `/api/answers/<id>/vote`

HTTP Method: POST.

Description: Upvote (+1) or downvote (-1) an existing answer (identified by its `<id>`).

Request body: A JSON object representing the action.
```
{
  "vote": "up"
}
```

Response: `204 No content` (success) or `503 Service Unavailable` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: _None_