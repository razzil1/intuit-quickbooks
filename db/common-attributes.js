import { DataTypes } from "sequelize";

export const Id = {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
};

export const VendorRef = {
  VendorRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  VendorRefValue: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

export const TotalAmt = {
  TotalAmt: {
    allowNull: true,
    type: DataTypes.BIGINT,
  },
};

export const SyncToken = {
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

export const CurrencyRef = {
  CurrencyRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

export const DocNumber = {
  DocNumber: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

export const PrivateNote = {
  PrivateNote: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

export const TxnDate = {
  TxnDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
};

export const ExchangeRate = {
  ExchangeRate: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
};

export const APAccountRef = {
  APAccountRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  APAccountRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

export const DepartmentRef = {
  DepartmentRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DepartmentRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

export const MetaData = {
  MetaDataCreateTime: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  MetaDataLastUpdatedTime: {
    allowNull: true,
    type: DataTypes.DATE,
  },
};

export const RecurDataRef = {
  RecurDataRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurDataRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

export const Balance = {
  Balance: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
};

export const Name = {
  Name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

export const Active = {
  Active: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
};

export const ParentRef = {
  ParentRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ParentRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

export const FullyQualifiedName = {
  FullyQualifiedName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

export const CustomerRef = {
  CustomerRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CustomerRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

export const ClassRef = {
  ClassRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ClassRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

export const SalesTermRef = {
  SalesTermRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  SalesTermRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

export const HomeBalance = {
  HomeBalance: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
};

export const Amount = {
  Amount: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
};

export const PrintStatus = {
  PrintStatus: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

export const WebAddrURI = {
  WebAddrURI: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

export const CompanyName = {
  CompanyName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

export const ShipAddr = {
  ShipAddrId: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ShipAddrPostalCode: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ShipAddrCity: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ShipAddrCountry: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ShipAddrLine1: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ShipAddrLine2: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ShipAddrLine3: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ShipAddrLine4: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ShipAddrLine5: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ShipAddrLat: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ShipAddrLong: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ShipAddrCountrySubDivisionCode: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

export const PaymentMethodRef = {
  PaymentMethodRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  PaymentMethodRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

export const BillAddr = {
  BillAddrId: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillAddrPostalCode: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillAddrCity: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillAddrCountry: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillAddrLine1: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillAddrLine2: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillAddrLine3: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillAddrLine4: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillAddrLine5: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillAddrLat: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillAddrLong: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  BillAddrCountrySubDivisionCode: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};
