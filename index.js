#!/usr/bin/env node
const program = require("commander");
const { prompt } = require("inquirer");

const {
  addCustomer,
  findCustomer,
  findAllCustomer,
  updateCustomer,
  deleteCustomer,
} = require("./methods");

program.version("1.0.0").description("Customer management cli tool.");

const questions = [
  {
    type: "input",
    name: "firstName",
    message: "Customer's first name ?",
  },
  {
    type: "input",
    name: "lastName",
    message: "Customer's last name ?",
  },
  {
    type: "input",
    name: "phone",
    message: "Customer's phone number ?",
  },
  {
    type: "input",
    name: "email",
    message: "Customer's email ?",
  },
];

// program
//   .command("add <firstName> <lastName> <phone> <email>")
//   .alias("a")
//   .description("Add a customer.")
//   .action((firstName, lastName, phone, email) => {
//     addCustomer({ firstName, lastName, phone, email });
//   });

program
  .command("add")
  .alias("a")
  .description("Add a customer.")
  .action(async () => {
    const answers = await prompt(questions);
    addCustomer(answers);
  });

program
  .command("find <name>")
  .alias("f")
  .description("Find customers.")
  .action((name) => {
    findCustomer(name);
  });

program
  .command("list")
  .alias("l")
  .description("Find all customers.")
  .action(() => {
    findAllCustomer();
  });

program
  .command("update <id>")
  .alias("u")
  .description("Update customer.")
  .action(async (id) => {
    const answers = await prompt(questions);
    updateCustomer(id, answers);
  });

program
  .command("delete <id>")
  .alias("d")
  .description("Delete customer")
  .action((id) => {
    deleteCustomer(id);
  });

program.parse(process.argv);
