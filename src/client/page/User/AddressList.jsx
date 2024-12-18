import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Phone } from "lucide-react";
import { api } from "../utils/fetcher";
import AddressForm from "./AddressForm";
import { useAddressList } from "@/store/slice/profileslice/profilefetcher";
import { useHistoryState } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

export default function AddressList() {
  const [isAddingAddress, setIsAddingAddress] = React.useState(false);
  const [editingAddress, setEditingAddress] = React.useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: addressData, isLoading, error } = useAddressList();

  console.log(addressData);

  const deleteAddress = useMutation({
    mutationFn: (addressId) => api.delete(`/api/addresses/${addressId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
    },
  });

  const setDefaultAddress = useMutation({
    mutationFn: (addressId) => api.put(`/api/addresses/${addressId}/default`),
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
    },
  });

  const handleAddAddress = () => {
    navigate("/profile/address-form", { state: { address: null } });
  };

  const handleEditAddress = (address) => {
    navigate("/profile/address-form", { state: { address } });
  };

  if (isLoading) return <>loading...</>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-custom-green">My Addresses</h2>
        <button
          onClick={handleAddAddress}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-custom-green hover:bg-opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Address
        </button>
      </div>

      {isAddingAddress && (
        <AddressForm onClose={() => setIsAddingAddress(false)} />
      )}

      {editingAddress && (
        <AddressForm
          address={editingAddress}
          onClose={() => setEditingAddress(null)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addressData?.addresses?.map((address) => (
          <div
            key={address._id}
            className="bg-white shadow rounded-lg p-6 relative border border-gray-200"
          >
            {address.isPrimary && (
              <span className="absolute top-4 right-4 bg-custom-yellow text-custom-green text-xs font-medium px-2.5 py-0.5 rounded">
                Primary
              </span>
            )}
            <div className="space-y-2">
              <p className="font-medium text-custom-green">{address.street}</p>
              <p className="text-gray-600">
                {address.city}, {address.state}
              </p>
              <p className="text-gray-600">
                {address.country} - {address.zipCode}
              </p>
              <p className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {address.phone}
              </p>
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <button
                onClick={() => handleEditAddress(address)}
                className="text-custom-green hover:text-opacity-80 flex items-center"
              >
                <Pencil className="w-4 h-4 mr-1" />
                Edit
              </button>
              <button
                onClick={() => deleteAddress.mutate(address._id)}
                className="text-black hover:text-opacity-80 flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </button>
              {!address.isPrimary && (
                <button
                  onClick={() => setPrimaryAddress.mutate(address._id)}
                  className="text-custom-green hover:text-opacity-80"
                >
                  Set as Primary
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
