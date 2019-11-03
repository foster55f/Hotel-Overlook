class CustomerCollection {
    constructor(customers) {
        this.customers = customers;
    }

    findAllByName(name) {
        var foundName = this.customers.filter(customer => {
            return customer.name.toLowerCase().startsWith(name.toLowerCase());
          })
          return foundName
    }

    getUserData(id) {
            return this.customers.find(user => user.id === id)
        }
}
export default CustomerCollection;