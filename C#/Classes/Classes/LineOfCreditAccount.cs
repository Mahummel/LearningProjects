using System;
namespace Classes
{
    public class LineOfCreditAccount: BankAccount
    {
        public LineOfCreditAccount(string owner, decimal balance) : base(owner, balance)
        {
        }
    }
}
