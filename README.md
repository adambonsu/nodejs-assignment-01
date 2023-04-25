## Spin up a node js Server (on port 3000)
`npm start`

## The Server has three routes
1. `GET "/"`
   * Return Greeting
   * Display form to create a username
2. `GET "/users`
   * List users
3. `POST "/create-user"`
   * Parse the incoming data (username) from the form
   * Redirect browser to "/users"