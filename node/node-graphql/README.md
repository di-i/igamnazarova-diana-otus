Домашняя работа для Занятие "GraphQL Server"

На выбор одна из следующих задач:

Часть 1. Написать схему GraphQL для примера веб-приложения e-commerce shop: до 3 балла - какие сущности (минимум 3,
можно больше), какие у них поля, какие обязательные какие нет до 4 баллов - какие запросы/мутации понадобятся (минимум
4, можно больше)

Часть 2. до 5 баллов - развернуть локально graphQL + nodejs или воспользоваться одним из веб демо (graphqlbin),
перенести полностью или частично написанную в Части 1 схему. Результатом работы будет ссылка на онлайн демо или
репозиторий.

**Install and Start**

```node.js
npm ci
npm run start
```

**Playground**

http://localhost:4000/graphql

**Examples of requests**

```
query getProducts{
  getProducts{
    id
    title
    category {
      id
      name
    }
    description
  }
}

query getProduct{
  getProduct(id:13){
    id
    title
    category {
      id
      name
    }
    description
  }
}

query getProductsByCategory{
  getProductsByCategory(categoryId:3) {
    title
    price
  }
}

query getUsers{
  getUsers{
    username
    first_name
    last_name
    phone_number
    email
  }
}

query getUser {
  getUser(id: 1) {
    username
    first_name
    last_name
    email
    orders {
      id
      products {
        title
        category {
          id
          name
        }
      }
    }
  }
}

mutation newOrder($userId:Int!, $productIds:[Int!]!) {
  addOrder(userId: $userId, productIds: $productIds) {
    id
    customer {
      username
      last_name
      first_name
      email
    }
    products {
      title    
    }
    created
  }
}
// query variables for newOrder - {"userId": 2, "productIds": [2, 5, 18]}


mutation newProduct($title:String!, $categoryId: Int!, $description: String, $price: Int!) {
  addProduct(title:$title, categoryId: $categoryId, description: $description, price: $price) {
    id
    title
    category {
      name
    }
    description
  }
}
// query variables for newProduct - {"title":"PocketJuice Endurance AC -10,000 mAh Power Bank", "categoryId": 3, "description": "Power Bank With High-Speed Dual USB Ports And Built In Wall Plug, Works With All iPhone And Android Devices.", "price": 15}

mutation newUser($first_name: String!, $last_name: String!, $email: EmailAddress!, $date_of_birth: Date!, $phone_number: PhoneNumber!, $username: String!) {
  addUser(first_name: $first_name, last_name: $last_name, email:$email, username: $username, date_of_birth: $date_of_birth, phone_number:$phone_number) {
  	id
    first_name
    last_name
    email
    date_of_birth
    phone_number
}
}
// query variables for newUser - {"first_name": "Brad", "last_name": "Gibson", "email": "brad.gibson@example.com", "date_of_birth": "1993-07-20", "phone_number": "+13476594020", "username": "brad_gibson"}
```


