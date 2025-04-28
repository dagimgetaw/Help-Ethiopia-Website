import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, RefreshCw, Search, MessageSquare } from "lucide-react";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedMessages, setExpandedMessages] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const messagesPerPage = 8;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        "http://localhost:3000/get-all-messages"
      );
      const sortedMessages = response.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setMessages(sortedMessages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMessageExpansion = (id) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Spinner />
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-4">
        <div className="text-red-500 mb-4 text-center">{error}</div>
        <button
          onClick={fetchMessages}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container pt-30 px-6 font-text pb-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Messages</h1>

      {/* Search and Refresh */}
      <div className="flex flex-col sm:flex-row justify-center items-center mb-6 gap-4">
        <div className="relative w-full sm:w-84">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2 text-gray-700 border-1 border-gray-400 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={fetchMessages}
          className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isMobile ? (
          <div className="divide-y divide-gray-200">
            {currentMessages.length > 0 ? (
              currentMessages.map((message) => (
                <MobileMessageCard
                  key={message._id}
                  message={message}
                  expanded={expandedMessages[message._id]}
                  onToggle={() => toggleMessageExpansion(message._id)}
                  formatDate={formatDate}
                />
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                No messages found
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentMessages.length > 0 ? (
                  currentMessages.map((message) => (
                    <tr key={message._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{message.fullName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-600">{message.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-600">
                          {expandedMessages[message._id]
                            ? message.message
                            : `${message.message.substring(0, 50)}${
                                message.message.length > 50 ? "..." : ""
                              }`}
                          {message.message.length > 50 && (
                            <button
                              onClick={() => toggleMessageExpansion(message._id)}
                              className="ml-2 text-blue-600 hover:text-blue-800 text-sm font-semibold cursor-pointer"
                            >
                              {expandedMessages[message._id]
                                ? "Show less"
                                : "Show more"}
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-600">
                          {formatDate(message.createdAt)}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      No messages found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

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
                className="px-4 py-2 border rounded-md disabled:opacity-50 flex items-center gap-1 cursor-pointer border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-[#1E3A8A]"
              >
                <ChevronLeft className="w-4 h-4" />
                {!isMobile && "Previous"}
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-md disabled:opacity-50 flex items-center gap-1 cursor-pointer border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-[#1E3A8A]"
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

// Mobile Message Card Component
const MobileMessageCard = ({ message, expanded, onToggle, formatDate }) => {
  return (
    <div className="p-4 hover:bg-gray-50">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-medium text-gray-900">{message.fullName}</div>
          <div className="text-sm text-gray-500">{message.email}</div>
        </div>
        <div className="text-sm text-gray-500">
          {formatDate(message.createdAt)}
        </div>
      </div>
      <div className="text-gray-600">
        {expanded
          ? message.message
          : `${message.message.substring(0, 100)}${
              message.message.length > 100 ? "..." : ""
            }`}
        {message.message.length > 100 && (
          <button
            onClick={onToggle}
            className="ml-2 text-blue-600 hover:text-blue-800 text-sm font-semibold cursor-pointer"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </div>
  );
};
