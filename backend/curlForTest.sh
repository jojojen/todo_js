curl -X GET "http://localhost:5000/api/todos"

curl -X GET "http://localhost:5000/api/todos/641827b3bb106a07d6a103a2"

curl -X POST -H "Content-Type: application/json" -d '{"title": "New Todo", "done": false}' "http://localhost:5000/api/todos"

curl -X PATCH -H "Content-Type: application/json" -d '{"title": "Updated Todo", "done": true}' "http://localhost:5000/api/todos/64182c0196a947bae4242c74"

curl -X DELETE "http://localhost:5000/api/todos/641827b3bb106a07d6a103a2"
