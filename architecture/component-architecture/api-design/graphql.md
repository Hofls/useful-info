### Approaches
* `DB first`
    * Use hasura to create tables in postgres, generate graphql endpoints + schema
    * Generate types and request code with [generator](https://graphql-code-generator.com/)
* `Code first`
* `Schema first`

#### Main concepts:
* GraphQL (GQL) - Query Language for APIs
* Schema Definition Language (SDL) - syntax for writing schemas

#### GraphQL vs Rest
* No more Over - and Underfetching (frontend chooses which fields backend should return)
* Rapid Product Iterations on the Frontend (no need to change backend each time frontend changes)
* Insightful Analytics on the Backend \
    As each client specifies exactly what information it’s interested in, it is possible to gain a deep understanding of how the available data is being used
* GraphQL brings way more complexity, some requests can cause huge backend load
