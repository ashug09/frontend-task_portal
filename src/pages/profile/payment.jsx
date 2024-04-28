import React from "react";
import Main from "./main";

const PaymentDetailsPage = () => {

  const transactions = [
    { id: 1, date: "2022-04-01", category: "Food", name: "Restaurant XYZ" },
    {
      id: 2,
      date: "2022-04-02",
      category: "Shopping",
      name: "Online Store ABC",
    },
    {
      id: 3,
      date: "2022-04-03",
      category: "Utility",
      name: "Electricity Bill",
    },
    // Add more transactions as needed
  ];

  return (
    <div>
      <Main />
      <div className="lg:px-10 px-5 min-h-screen bg-gray-100 py-6 sm:py-12 sm:flex sm:justify-center">
        <div className="max-w-3xl sm:w-1/2">
          {/* Top-up Balance */}
          <div className="relative px-4 py-10 bg-white shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div>
                <h3 className="text-lg font-semibold">Advertising Balance</h3>
                <div className="mt-2 text-gray-500">
                  <p>Balance: $50.00</p>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">
                    Recharge
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Balance */}
          <div className="mt-6 relative px-4 py-10 bg-white shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div>
                <h3 className="text-lg font-semibold">Main Balance</h3>
                <div className="mt-2 text-gray-500">
                  <p>Balance: $100.00</p>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl sm:w-1/2 sm:ml-6 mt-6 sm:mt-0">
          {/* Payment Methods */}
          <div className="relative px-4 py-10 bg-white shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-6">Payment Methods</h3>
                <div className="border-b border-gray-300 pb-6">
                  <h4 className="text-md font-semibold">Card Details</h4>
                  <p className="text-gray-500">
                    Credit Card: **** **** **** 1234
                  </p>
                  {/* Add other card details */}
                  <div className="flex items-center mt-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-md font-semibold">Bank Details</h4>
                  <p className="text-gray-500">Bank Account: **********</p>
                  {/* Add other bank details */}
                  <div className="flex items-center mt-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="mt-6 relative px-4 py-10 bg-white shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold">Transactions</h3>
              <table className="table-auto mt-4 w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="border px-4 py-2">{transaction.date}</td>
                      <td
                        className={`border px-4 py-2 ${getColorByCategory(
                          transaction.category
                        )}`}
                      >
                        {transaction.category}
                      </td>
                      <td className="border px-4 py-2">{transaction.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4">
                <label
                  htmlFor="categoryFilter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Filter by Category:
                </label>
                <select
                  id="categoryFilter"
                  name="categoryFilter"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All</option>
                  <option value="Food">Food</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Utility">Utility</option>
                  {/* Add more categories as needed */}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Function to determine color based on category
const getColorByCategory = (category) => {
  switch (category) {
    case "Food":
      return "bg-yellow-200";
    case "Shopping":
      return "bg-blue-200";
    case "Utility":
      return "bg-green-200";
    default:
      return "bg-gray-200";
  }
};

export default PaymentDetailsPage;
