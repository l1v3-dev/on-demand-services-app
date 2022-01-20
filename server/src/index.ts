import { ApolloServer } from 'apollo-server'
import { schema } from './graphql/schema'
import { context } from './graphql/context'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

const PORT = process.env.PORT
const server = new ApolloServer({
    schema, context,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({})
    ]
})


server.listen(PORT || 5000).then(({ url }) => {
    console.log(`Server ready at ${url}...`)
})