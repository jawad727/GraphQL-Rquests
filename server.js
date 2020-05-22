const express = require("express");
const expressGraphQL = require("express-graphql")
const schema = require("./schema")

const app = express()
const PORT = 3000

app.use("/graphql", expressGraphQL({
    graphiql: true, // user interface that we can use
    schema: schema
}))

app.listen(PORT, () => {
    console.log("listening on port: " + PORT)
})