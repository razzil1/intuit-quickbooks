import { Sequelize, DataTypes } from "sequelize";
import {
  Id,
  VendorRef,
  TotalAmt,
  SyncToken,
  CurrencyRef,
  DocNumber,
  PrivateNote,
  TxnDate,
  ExchangeRate,
  APAccountRef,
  DepartmentRef,
  MetaData,
  RecurDataRef,
  Balance,
  Name,
  Active,
  ParentRef,
  FullyQualifiedName,
  CustomerRef,
  ClassRef,
  SalesTermRef,
  HomeBalance,
  Amount,
  PrintStatus,
  WebAddrURI,
  CompanyName,
  ShipAddr,
  PaymentMethodRef,
  BillAddr,
} from "./common-attributes.js";

// Create a Sequelize instance, replace with your database credentials
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

export const Account = sequelize.define("Account", {
  ...Id,
  ...Name,
  ...SyncToken,
  AcctNum: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ...CurrencyRef,
  ...ParentRef,
  Description: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ...Active,
  ...MetaData,
  SubAccount: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  Classification: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ...FullyQualifiedName,
  AccountType: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrentBalanceWithSubAccounts: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  AccountSubType: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrentBalance: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
});

export const Attachable = sequelize.define("Attachable", {
  ...Id,
  ...SyncToken,
  FileName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Note: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Category: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ContentType: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PlaceName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  AttachableRefIncludeOnSend: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  AttachableRefLineInfo: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  AttachableRefNoRefOnly: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  AttachableRefInactive: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  AttachableRefEntityRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  AttachableRefEntityRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Long: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Tag: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Lat: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ...MetaData,

  FileAccessUri: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Size: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  ThumbnailFileAccessUri: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TempDownloadUri: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ThumbnailTempDownloadUri: {
    allowNull: true,
    type: DataTypes.STRING,
  },
});

export const Bill = sequelize.define("Bill", {
  ...Id,
  ...VendorRef,
  ...SyncToken,
  ...CurrencyRef,
  ...TxnDate,
  ...APAccountRef,
  ...SalesTermRef,
  ...TotalAmt,
  DueDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  ...MetaData,
  ...DocNumber,
  ...PrivateNote,
  ...ExchangeRate,
  ...DepartmentRef,
  ...HomeBalance,
  ...RecurDataRef,
  ...Balance,
});

export const LinkedTxn = sequelize.define("LinkedTxn", {
  TnxId: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  TxnType: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  TxnLineId: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillId: {
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: "Bills",
      key: "Id",
    },
  },
});

Bill.hasMany(LinkedTxn, { as: "linkedTxns" });
LinkedTxn.belongsTo(Bill);

export const BillPayment = sequelize.define("BillPayment", {
  ...Id,
  ...VendorRef,
  ...TotalAmt,
  PayType: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  ...SyncToken,
  ...CurrencyRef,
  ...DocNumber,
  ...PrivateNote,
  ...TxnDate,
  ...ExchangeRate,
  ...APAccountRef,
  ...DepartmentRef,
  ProcessBillPayment: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  ...MetaData,
  CheckPaymentBankAccountRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CheckPaymentBankAccountRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CheckPaymentPrintStatus: {
    allowNull: true,
    type: DataTypes.STRING,
  },

  CreditCardPaymentCCAccountRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CreditCardPaymentCCAccountRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
});

export const Budget = sequelize.define("Budget", {
  ...Id,
  EndDate: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  StartDate: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  ...SyncToken,
  BudgetEntryType: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ...Name,
  BudgetType: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ...Active,
  ...MetaData,
});

export const BudgetDetail = sequelize.define("BudgetDetail", {
  Id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  ...ClassRef,
  ...DepartmentRef,
  ...Amount,
  BudgetDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  AccountRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  AccountRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ...CustomerRef,
  BudgetId: {
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: "Budgets",
      key: "Id",
    },
  },
});

Budget.hasMany(BudgetDetail, { as: "budgetDetails" });
BudgetDetail.belongsTo(Budget);

