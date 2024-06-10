import { Sequelize, DataTypes } from "sequelize";

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

const VendorCredit = sequelize.define("VendorCredit", {
  Id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  VendorRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  VendorRefValue: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  SyncToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  CurrencyRefValue: {
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
  GlobalTaxCalculation: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  APAccountRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  APAccountRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DepartmentRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  DepartmentRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TxnDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  Balance: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  MetaDataCreateTime: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  MetaDataLastUpdatedTime: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  RecurDataRefName: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  RecurDataRefValue: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  TotalAmt: {
    allowNull: true,
    type: DataTypes.BIGINT,
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

main();
