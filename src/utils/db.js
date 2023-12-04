import Dexie from "dexie";

const db = new Dexie("FinancePlanner");
db.version(1).stores({
  dashboard: "++id",
  //  loans, amountToPay",
  loans: "++id",
  //  loan, startDate, emi, totalAmount, amountPaid, amountToPay",
  transactions: "++id",
  //  loan, paidDate, amount",
});

export { db };
