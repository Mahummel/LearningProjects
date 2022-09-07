using System;
using System.Collections.Generic;

namespace Classes
{
    public class BankAccount
    {
        public string Number { get; }
        public string Owner { get; set; }
        public decimal Balance
        {
            get
            {
                decimal balance = 0;
                foreach (Transaction item in allTransactions)
                {
                    balance += item.Amount;
                }
                return balance;
            }

        }
        private static int accountNumberSeed = 1234567890;

        public BankAccount(string Owner, decimal Balance)
        {
            this.Owner = Owner;
            MakeDeposit(Balance, DateTime.Now, "Initial Balance");
            this.Number = accountNumberSeed.ToString();
            accountNumberSeed++;
        }

        private List<Transaction> allTransactions = new List<Transaction>();


        public void MakeDeposit(decimal amount, DateTime date, string note)
        {
            if (amount <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(amount), "Amount of deposit must be positive");
            }
            Transaction deposit = new Transaction(amount, date, note);
            allTransactions.Add(deposit);
        }
        public void MakeWithdrawal(decimal amount, DateTime date, string note)
        {
            if (amount <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(amount), "Amount of withdrawl must be positive");
            }
            if (Balance - amount < 0)
            {
                throw new InvalidOperationException("Not enough sufficient funds to withdrawl");
            }
            Transaction withdrawl = new Transaction(-amount, date, note);
            allTransactions.Add(withdrawl);
        }
        public string GetAccountHistory()
        {
            var report = new System.Text.StringBuilder();
            decimal balance = 0;
            report.AppendLine("Date\t\t\tAmount\t\t\tBalance\t\t\tNote");
            foreach (Transaction item in allTransactions)
            {
                balance += item.Amount;
                report.AppendLine($"{item.Date}\t\t\t{item.Amount}\t\t\t{balance}\t\t\t{item.Notes}");
            }
            return report.ToString();
        }

    }
}
