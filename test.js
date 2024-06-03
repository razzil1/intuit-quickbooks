import QuickBooks from "node-quickbooks";
import sql from "mssql";

const qbo = new QuickBooks(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.ACCESS_TOKEN,
  false, // no token secret for oAuth 2.0
  process.env.COMPANY_ID,
  true, // use the sandbox?
  false, // enable debugging?
  null, // set minorversion, or null for the latest version
  "2.0", //oAuth version
  process.env.REFRESH_TOKEN
);

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    // encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

const ACCOUNTS_TABLE = [
  {
    name: "Id",
    type: sql.NVarChar(255),
    options: { nullable: false, primary: true },
  },
  {
    name: "FullyQualifiedName",
    type: sql.NVarChar(255),
    options: { nullable: false },
  },
  { name: "domain", type: sql.NVarChar(255), options: { nullable: false } },
  { name: "Name", type: sql.NVarChar(255), options: { nullable: false } },
  {
    name: "Classification",
    type: sql.NVarChar(255),
    options: { nullable: false },
  },
  {
    name: "AccountSubType",
    type: sql.NVarChar(255),
    options: { nullable: false },
  },
  {
    name: "AccountType",
    type: sql.NVarChar(255),
    options: { nullable: false },
  },
  { name: "SyncToken", type: sql.NVarChar(255), options: { nullable: false } },
  {
    name: "CurrentBalanceWithSubAccounts",
    type: sql.Int,
    options: { nullable: false },
  },
  { name: "CurrentBalance", type: sql.Int, options: { nullable: false } },
  { name: "sparse", type: sql.Bit, options: { nullable: false } },
  { name: "Active", type: sql.Bit, options: { nullable: false } },
  { name: "SubAccount", type: sql.Bit, options: { nullable: false } },
];

const BILLS_TABLE = [
  {
    name: "Id",
    type: sql.NVarChar(255),
    options: { nullable: false, primary: true },
  },
  { name: "SyncToken", type: sql.NVarChar(255), options: { nullable: false } },
  { name: "domain", type: sql.NVarChar(255), options: { nullable: false } },
  { name: "TxnDate", type: sql.NVarChar(255), options: { nullable: false } },
  { name: "TotalAmt", type: sql.Int, options: { nullable: false } },
  { name: "DueDate", type: sql.NVarChar(255), options: { nullable: false } },
  { name: "sparse", type: sql.Bit, options: { nullable: false } },
  { name: "Balance", type: sql.Int, options: { nullable: false } },
];

const CUSTOMERS_TABLE = [
  {
    name: "Id",
    type: sql.NVarChar(255),
    options: { nullable: false, primary: true },
  },
  { name: "SyncToken", type: sql.NVarChar(255), options: { nullable: false } },
  { name: "domain", type: sql.NVarChar(255), options: { nullable: false } },
  { name: "GivenName", type: sql.NVarChar(255), options: { nullable: false } },
  {
    name: "DisplayName",
    type: sql.NVarChar(255),
    options: { nullable: false },
  },
  { name: "BillWithParent", type: sql.Bit, options: { nullable: false } },
  {
    name: "FullyQualifiedName",
    type: sql.NVarChar(255),
    options: { nullable: false },
  },
  {
    name: "CompanyName",
    type: sql.NVarChar(255),
    options: { nullable: true },
  },
  { name: "FamilyName", type: sql.NVarChar(255), options: { nullable: true } },
  { name: "sparse", type: sql.Bit, options: { nullable: false } },
  { name: "Active", type: sql.Bit, options: { nullable: false } },
  { name: "Job", type: sql.Bit, options: { nullable: false } },
  { name: "BalanceWithJobs", type: sql.Int, options: { nullable: false } },
  {
    name: "PreferredDeliveryMethod",
    type: sql.NVarChar(255),
    options: { nullable: false },
  },
  { name: "Taxable", type: sql.Bit, options: { nullable: false } },
  {
    name: "PrintOnCheckName",
    type: sql.NVarChar(255),
    options: { nullable: false },
  },
  { name: "Balance", type: sql.Int, options: { nullable: false } },
];

const main = async () => {
  await sql.connect(sqlConfig);

  const accountsTable = new sql.Table("accounts");
  accountsTable.create = true;

  ACCOUNTS_TABLE.forEach((column) =>
    accountsTable.columns.add(column.name, column.type, column.options)
  );

  qbo.findAccounts({ fetchAll: true }, function (err, accounts) {
    accounts.QueryResponse.Account.forEach(function (account) {
      accountsTable.rows.add(
        account.Id,
        account.FullyQualifiedName,
        account.domain,
        account.Name,
        account.Classification,
        account.AccountSubType,
        account.AccountType,
        account.SyncToken,
        account.CurrentBalanceWithSubAccounts,
        account.CurrentBalance,
        account.sparse,
        account.Active,
        account.SubAccount
      );
    });

    const request = new sql.Request();

    request.bulk(accountsTable, (err, result) => {
      console.log("err -> Accounts", err);
      console.log("result -> Accounts", result);
    });
  });

  const billsTable = new sql.Table("bills");
  billsTable.create = true;

  BILLS_TABLE.forEach((column) =>
    billsTable.columns.add(column.name, column.type, column.options)
  );

  qbo.findBills({ fetchAll: true }, function (err, bills) {
    bills.QueryResponse.Bill.forEach(function (bill) {
      billsTable.rows.add(
        bill.Id,
        bill.SyncToken,
        bill.domain,
        bill.TxnDate,
        bill.TotalAmt,
        bill.DueDate,
        bill.sparse,
        bill.Balance
      );
    });

    const request = new sql.Request();

    request.bulk(billsTable, (err, result) => {
      console.log("err -> Bills", err);
      console.log("result -> Bills", result);
    });
  });

  const customersTable = new sql.Table("customers");
  customersTable.create = true;

  CUSTOMERS_TABLE.forEach((column) =>
    customersTable.columns.add(column.name, column.type, column.options)
  );

  qbo.findCustomers({ fetchAll: true }, function (err, customers) {
    customers.QueryResponse.Customer.forEach(function (customer) {
      customersTable.rows.add(
        customer.Id,
        customer.SyncToken,
        customer.domain,
        customer.GivenName,
        customer.DisplayName,
        customer.BillWithParent,
        customer.FullyQualifiedName,
        customer.CompanyName,
        customer.FamilyName,
        customer.sparse,
        customer.Active,
        customer.Job,
        customer.BalanceWithJobs,
        customer.PreferredDeliveryMethod,
        customer.Taxable,
        customer.PrintOnCheckName,
        customer.Balance
      );
    });

    const request = new sql.Request();

    request.bulk(customersTable, (err, result) => {
      console.log("err -> Customers", err);
      console.log("result -> Customers", result);
    });
  });
};

main();