export const Class = sequelize.define("Class", {
  ...Id,
  ...Name,
  ...SyncToken,
  ...ParentRef,
  SubClass: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  ...Active,
  ...MetaData,
  ...FullyQualifiedName,
});

export const CompanyCurrency = sequelize.define("CompanyCurrency", {
  ...Id,
  Code: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  ...SyncToken,
  ...Name,
  ...Active,
  ...MetaData,
});

export const CompanyInfo = sequelize.define("CompanyInfo", {
  ...Id,
  ...SyncToken,
  ...CompanyName,
  CompanyAddrId: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CompanyAddrPostalCode: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CompanyAddrCity: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CompanyAddrCountry: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CompanyAddrLine1: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CompanyAddrLine2: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CompanyAddrLine3: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CompanyAddrLine4: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CompanyAddrLine5: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CompanyAddrLat: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CompanyAddrLong: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CompanyAddrCountrySubDivisionCode: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LegalAddrId: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LegalAddrPostalCode: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LegalAddrCity: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LegalAddrCountry: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LegalAddrLine1: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LegalAddrLine2: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LegalAddrLine3: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LegalAddrLine4: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LegalAddrLine5: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LegalAddrLat: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LegalAddrLong: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LegalAddrCountrySubDivisionCode: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SupportedLanguages: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Country: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  EmailAddress: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ...WebAddrURI,
  FiscalYearStartMonth: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerCommunicationAddrId: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerCommunicationAddrPostalCode: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerCommunicationAddrCity: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerCommunicationAddrCountry: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerCommunicationAddrLine1: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerCommunicationAddrLine2: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerCommunicationAddrLine3: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerCommunicationAddrLine4: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerCommunicationAddrLine5: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerCommunicationAddrLat: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerCommunicationAddrLong: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerCommunicationAddrCountrySubDivisionCode: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrimaryPhoneFreeFormNumber: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LegalName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ...MetaData,
  CompanyStartDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
});

export const CreditMemo = sequelize.define("CreditMemo", {
  ...Id,
  // Line,
  ...CustomerRef,
  ...SyncToken,
  ...CurrencyRef,
  BillEmailAddress: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ...TxnDate,
  ...ClassRef,
  ...PrintStatus,
  ...SalesTermRef,
  ...TotalAmt,
  ApplyTaxAfterDiscount: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  ...DocNumber,
  ...PrivateNote,
  CustomerMemoValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ProjectRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ProjectRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnTaxDetailTxnTaxCodeRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnTaxDetailTxnTaxCodeRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnTaxDetailTotalTax: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  // TxnTaxDetailTaxLine,
  ...PaymentMethodRef,
  ExchangeRate: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  ...ShipAddr,
  ...DepartmentRef,
  EmailStatus: {
    allowNull: true,
    type: DataTypes.STRING,
  },

  ...BillAddr,
  ...MetaData,
  ...HomeBalance,
  RemainingCredit: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  ...RecurDataRef,
  TaxExemptionRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TaxExemptionRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ...Balance,
  HomeTotalAmt: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
});

export const VendorCredit = sequelize.define("VendorCredit", {
  ...Id,
  ...VendorRef,
  ...SyncToken,
  ...CurrencyRef,
  ...DocNumber,
  ...PrivateNote,
  GlobalTaxCalculation: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ...APAccountRef,
  ...DepartmentRef,
  ...TxnDate,
  ...Balance,
  ...RecurDataRef,
  ...TotalAmt,
});

export const CreditCardPayment = sequelize.define("CreditCardPayment", {
  ...Id,
  CreditCardAccountRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CreditCardAccountRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ...Amount,
  BankAccountRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BankAccountRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ...SyncToken,
  ...PrivateNote,
  ...VendorRef,
  ...TxnDate,
  Memo: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ...PrintStatus,
  CheckNum: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ...MetaData,
});

