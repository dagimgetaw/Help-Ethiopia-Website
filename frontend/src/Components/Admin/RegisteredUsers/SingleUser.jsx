import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";

export default function SingleUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/get-registered-users/${id}`
        );
        setUser(response.data);
      } catch {
        //
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchUser();
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return (
      <div className="text-center pt-30">
        <h2 className="pt-60 text-red-500">User not found.</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="pt-30 pb-10 px-6 max-w-4xl mx-auto font-text">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {user.firstName} {user.lastName}
            </h2>
            <button
              onClick={() => navigate(-1)}
              className="text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Back to list
            </button>
          </div>
        </div>

        <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Personal Information
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="text-gray-900 capitalize">{user.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Birth Year</p>
                <p className="text-gray-900">{user.birthYear}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="text-gray-900">{user.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Region</p>
                <p className="text-gray-900">{user.region}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Professional Information
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Employment Status</p>
                <p className="text-gray-900 capitalize">
                  {user.employmentStatus}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Field of Work</p>
                <p className="text-gray-900">{user.fieldOfWork}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Organization</p>
                <p className="text-gray-900">{user.organization}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Interests</p>
                <p className="text-gray-900">{user.interests.join(", ")}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Registration Type</p>
                <p className="text-gray-900 capitalize">
                  {user.registrationType}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Registered on {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
