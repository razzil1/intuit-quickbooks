import QuickBooks from "node-quickbooks";
import fs from "fs";

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
  // qbo.batch(
  //   [
  //     // {
  //     //   Query: "select * from Account",
  //     // },
  //     // // {
  //     // //   Query: "select * from Attachable",
  //     // // },
  //     // // Check this when you download first PDF
  //     // {
  //     //   Query: "select * from Bill",
  //     // },
  //     // {
  //     //   Query: "select * from billpayment",
  //     // },
  //     // {
  //     //   Query: "Select * from Budget",
  //     // },
  //     // {
  //     //   Query: "select  * from Class",
  //     // },
  //     // {
  //     //   Query: "select * from companycurrency",
  //     // },
  //     // {
  //     //   Query: "select * from CompanyInfo",
  //     // },
  //     // {
  //     //   Query: "select * from CreditMemo",
  //     // },
  //     // {
  //     //   Query: "select * from creditcardpayment",
  //     // },
  //     // {
  //     //   Query: "select * from Customer",
  //     // },
  //     // {
  //     //   Query: "select * From CustomerType",
  //     // },
  //     // {
  //     //   Query: "select * from Department",
  //     // },
  //     // {
  //     //   Query: "select * from Deposit",
  //     // },
  //     // {
  //     //   Query: "select * from Employee",
  //     // },
  //     // {
  //     //   Query: "select * from estimate",
  //     // },
  //     // {
  //     //   Query: "select * from exchangerate",
  //     // },
  //     // {
  //     //   Query: "select * from Invoice",
  //     // },
  //     // {
  //     //   Query: "select * from Item",
  //     // },
  //     // // {
  //     // //   Query: "select * from JournalCode",
  //     // // },
  //     // // French only
  //     // {
  //     //   Query: "select * from JournalEntry",
  //     // },
  //     // {
  //     //   Query: "select * from Payment",
  //     // },
  //     // {
  //     //   Query: "select * from PaymentMethod",
  //     // },
  //     // {
  //     //   Query: "select * from Preferences",
  //     // },
  //     // {
  //     //   Query: "select * from Purchase",
  //     // },
  //     // {
  //     //   Query: "select * from PurchaseOrder",
  //     // },
  //     // {
  //     //   Query: "Select * From RecurringTransaction",
  //     // },
  //     // {
  //     //   Query: "select * from RefundReceipt",
  //     // },
  //     // {
  //     //   Query: "Select * from ReimburseCharge",
  //     // },
  //     // {
  //     //   Query: "select * from SalesReceipt",
  //     // },
  //   ],
  //   (err, response) => {
  //     console.log("err batch", err);
  //     console.log("response", response.BatchItemResponse);
  //     // response.BatchItemResponse[0].QueryResponse.Invoice.map((invoice) => {
  //     //   console.log("Invoice", invoice.Id);
  //     //   qbo.getInvoicePdf(invoice.Id, (err, response) => {
  //     //     console.log("err invoice pdf", err);
  //     //     fs.writeFile(
  //     //       `./invoices/Invoice-${invoice.Id}.pdf`,
  //     //       response,
  //     //       (err) => {
  //     //         if (err) {
  //     //           console.error("Error writing the file:", err);
  //     //         } else {
  //     //           console.log("File has been saved!");
  //     //         }
  //     //       }
  //     //     );
  //     //   });
  //     // });
  //   }
  // );

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
  //       Query: "select * from Class",
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

  qbo.findInvoices({ fetchAll: true }, (err, response) => {
    response.QueryResponse.Invoice.forEach((invoice) => {
      if (err) {
        console.error(err);
      }
      qbo.getInvoicePdf(invoice.Id, (err, response) => {
        if (err) {
          console.error("err invoice pdf", err);
        }

        fs.writeFile(
          `./invoices/Invoice-${invoice.Id}.pdf`,
          response,
          (err) => {
            if (err) {
              console.error("Error writing the Invoice file:", err);
            } else {
              console.log("Invoice file has been saved!");
            }
          }
        );
      });
    });
  });
};

main();