export const Customer = sequelize.define("Customer", {
  ...Id,
  ...SyncToken,
  DisplayName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Title: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  GivenName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MiddleName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Suffix: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  FamilyName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrimaryEmailAddrAddress: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ResaleNum: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DefaultTaxCodeRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DefaultTaxCodeRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PreferredDeliveryMethod: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ...SalesTermRef,
  CustomerTypeRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  FaxFreeFormNumber: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillWithParent: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  ...CurrencyRef,
  MobileFreeFormNumber: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Job: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  BalanceWithJobs: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  PrimaryPhoneFreeFormNumber: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OpenBalanceDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  Taxable: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  AlternatePhoneFreeFormNumber: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ...MetaData,
  ...ParentRef,
  Notes: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ...WebAddrURI,
  ...Active,
  ...CompanyName,
  ...Balance,
  ...ShipAddr,
  ...PaymentMethodRef,
  IsProject: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  Source: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrintOnCheckName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ...BillAddr,
  ...FullyQualifiedName,
  Level: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  TaxExemptionReasonId: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
});

export const CustomerType = sequelize.define("CustomerType", {
  ...Id,
  ...SyncToken,
  ...Name,
  ...Active,
  ...MetaData,
});

export const Department = sequelize.define("Department", {
  ...Id,
  ...Name,
  ...SyncToken,
  ...ParentRef,
  ...Active,
  ...MetaData,
  ...FullyQualifiedName,
  SubDepartment: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
});

