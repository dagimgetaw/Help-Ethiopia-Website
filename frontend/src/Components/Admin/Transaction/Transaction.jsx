import { useEffect, useState } from "react";
import {
  CreditCard,
  HandCoins,
  Search,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import axios from "axios";

export default function Transaction() {
  const [chapaPayments, setChapaPayments] = useState([]);
  const [stripePayments, setStripePayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("chapa");
  const [isMobile, setIsMobile] = useState(false);
  const transactionsPerPage = 8;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      const [chapaResponse, stripeResponse] = await Promise.all([
        axios.get("http://localhost:3000/get-chapa-transactions"),
        axios.get("http://localhost:3000/get-stripe-transactions"),
      ]);

      setChapaPayments(chapaResponse.data);
      setStripePayments(stripeResponse.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = (
    activeTab === "chapa" ? chapaPayments : stripePayments
  ).filter(
    (transaction) =>
      transaction.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (activeTab === "chapa" ? transaction.tx_ref : transaction.transactionId)
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage
  );

  if (loading)
    return (
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-lg p-4 h-32 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-gray-100 rounded mb-2 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-64 p-4">
        <div className="text-red-500 mb-4 text-center">{error}</div>
        <button
          onClick={fetchTransactions}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );

  return (
    <div className="pt-30 px-4 sm:px-6 font-text pb-10">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 text-center">
        Transaction Management
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<HandCoins className="w-4 h-4 sm:w-5 sm:h-5" />}
          title="Total Chapa Payments"
          value={chapaPayments.length}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          icon={<CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />}
          title="Total Stripe Payments"
          value={stripePayments.length}
          color="bg-purple-100 text-purple-600"
        />
        <StatCard
          icon={<HandCoins className="w-4 h-4 sm:w-5 sm:h-5" />}
          title="Total Chapa Amount"
          value={`${chapaPayments
            .reduce((sum, payment) => sum + payment.amount, 0)
            .toLocaleString()} ETB`}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          icon={<CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />}
          title="Total Stripe Amount"
          value={`${stripePayments
            .reduce((sum, payment) => sum + payment.amount, 0)
            .toLocaleString()} ${stripePayments[0]?.currency || "USD"}`}
          color="bg-yellow-100 text-yellow-600"
        />
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <div className="flex space-x-2 sm:space-x-4">
          <button
            onClick={() => {
              setActiveTab("chapa");
              setCurrentPage(1);
            }}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium cursor-pointer text-sm sm:text-base ${
              activeTab === "chapa"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Chapa Payments
          </button>
          <button
            onClick={() => {
              setActiveTab("stripe");
              setCurrentPage(1);
            }}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium cursor-pointer text-sm sm:text-base ${
              activeTab === "stripe"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Stripe Payments
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row justify-center items-center mb-4 sm:mb-6 gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 text-sm sm:text-base text-gray-700 border-1 border-gray-400 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          {isMobile ? (
            <div className="divide-y divide-gray-200">
              {currentTransactions.length > 0 ? (
                currentTransactions.map((transaction) => (
                  <MobileTransactionCard
                    key={
                      activeTab === "chapa"
                        ? transaction.tx_ref
                        : transaction.transactionId
                    }
                    transaction={transaction}
                    type={activeTab}
                  />
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No transactions found
                </div>
              )}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {activeTab === "chapa" ? "Transaction ID" : "Payment ID"}
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentTransactions.length > 0 ? (
                  currentTransactions.map((transaction) => (
                    <TransactionRow
                      key={
                        activeTab === "chapa"
                          ? transaction.tx_ref
                          : transaction.transactionId
                      }
                      transaction={transaction}
                      type={activeTab}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 sm:px-6 py-4 text-center text-gray-500"
                    >
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 gap-4">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 sm:px-4 py-2 border rounded-md disabled:opacity-50 flex items-center gap-1 cursor-pointer border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-[#1E3A8A] text-sm sm:text-base"
              >
                <ChevronLeft className="w-4 h-4" />
                {!isMobile && "Previous"}
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 sm:px-4 py-2 border rounded-md disabled:opacity-50 flex items-center gap-1 cursor-pointer border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-[#1E3A8A] text-sm sm:text-base"
              >
                {!isMobile && "Next"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Stat Card Component
const StatCard = ({ icon, title, value, color }) => (
  <div className={`${color} rounded-lg p-3 sm:p-4 shadow-sm`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs sm:text-sm font-medium text-gray-600">{title}</p>
        <p className="text-lg sm:text-2xl font-bold">{value}</p>
      </div>
      <div className="p-1.5 sm:p-2 rounded-full bg-white bg-opacity-30">
        {icon}
      </div>
    </div>
  </div>
);

// Transaction Row Component
const TransactionRow = ({ transaction, type }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 text-sm sm:text-base">
              {transaction.firstName?.charAt(0)}
              {transaction.lastName?.charAt(0)}
            </span>
          </div>
          <div className="ml-3 sm:ml-4">
            <div className="text-sm font-medium text-gray-900">
              {transaction.firstName} {transaction.lastName}
            </div>
          </div>
        </div>
      </td>
      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {transaction.email}
      </td>
      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {transaction.amount.toLocaleString()} {transaction.currency}
      </td>
      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {type === "chapa" ? transaction.tx_ref : transaction.transactionId}
      </td>
      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(transaction.createdAt)}
      </td>
    </tr>
  );
};

// Mobile Transaction Card Component
const MobileTransactionCard = ({ transaction, type }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-4 hover:bg-gray-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600">
              {transaction.firstName?.charAt(0)}
              {transaction.lastName?.charAt(0)}
            </span>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {transaction.firstName} {transaction.lastName}
            </div>
            <div className="text-sm text-gray-500">{transaction.email}</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <p className="text-xs text-gray-500">Amount</p>
          <p className="text-sm font-medium">
            {transaction.amount.toLocaleString()} {transaction.currency}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">
            {type === "chapa" ? "Transaction ID" : "Payment ID"}
          </p>
          <p className="text-sm font-medium">
            {type === "chapa" ? transaction.tx_ref : transaction.transactionId}
          </p>
        </div>
      </div>
      <div className="text-xs text-gray-500">
        {formatDate(transaction.createdAt)}
      </div>
    </div>
  );
};
