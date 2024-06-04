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

  // qbo.batch(
  //   [
  //     {
  //       Query: "select * from Account",
  //     },
  //     {
  //       Query: "select * from Attachable",
  //     },
  //     {
  //       Query: "select * from Bill",
  //     },
  //     {
  //       Query: "select * from billpayment",
  //     },
  //     {
  //       Query: "Select * from Budget",
  //     },
  //     {
  //       Query: "select  * from Class",
  //     },
  //     {
  //       Query: "select * from companycurrency",
  //     },
  //     {
  //       Query: "select * from CompanyInfo",
  //     },
  //     {
  //       Query: "select * from CreditMemo TxnDate",
  //     },
  //     {
  //       Query: "select * from creditcardpayment",
  //     },
  //     {
  //       Query: "select * from Customer",
  //     },
  //     {
  //       Query: "select * From CustomerType",
  //     },
  //     {
  //       Query: "select * from Department",
  //     },
  //     {
  //       Query: "select * from Deposit",
  //     },
  //     {
  //       Query: "select * from Employee",
  //     },
  //     {
  //       Query: "select * from estimate",
  //     },
  //     {
  //       Query: "select * from exchangerate",
  //     },
  //     {
  //       Query: "select * from Invoice",
  //     },
  //     {
  //       Query: "select * from Item maxresults 2",
  //     },
  //     {
  //       Query: "select * from journalcode",
  //     },
  //     {
  //       Query: "select * from JournalEntry",
  //     },
  //     {
  //       Query: "select * from Payment",
  //     },
  //     {
  //       Query: "select * from PaymentMethod",
  //     },
  //     {
  //       Query: "select * from Preferences",
  //     },
  //     {
  //       Query: "select * from Purchase",
  //     },
  //     {
  //       Query: "select * from PurchaseOrder",
  //     },
  //     {
  //       Query: "Select * From RecurringTransaction",
  //     },
  //     {
  //       Query: "select * from RefundReceipt",
  //     },
  //     {
  //       Query: "Select * from ReimburseCharge",
  //     },
  //     {
  //       Query: "select * from SalesReceipt",
  //     },
  //   ],
  //   (err, response) => {
  //     console.log("err", err);
  //     console.log("response", response.BatchItemResponse);
  //   }
  // );

  qbo.batch(
    [
      {
        Query: "select * From TaxCode",
      },
      {
        Query: "Select * From TaxRate",
      },
      {
        Query: "select * from TaxAgency",
      },
      {
        Query: "select * from Term",
      },
      {
        Query: "select * from TimeActivity",
      },
      {
        Query: "select * from Transfer",
      },
      {
        Query: "select * from vendor",
      },
      {
        Query: "select * from vendorcredit",
      },
      {
        Query: "",
      },
    ],
    (err, response) => {
      console.log("err", err);
      console.log("json", JSON.stringify(response.BatchItemResponse));
      console.log("response", response.BatchItemResponse);
    }
  );
};

main();