const Vendor = sequelize.define("Vendor", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Title: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  GivenName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MiddleName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Suffix: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  FamilyName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrimaryEmailAddrAddress: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DisplayName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DisplayName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherContactInfoType: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherContactInfoTelephone: {
    allowNull: true,
    type: DataTypes.TelephoneNumber,
  },
  OtherContactInfoType: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TermRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TermRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TermRefSource: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  FaxFreeFormNumber: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MobileFreeFormNumber: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrimaryPhoneFreeFormNumber: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Active: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  AlternatePhoneFreeFormNumber: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MetaDataCreateTime: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  CreateTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LastUpdatedTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Vendor1099: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  BillRate: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  WebAddrURI: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CompanyName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TaxIdentifier: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  AcctNum: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrintOnCheckName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Balance: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
});
const Transfer = sequelize.define("Transfer", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  ToAccountRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ToAccountRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Amount: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  FromAccountRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  FromAccountRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrivateNote: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnDate: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MetaDataCreateTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LastUpdatedTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurDataRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurDataRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
});
const TimeActivity = sequelize.define("TimeActivity", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  NameOf: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnDate: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  EndTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Hours: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  VendorRefVaule: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  VendorRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  HourlyRate: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  CustomerRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  EmployeeRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  EmployeeRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  StartTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ClassRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ClassRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Description: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Taxable: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  MetaDataCreateTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LastUpdatedTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CostRate: {
    allowNull: true,
    type: DataTypes.BIGINT,
  },
  CostRateValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CostRateName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PayrollItemRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PayrollItemRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  // BillableStatus: {
  //   allowNull: true,
  //   type: DataTypes.BIGINT,
  // },
  BillableStatus: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DepartmentRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DepartmentRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
});
const Term = sequelize.define("Term", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  Name: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DiscountPercent: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  DiscountDays: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  Active: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  Type: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MetaDataCreateTimedateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LastUpdatedTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DayOfMonthDue: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  DiscountDayOfMonth: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  DueNextMonthDays: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  DueDays: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
});
const TaxAgency = sequelize.define("TaxAgency", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  DisplayName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TaxTrackedOnSales: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TaxTrackedOnSales: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  TaxTrackedOnPurchases: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  TaxRegistrationNumber: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MetaDataCreateTimedateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LastUpdatedTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TaxAgencyConfig: {
    allowNull: true,
    type: DataTypes.STRING,
  },
});
const TaxRate = sequelize.define("TaxRate", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RateValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Name: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  AgencyRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  AgencyRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SpecialTaxType: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  EffectiveTaxRateRateValue: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  EffectiveTaxRateEndDate: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  EffectiveTaxRateEffectiveDate: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DisplayType: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DisplayValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DisplayName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Active: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  MetaDataCreateTimeDateTime: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  LastUpdatedTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Description: {
    allowNull: true,
    type: DataTypes.STRING,
  },
});
const ReimburseCharge = sequelize.define("ReimburseCharge", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  Amount: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  CustomerRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrivateNote: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  // LinkedTxn [0..n]: {
  //   allowNull: true,
  //   type: DataTypes.STRING,
  // },
  ExchangeRate: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  MetaDataCreateTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LastUpdatedTimeDateTime: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  HasBeenInvoiced: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  HomeTotalAmt: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
});
const RefundReceipt = sequelize.define("RefundReceipt", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  DepositToAccountRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DepositToAccountRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PaymentRefNum: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillEmailAddress: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  CustomFieldDefinitionId: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  StringValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Type: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ClassRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ClassRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CheckPaymentCheckNum: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CheckPaymentStatus: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CheckPaymentNameOnAcct: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CheckPaymentAcctNum: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CheckPaymentBankName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CheckPaymentTxnSource: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MetaDataCreateTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LastUpdatedTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrivateNote: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerMemoValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ProjectRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ProjectRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  // CreditCardPaymentCreditChargeResponse: {
  //   allowNull: true,
  //   type: DataTypes.STRING,
  // },
  CustomerRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnTaxDetailTxnTaxCodeRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnTaxDetailTxnTaxCodeRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TotalTax: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  PaymentMethodRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PaymentMethodRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ExchangeRate: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  // ShipAddr: {
  //   allowNull: true,
  //   type: DataTypes.DECIMAL,
  // },
  DepartmentRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DepartmentRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  // PaymentType: {
  //   allowNull: true,
  //   type: DataTypes.STRING,
  // },
  // BillAddr: {
  //   allowNull: true,
  //   type: DataTypes.STRING,
  // },
  HomeBalance: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  RecurDataRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurDataRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TaxExemptionRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TaxExemptionRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Balance: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  HomeTotalAmt: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
});
const RecurringTransaction = sequelize.define("RecurringTransaction", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  RecurringInfoRecurType: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurringInfoScheduleInfoDayOfWeek: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurringInfoScheduleInfoDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurringInfoScheduleInfoMaxOccurrences: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurringInfoScheduleInfoRemindDays: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurringInfoScheduleInfoIntervalType: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurringInfoScheduleInfoWeekOfMonth: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurringInfoScheduleInfoMonthOfYear: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurringInfoScheduleInfoDaysBefore: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurringInfoScheduleInfoNextDateDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurringInfoScheduleInfoNumInterval: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurringInfoScheduleInfoEndDateDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurringInfoScheduleInfoDayOfMonth: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Name: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Active: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurDataRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurDataRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MetaDataCreateTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LastUpdatedTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Type: {
    allowNull: true,
    type: DataTypes.STRING,
  },
});
const Purchaseorder = sequelize.define("Purchaseorder", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  APAccountRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  APAccountRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  VendorRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  VendorRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  CustomFieldDefinitionId: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomFieldStringValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomFieldName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomFieldType: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  POEmailAddress: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ClassRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ClassRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SalesTermRef: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Memo: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  POStatus: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MetaDataCreateTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MetaDataLastUpdatedTimedDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DocNumber: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrivateNote: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ShipMethodRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ShipMethodRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnTaxDetailTxnTaxCodeRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnTaxDetailTxnTaxCodeRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TotalTax: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  ShipToValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ShipToValueName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ExchangeRate: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  // ShipAddr: {
  //   allowNull: true,
  //   type: DataTypes.DECIMAL,
  // },
  EmailStatus: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TotalAmt: {
    allowNull: true,
    type: DataTypes.BIGINT,
  },
  RecurDataRefValue: {
    allowNull: true,
    type: DataTypes.BIGINT,
  },
  RecurDataRefName: {
    allowNull: true,
    type: DataTypes.BIGINT,
  },
});
const Purchase = sequelize.define("Purchase", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  PaymentType: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  AccountRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  AccountRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  PrintStatus: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  // RemitToAddr: {
  //   allowNull: true,
  //   type: DataTypes.STRING,
  // },
  // LinkedTxn [0..n]: {
  //   allowNull: true,
  //   type: DataTypes.STRING,
  // },
  MetaDataCreateTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LastUpdatedTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DocNumber: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrivateNote: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Credit: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  TxnTaxDetailTxnTaxCodeRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnTaxDetailTxnTaxCodeRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TotalTax: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  PaymentMethodRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PaymentMethodRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  // PurchaseEx: {
  //   allowNull: true,
  //   type: DataTypes.INTEGER,
  // },
  ExchangeRate: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  DepartmentRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DepartmentRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  EntityRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  EntityRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurDataRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurDataRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
});
const Preferences = sequelize.define("Preferences", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MetaDataCreateTimedateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LastUpdatedTimedateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  EmailMessagesPrefsInvoiceMessageMessage: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  EmailMessagesPrefsInvoiceMessageSubject: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  EstimateMessageMessage: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  EstimateMessageSubject: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SalesReceiptMessageMessage: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SalesReceiptMessageSubject: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  StatementMessageMessage: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  StatementMessageSubject: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ProductAndServicesPrefsRevenueRecognitionEnabled: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  ProductAndServicesPrefsRecognitionFrequencyType: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ProductAndServicesPrefsForSales: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  ProductAndServicesPrefsQuantityOnHand: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  ProductAndServicesPrefsQuantityWithPriceAndRate: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  ProductAndServicesPrefsForPurchase: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  ReportPrefsReportBasis: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ReportPrefsCalcAgingReportFromTxnDate: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  AccountingInfoPrefsFirstMonthOfFiscalYearMonthEnum: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  AccountingInfoPrefsUseAccountNumbers: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  TaxYearMonth: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ClassTrackingPerTxn: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  TrackDepartments: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerTerminology: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BookCloseDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  DepartmentTerminology: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ClassTrackingPerTxnLine: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  SalesFormsPrefsSalesEmailBccAddress: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SalesFormsPrefsSalesEmailCcAddress: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  UsingProgressInvoicing: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  CustomFieldBooleanValue: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  CustomFieldType: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  CustomFieldName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  AllowServiceDate: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  EstimateMessage: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  EmailCopyToCompany: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  DefaultCustomerMessage: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  AllowShipping: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  DefaultDiscountAccount: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  IPNSupportEnabled: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  ETransactionPaymentEnabled: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  DefaultTermsValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DefaultTermsName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  AllowDeposit: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  UsingPriceLevels: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  DefaultShippingAccount: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  DefaultShippingAccount: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  ETransactionAttachPDF: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  CustomTxnNumbers: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  ETransactionEnabledStatus: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  AllowEstimates: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  AllowDiscount: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  AutoApplyCredit: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  VendorAndPurchasesPrefsPOCustomFieldBooleanValue: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  VendorAndPurchasesPrefsPOCustomFieldType: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  VendorAndPurchasesPrefsPOCustomFieldType: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  VendorAndPurchasesPrefsPOCustomFieldName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  VendorAndPurchasesPrefsStringValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  VendorAndPurchasesPrefsPOCustomFieldStringValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  VendorAndPurchasesPrefsPOCustomFieldType: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  VendorAndPurchasesPrefsPOCustomFieldName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DefaultMarkupAccountValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DefaultMarkupAccountName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TrackingByCustomer: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  DefaultTermsValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DefaultTermsName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillableExpenseTracking: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  DefaultMarkup: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  TaxPrefsPartnerTaxEnabled: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  TaxGroupCodeRef: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  UsingSalesTax: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  OtherPrefsName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsDataPartner: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsDateFormat: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsDateFormatMnemonic: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsDefaultCustomerMessage: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsDefaultItem: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsDefaultTaxRateSelection: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsDTXCopyMemo: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsMTDEnabled: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsMTDEnabled: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsMarkupOnBillableExpenseEnabled: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsNumberFormat: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsNumberFormatMnemonic: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsProjectsEnabled: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsPurchseOrderEnabled: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsSalesFormContentEnabled: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsShowAccountNumbers: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsTimeTrackingFeatureEnabled: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsUncategorizedAssetAccountId: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsUncategorizedExpenseAccountId: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsVendor1099Enabled: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsUseCustomTxnNumbers: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsAllowGratuity: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  OtherPrefsGratuityAccount: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TimeTrackingPrefsWorkWeekStartDate: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TimeTrackingPrefsMarkTimeEntriesBillable: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  TimeTrackingPrefsShowBillRateToAll: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  TimeTrackingPrefsShowUsingSalesTax: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  TimeTrackingPrefsBillCustomers: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  CurrencyPrefsHomeCurrency: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyPrefsMultiCurrencyEnabled: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
});
const Paymentmethod = sequelize.define("Paymentmethod", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  Name: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Active: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Type: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MetaDataCreateTimedateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MetaDataLastUpdatedTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
});
const Payment = sequelize.define("Payment", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  TotalAmt: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  CustomerRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrivateNote: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PaymentMethodRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PaymentMethodRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  UnappliedAmt: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  DepositToAccountRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DepositToAccountRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ExchangeRate: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  ProjectRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ProjectRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnSource: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ARAccountRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ARAccountRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  CreditCardPaymentCreditChargeResponseStatus: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CreditCardPaymentCreditChargeResponseAuthCode: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CreditCardPaymentCreditChargeResponseTxnAuthorizationTimedateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CreditCardPaymentCreditChargeCCTransId: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MetaDataCreateTimedateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LastUpdatedTimeDateTimedateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TaxExemptionRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TaxExemptionRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
});
const Journalentry = sequelize.define("Journalentry", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DocNumber: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrivateNote: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnDatedate: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ExchangeRate: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  TaxRateRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TaxRateRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnTaxDetailTxnTaxCodeRefvalue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnTaxDetailTxnTaxCodeRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TotalTax: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  MetaDataCreateTimedateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LastUpdatedTimedateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurDataRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurDataRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TotalAmt: {
    allowNull: true,
    type: DataTypes.BIGINT,
  },
  TotalAmt: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
});
const Journalcode = sequelize.define("Journalcode", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  Name: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Description: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomFieldDefinitionId: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomFieldStringValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomFieldName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomFieldType: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Type: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MetaDataCreateTimedateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LastUpdatedTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
});

