import QuickBooks from "node-quickbooks";

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

const main = async () => {
  // qbo.findAccounts({ fetchAll: true }, function (err, accounts) {
  //   console.log(
  //     "accounts.QueryResponse.Account :>> ",
  //     accounts.QueryResponse.Account
  //   );
  // });

  // qbo.findBills({ fetchAll: true }, function (err, bills) {
  //   console.log("bills.QueryResponse.Bill :>> ", bills.QueryResponse.Bill);
  // });

  // qbo.findCustomers({ fetchAll: true }, function (err, customers) {
  //   console.log(
  //     "customers.QueryResponse.Customer :>> ",
  //     customers.QueryResponse.Customer
  //   );
  // });

  qbo.batch(
    [
      {
        Query: "select * from SalesReceipt",
      },
      {
        Query: "select * from Account",
      },
    ],
    (err, response) => {
      console.log("response", response.BatchItemResponse);
    }
  );
};

main();
