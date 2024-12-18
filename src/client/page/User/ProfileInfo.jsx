import { ProfileCardSkeleton } from "@/components/skeltons/Profileinfo.skelton";
import { mutationHelper } from "@/hooks/base";
import {
  selectCurrentUser,
  selectUserLoading,
} from "@/store/slice/profileslice/profileselector";
import { FilePenIcon, MapPin, ShoppingBag, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FormToJson } from "../utils/Form.helper";
import { toast } from "sonner";

const ProfileCard = () => {
  const currentUser = useSelector(selectCurrentUser);
  const loading = useSelector(selectUserLoading);
  const updateUserMutation = mutationHelper("user/profile", "PUT");

  console.log(currentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "********",
    oldPassword: "",
    confirmPassword: "",
  });

  // Update formData when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        username: currentUser.username || "",
        email: currentUser.email || "",
      }));
    }
  }, [currentUser]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    // Prepare basic update data
    const updateData = {
      username: formData.username,
      email: formData.email,
    };

    // Check if user is attempting to change password
    const isChangingPassword =
      formData.password !== "********" &&
      (formData.oldPassword || formData.password || formData.confirmPassword);

    // Only validate password if user is explicitly trying to change it
    if (isChangingPassword) {
      if (!formData.oldPassword) {
        toast.error("Old password is required to change password");
        return;
      }
      if (!formData.password) {
        toast.error("New password is required");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("New passwords don't match");
        return;
      }
      // Add password fields only if user is changing password
      updateData.password = formData.password;
      updateData.oldPassword = formData.oldPassword;
    }

    try {
      await updateUserMutation.mutateAsync(updateData, {
        onSuccess: (data) => {
          toast.success("Profile updated successfully");
          setIsEditing(false);
          // Reset password fields
          setFormData((prev) => ({
            ...prev,
            password: "********",
            oldPassword: "",
            confirmPassword: "",
          }));
        },
        onError: (error) => {
          toast.error(
            error.response?.data?.message || "Failed to update profile"
          );
        },
      });
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (loading) {
    return <ProfileCardSkeleton />;
  }
  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden md:flex lg:flex">
      {/* Left Section (Header + Stats) */}

      <div className="md:w-1/3 lg:w-1/4">
        <div className="relative  p-6 bg-gradient-to-r from-custom-green to-custom-yellow h-full">
          <button
            onClick={handleEdit}
            className="absolute top-4 right-4 text-white hover:text-gray-200"
          >
            <FilePenIcon size={24} />
          </button>
          <div className="flex flex-col items-center space-y-4 mt-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">
                {formData.username.length > 14
                  ? `${formData.username.slice(0, 14)}...`
                  : formData.username}
              </h2>
              <p className="text-white opacity-90">{formData.email}</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center space-x-3 text-white">
              <ShoppingBag className="text-white opacity-80 w-5 h-5" />
              <span>{currentUser?.orderHistory?.length} orders</span>
            </div>
            <div className="flex items-center space-x-3 text-white">
              <ShoppingCart className="text-white opacity-80 w-5 h-5" />
              <span>{currentUser?.cart?.length} cart items</span>
            </div>
            <div className="flex items-center space-x-3 text-white">
              <MapPin className="text-white opacity-80 w-5 h-5" />
              <span>{currentUser?.addresses?.length} address</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="md:w-2/3 lg:w-3/4 p-6">
        <form
          onSubmit={handleSaveChanges}
          className="max-w-3xl mx-auto space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm
                  ${isEditing ? "bg-white" : "bg-gray-50"} 
                  ${!isEditing && "cursor-not-allowed"}
                  focus:border-purple-500 focus:ring-purple-500`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm
                  ${isEditing ? "bg-white" : "bg-gray-50"}
                  ${!isEditing && "cursor-not-allowed"}
                  focus:border-purple-500 focus:ring-purple-500`}
              />
            </div>

            {isEditing ? (
              <></>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm
                ${isEditing ? "bg-white" : "bg-gray-50"}
                ${!isEditing && "cursor-not-allowed"}
                focus:border-purple-500 focus:ring-purple-500`}
                />
              </div>
            )}

            {isEditing && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Old Password
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
            focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Enter your current password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={
                      formData.password === "********" ? "" : formData.password
                    }
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
            focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
            focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Confirm new password"
                  />
                </div>
              </>
            )}
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                disabled={updateUserMutation.isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
                disabled={updateUserMutation.isLoading}
              >
                {updateUserMutation.isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}

          {/* Footer Section */}
          <div className="pt-6 mt-6 border-t border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <input className="text-gray-600" />
              <span className="text-sm text-gray-600">View on Product</span>
            </div>
            <span className="text-sm text-gray-500">
              Last updated: 2 days ago
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileCard;