const Item = sequelize.define("Item", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  Name: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  InvStartDateDate: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Type: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  QtyOnHand: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  AssetAccountRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  AssetAccountRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Sku: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SalesTaxIncluded: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  TrackQtyOnHand: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  SalesTaxCodeRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SalesTaxCodeRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ClassRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ClassRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Source: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PurchaseTaxIncluded: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  Description: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SubItem: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  ReorderPoint: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  PurchaseDesc: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MetaDataCreateTimedateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LastUpdatedTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrefVendorRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrefVendorRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Active: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  PurchaseTaxCodeRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PurchaseTaxCodeRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PurchaseCost: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  ParentRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ParentRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  UnitPrice: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  FullyQualifiedName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ExpenseAccountRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ExpenseAccountRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Level: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  IncomeAccountRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  IncomeAccountRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TaxClassificationRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TaxClassificationRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
});
const Invoice = sequelize.define("Invoice", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  CustomerRef: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  // ShipFromAddr: {
  //   allowNull: true,
  //   type: DataTypes.STRING,
  // },
  CurrencyRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DocNumber: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillEmailAddress: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  ShipDateDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  TrackingNum: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ClassRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ClassRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrintStatus: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SalesTermRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SalesTermRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DepositToAccountRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DepositToAccountRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  AllowOnlineACHPayment: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  DueDateDate: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MetaDataCreateTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LastUpdatedTimedateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrivateNote: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillEmailCcAddress: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerMemoValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  EmailStatus: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ProjectRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ProjectRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ExchangeRate: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  TxnTaxDetailTxnTaxDetailValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnTaxDetailTxnTaxDetailName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TotalTax: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  AllowOnlineCreditCardPayment: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  CustomFieldDefinitionId: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomFieldStringValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomFieldName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomFieldType: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  // ShipAddr: {
  //   allowNull: true,
  //   type: DataTypes.STRING,
  // },
  DepartmentRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DepartmentRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillEmailBccAddress: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ShipMethodRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ShipMethodRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  // BillAddr: {
  //   allowNull: true,
  //   type: DataTypes.STRING,
  // },
  ApplyTaxAfterDiscount: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  HomeBalance: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  DeliveryInfoDeliveryType: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DeliveryInfoDeliveryTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TotalAmt: {
    allowNull: true,
    type: DataTypes.BIGINT,
  },
  InvoiceLink: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurDataRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurDataRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Balance: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  FreeFormAddress: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
});
const Exchangerate = sequelize.define("Exchangerate", {
  // Id: {
  //   primaryKey: true,
  //   allowNull: false,
  //   type: DataTypes.STRING,
  // },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  AsOfDate: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  SourceCurrencyCode: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Rate: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  CustomFieldDefinitionId: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomFieldStringValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomFieldName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomFieldType: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TargetCurrencyCode: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MetaDataCreateTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LastUpdatedTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
});
const Estimate = sequelize.define("Estimate", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  CustomerRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  // ShipFromAddr: {
  //   allowNull: true,
  //   type: DataTypes.STRING,
  // },
  CurrencyRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillEmailAddress: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillEmailTxnDate: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ShipDatedate: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ClassRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ClassRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrintStatus: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomFieldDefinitionId: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomFieldStringValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomFieldName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomFieldType: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SalesTermRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SalesTermRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnStatus: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  //   LinkedTxn [0..n]
  // : {
  //     allowNull: true,
  //     type: DataTypes.STRING,
  //   },
  AcceptedDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  ExpirationDateDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  MetaDataCreateTimedateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LastUpdatedTimeDateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DocNumber: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrivateNote: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrivateNote: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerMemoValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  EmailStatus: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ProjectRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ProjectRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnTaxDetailTxnTaxCodeRefvalue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnTaxDetailTxnTaxCodeRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnTaxDetailTotalTax: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  AcceptedBy: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ExchangeRate: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  // ShipAddr: {
  //   allowNull: true,
  //   type: DataTypes.DECIMAL,
  // },
  DepartmentRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DepartmentRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  // BillAddr: {
  //   allowNull: true,
  //   type: DataTypes.STRING,
  // },
  ApplyTaxAfterDiscount: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  TotalAmt: {
    allowNull: true,
    type: DataTypes.BIGINT,
  },
  RecurDataRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurDataRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TaxExemptionRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TaxExemptionRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  HomeTotalAmt: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  FreeFormAddress: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
});
const Employee = sequelize.define("Employee", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  // PrimaryAddr: {
  //   allowNull: true,
  //   type: DataTypes.STRING,
  // },
  PrimaryEmailAddrAddress: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DisplayName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Title: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillableTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  GivenName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BirthDateDate: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MiddleName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SSN: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrimaryPhoneFreeFormNumber: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Active: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  ReleasedDateDate: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MetaData: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CostRate: {
    allowNull: true,
    type: DataTypes.BIGINT,
  },
  MobileFreeFormNumber: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Gender: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  HiredDateDate: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillRate: {
    allowNull: true,
    type: DataTypes.BIGINT,
  },
  Organization: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  Suffix: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  FamilyName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrintOnCheckName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  EmployeeNumber: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  V4IDPseudonym: {
    allowNull: true,
    type: DataTypes.STRING,
  },
});
const Deposit = sequelize.define("Deposit", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  DepositToAccountRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DepositToAccountRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PrivateNote: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ExchangeRate: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  ExchangeRateValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ExchangeRateName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnSource: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  CashBackAccountRefvalue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CashBackAccountRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Amount: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  Memo: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  MetaDataCreateTimedateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  LastUpdatedTimedateTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurDataRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurDataRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TotalAmt: {
    allowNull: true,
    type: DataTypes.BIGINT,
  },
  HomeTotalAmt: {
    allowNull: true,
    type: DataTypes.Decimal,
  },
});

// Synchronize all models with the database
async function main() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Create all tables defined in the models
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
}

// main();
