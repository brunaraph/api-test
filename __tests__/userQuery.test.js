const { ApolloClient, InMemoryCache, gql, HttpLink } = require('@apollo/client');
const fetch = require('cross-fetch');

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://graphqlzero.almansi.me/api', fetch }),
  cache: new InMemoryCache()
});

describe('GraphQL User Query', () => {
  it('should fetch user data', async () => {
    const USER_QUERY = gql`
      query GetUser($id: ID!) {
        user(id: $id) {
            id
            username
            email
    		    address{
                    geo{
                        lat
                        lng
                    }
                }
            }
    }
    `;

    const variables = { id: "1" };

    const result = await client.query({
      query: USER_QUERY,
      variables
    });


    const expectedUser = {
      user: {
        id: "1",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
            geo: {
                lat:-37.3159,
                lng: 81.1496
            }
        }
      }
    };
    console.log(result.data) 
    expect(result.data).toMatchObject(expectedUser);
  });
});
