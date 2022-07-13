import { gql }  from 'apollo-angular';

const USERS_DESCRIPTION = gql`
query{
  user{
    _id
    email
    name
    password
    username

  }

}`
export { USERS_DESCRIPTION };
