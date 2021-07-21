const { resolvers: scalarResolvers } = require('graphql-scalars');
const { categories, products, users, orders } = require('../db');

const resolvers = {
	Query: {
		getProduct: (parent, { id }) => products.find(item => item.id === id),
		getProducts: () => products,
		getProductsByCategory: (parent, { categoryId }) => products.filter(item => item.categoryId === categoryId),
		getUser: (parent, { id }) => users.find(item => item.id === id),
		getUsers: () => users

	},
	Mutation: {
		addProduct(parent, args) {
			const newProduct = {
				id: products.length + 1,
				...args
			};
			products.push(newProduct);
			return newProduct;
		},

		addOrder(parent, args) {
			const newOrder = {
				id: orders.length + 1,
				...args,
				created: new Date()
			};
			orders.push(newOrder);
			return newOrder;
		},

		addUser(parent, args) {
			const newUser = {
				id: users.length + 1,
				...args,
			};
			orders.push(newUser);
			return newUser;
		},
	},


	Category: {
		products: ({ id }) => products.filter(item => item.categoryId === id)
	},

	Product: {
		category: ({ categoryId }) => categories.find(item => item.id === categoryId)
	},

	User: {
		orders: ({ id }) => orders.filter(({ userId }) => userId === id)
	},

	Order: {
		customer: ({ userId }) => users.find(item => item.id === userId),
		products: ({ productIds }) => productIds.map(productId => products.find(({ id }) => id === productId))
	},

	DateTime: scalarResolvers.DateTime,
	EmailAddress: scalarResolvers.EmailAddress,
	PhoneNumber: scalarResolvers.PhoneNumber,
	Date: scalarResolvers.Date,
};

module.exports = resolvers;