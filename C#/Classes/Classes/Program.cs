using System;

namespace Classes
{
    class Program
    {
        static void Main(string[] args)
        {
            BankAccount Account = new BankAccount("Michael", 1000);
            Console.WriteLine($"Account {Account.Number} was created for {Account.Owner} with a balance of {Account.Balance}");
            Account.MakeWithdrawal(500, DateTime.Now, "Rent payment");
            Account.MakeDeposit(100, DateTime.Now, "Friend paid me back");
            Console.WriteLine(Account.GetAccountHistory());

        }
    }
}
