const mongoose = require("mongoose");

const Customer = require("./models/Customer");

const db = mongoose.connect("mongodb://localhost:27017/customerDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const addCustomer = async (customer) => {
  const newCustomer = new Customer(customer);
  await newCustomer.save();
  console.info("Customer added.");
  (await db).disconnect();
};

const findCustomer = async (name) => {
  const search = new RegExp(name, "i");
  const customers = await Customer.find({
    $or: [{ firstName: search }, { lastName: search }],
  });
  console.info(customers);
  console.info(`${customers.length} matches.`);
  (await db).disconnect();
};

const findAllCustomer = async () => {
  const customers = await Customer.find();
  console.info(customers);
  console.info(`${customers.length} customers found.`);
  (await db).disconnect();
};

const updateCustomer = async (id, customer) => {
  await Customer.findByIdAndUpdate(id, { $set: customer });
  console.info("Customer updated.");
  (await db).disconnect();
};

const deleteCustomer = async (id) => {
  await Customer.findByIdAndDelete(id);
  console.info("Customer deleted.");
  (await db).disconnect();
};

module.exports = {
  addCustomer,
  findCustomer,
  findAllCustomer,
  updateCustomer,
  deleteCustomer,
};
