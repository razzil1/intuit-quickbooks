import QuickBooks from "node-quickbooks";
import fs from "fs";
import { Account, Attachable, BillPayment } from "./db/db.js";
import { Sequelize } from "sequelize";
import { flattenObject } from "./utils.js";

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

const sequelize = new Sequelize("master", "sa", "<YourStrong@Passw0rd>", {
  host: "localhost",
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: true, // Use encryption
      enableArithAbort: true, // Abort queries when there is an overflow or divide-by-zero error
    },
  },
  logging: false, // Disable logging; default: console.log
});

const insertOrUpdateObjects = async (Model, arrayOfObjects) => {
  try {
    await sequelize.transaction(async (t) => {
      for (const obj of arrayOfObjects) {
        await Model.upsert(obj);
      }
    });
    console.log("Objects inserted or updated successfully");
  } catch (error) {
    console.error("Error inserting or updating objects:", error);
  }
};

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    qbo.batch(
      [
        {
          Query: "select * from Account",
        },
        {
          Query: "select * from Attachable",
        },
        // {
        //   Query: "select * from Bill",
        // },
        {
          Query: "select * from billpayment",
        },
        // {
        //   Query: "Select * from Budget",
        // },
        // {
        //   Query: "select  * from Class",
        // },
        // {
        //   Query: "select * from companycurrency",
        // },
        // {
        //   Query: "select * from CompanyInfo",
        // },
        // {
        //   Query: "select * from CreditMemo",
        // },
        // {
        //   Query: "select * from creditcardpayment",
        // },
        // {
        //   Query: "select * from Customer",
        // },
        // {
        //   Query: "select * From CustomerType",
        // },
        // {
        //   Query: "select * from Department",
        // },
        // {
        //   Query: "select * from Deposit",
        // },
        // {
        //   Query: "select * from Employee",
        // },
        // {
        //   Query: "select * from estimate",
        // },
        // {
        //   Query: "select * from exchangerate",
        // },
        // {
        //   Query: "select * from Invoice",
        // },
        // {
        //   Query: "select * from Item",
        // },
        // // {
        // //   Query: "select * from JournalCode",
        // // },
        // // French only
        // {
        //   Query: "select * from JournalEntry",
        // },
        // {
        //   Query: "select * from Payment",
        // },
        // {
        //   Query: "select * from PaymentMethod",
        // },
        // {
        //   Query: "select * from Preferences",
        // },
        // {
        //   Query: "select * from Purchase",
        // },
        // {
        //   Query: "select * from PurchaseOrder",
        // },
        // {
        //   Query: "Select * From RecurringTransaction",
        // },
        // {
        //   Query: "select * from RefundReceipt",
        // },
        // {
        //   Query: "Select * from ReimburseCharge",
        // },
        // {
        //   Query: "select * from SalesReceipt",
        // },
      ],
      async (err, response) => {
        console.log("err batch", err);

        console.log("response", response.BatchItemResponse);

        const accounts =
          response?.BatchItemResponse?.[0].QueryResponse?.Account?.map((item) =>
            flattenObject(item)
          ) ?? [];

        await insertOrUpdateObjects(Account, accounts);

        const attachables =
          response?.BatchItemResponse?.[1].QueryResponse?.Attachable?.map(
            (item) => flattenObject(item)
          ) ?? [];

        await insertOrUpdateObjects(Attachable, attachables);

        const billPayments =
          response?.BatchItemResponse?.[2].QueryResponse?.BillPayment?.map(
            (item) => flattenObject(item)
          ) ?? [];

        await insertOrUpdateObjects(BillPayment, billPayments);
      }
    );

    // qbo.batch(
    //   [
    //     {
    //       Query: "select * From TaxCode",
    //     },
    //     {
    //       Query: "Select * From TaxRate",
    //     },
    //     {
    //       Query: "select * from TaxAgency",
    //     },
    //     {
    //       Query: "select * from Term",
    //     },
    //     {
    //       Query: "select * from TimeActivity",
    //     },
    //     {
    //       Query: "select * from Transfer",
    //     },
    //     {
    //       Query: "select * from vendor",
    //     },
    //     {
    //       Query: "select * from vendorcredit",
    //     },
    //   ],
    //   (err, response) => {
    //     console.log("err", err);
    //     console.log("json", JSON.stringify(response.BatchItemResponse));
    //     console.log("response", response.BatchItemResponse);
    //   }
    // );

    // qbo.findInvoices({ fetchAll: true }, (err, response) => {
    //   response.QueryResponse.Invoice.forEach((invoice) => {
    //     if (err) {
    //       console.error(err);
    //     }
    //     qbo.getInvoicePdf(invoice.Id, (err, response) => {
    //       if (err) {
    //         console.error("err invoice pdf", err);
    //       }

    //       fs.writeFile(
    //         `./invoices/Invoice-${invoice.Id}.pdf`,
    //         response,
    //         (err) => {
    //           if (err) {
    //             console.error("Error writing the Invoice file:", err);
    //           } else {
    //             console.log("Invoice file has been saved!");
    //           }
    //         }
    //       );
    //     });
    //   });
    // });

    // qbo.findEstimates({ fetchAll: true }, (err, response) => {
    //   if (!response.QueryResponse) {
    //     return;
    //   }
    //   response.QueryResponse.Estimate.forEach((estimate) => {
    //     if (err) {
    //       console.error(err);
    //     }
    //     qbo.getEstimatePdf(estimate.Id, (err, response) => {
    //       if (err) {
    //         console.error("err estimate pdf", err);
    //       }

    //       fs.writeFile(
    //         `./estimates/Estimate-${estimate.Id}.pdf`,
    //         response,
    //         (err) => {
    //           if (err) {
    //             console.error("Error writing the estimates file:", err);
    //           } else {
    //             console.log("Estimates file has been saved!");
    //           }
    //         }
    //       );
    //     });
    //   });
    // });

    // qbo.findCreditMemos({ fetchAll: true }, (err, response) => {
    //   if (!response.QueryResponse) {
    //     return;
    //   }
    //   response.QueryResponse.CreditMemo.forEach((creditMemo) => {
    //     if (err) {
    //       console.error(err);
    //     }
    //     qbo.getCreditMemoPdf(creditMemo.Id, (err, response) => {
    //       if (err) {
    //         console.error("err creditMemo pdf", err);
    //       }

    //       fs.writeFile(
    //         `./creditMemos/CreditMemo-${creditMemo.Id}.pdf`,
    //         response,
    //         (err) => {
    //           if (err) {
    //             console.error("Error writing the creditMemos file:", err);
    //           } else {
    //             console.log("CreditMemos file has been saved!");
    //           }
    //         }
    //       );
    //     });
    //   });
    // });

    // qbo.findSalesReceipts({ fetchAll: true }, (err, response) => {
    //   if (!response.QueryResponse) {
    //     return;
    //   }
    //   response.QueryResponse.SalesReceipt.forEach((salesReceipt) => {
    //     if (err) {
    //       console.error(err);
    //     }
    //     qbo.getSalesReceiptPdf(salesReceipt.Id, (err, response) => {
    //       if (err) {
    //         console.error("err salesReceipt pdf", err);
    //       }

    //       fs.writeFile(
    //         `./salesReceipts/SalesReceipt-${salesReceipt.Id}.pdf`,
    //         response,
    //         (err) => {
    //           if (err) {
    //             console.error("Error writing the salesReceipt file:", err);
    //           } else {
    //             console.log("SalesReceipts file has been saved!");
    //           }
    //         }
    //       );
    //     });
    //   });
    // });
  } catch (err) {
    console.log("err", err);
  }
};

main();
