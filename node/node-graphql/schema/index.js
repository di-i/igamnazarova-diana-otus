const { gql } = require('apollo-server');

const typeDefs = gql`
	scalar DateTime
	scalar EmailAddress
	scalar PhoneNumber
	scalar Date
	
    type Query {
        getProduct(id: Int!): Product!
        getProducts: [Product!]!
        getProductsByCategory(categoryId: Int!): [Product!]!
        getUser(id: Int!): User!
        getUsers: [User!]!
    }
    
    type Mutation {
        addProduct(
            title: String!
            categoryId: Int!
            description: String
            price: Float!
        ): Product!

        addOrder(
            userId: Int!
            productIds: [Int!]!
        ): Order!
        
         addUser(
             username: String!
             email: EmailAddress!
             first_name: String!
             last_name: String!
             phone_number: PhoneNumber!
             date_of_birth: Date!
        ): User!
    }


    type Category {
        id: Int!
        name: String!
        products: [Product!]!
    }

    type Product {
        id: Int!
        title: String!
        category: Category!
        description: String!
        price: Float!
    }

    type User {
        id: Int!
        username: String!
        first_name: String!
        last_name: String!
        email: EmailAddress!
        phone_number: PhoneNumber!
        date_of_birth: Date!
        orders: [Order!]!
    }

    type Order {
        id: Int!
        customer: User!
        products: [Product!]!
        created: DateTime
    }
`;

module.exports = typeDefs;
