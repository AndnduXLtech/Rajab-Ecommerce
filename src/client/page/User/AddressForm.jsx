import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { api, useApi } from "../utils/fetcher";
import { FormToJson } from "../utils/Form.helper";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { useHistoryState } from "@uidotdev/usehooks";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddressForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const address = location.state?.address || null;
  const api = useApi();
  const queryClient = useQueryClient();
  console.log(address);
  const [formErrors, setFormErrors] = useState({});

  const mutation = useMutation({
    mutationFn: (data) => {
      const url = address
        ? `/user/updateAddress/${address._id}`
        : `/user/addAddress`;
      const method = address ? "PUT" : "POST";

      // Use the api instance as a function and pass method in options
      return api(url, {
        method,
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
      toast.success("address added successfully");
      navigate("/profile/addresses");
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
      setFormErrors({
        submit:
          error.message || "An error occurred while submitting the address",
      });
    },
  });

  const validateForm = (formData) => {
    const errors = {};

    // Street validation
    if (!formData.street?.trim()) {
      errors.street = "Street address is required";
    }

    // City validation
    if (!formData.city?.trim()) {
      errors.city = "City is required";
    }

    // State validation
    if (!formData.state?.trim()) {
      errors.state = "State is required";
    }

    // ZIP Code validation
    // if (!formData.zipCode?.trim()) {
    //   errors.zipCode = "ZIP code is required";
    // } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
    //   errors.zipCode = "Invalid ZIP code format (e.g., 12345 or 12345-6789)";
    // }

    // Phone validation
    if (!formData.phone?.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?1?\d{10,14}$/.test(formData.phone.replace(/[^\d]/g, ""))) {
      errors.phone = "Invalid phone number format (10-14 digits)";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert form data to object
    const formData = Object.fromEntries(new FormData(e.target));

    // Validate form
    const errors = validateForm(formData);

    // If there are errors, set them and stop submission
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Clear previous errors
    setFormErrors({});
    formData.isPrimary = false;
    // Submit the mutation
    mutation.mutate(formData);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-custom-green">
          {address ? "Edit Address" : "Add New Address"}
        </h3>
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {formErrors.submit && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{formErrors.submit}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Street Address
            </label>
            <Input
              type="text"
              name="street"
              defaultValue={address?.street || ""}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                formErrors.street ? "border-red-500" : ""
              }`}
            />
            {formErrors.street && (
              <p className="mt-1 text-sm text-red-600">{formErrors.street}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <Input
                type="text"
                name="city"
                defaultValue={address?.city || ""}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  formErrors.city ? "border-red-500" : ""
                }`}
              />
              {formErrors.city && (
                <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <Input
                type="text"
                name="state"
                defaultValue={address?.state || ""}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  formErrors.state ? "border-red-500" : ""
                }`}
              />
              {formErrors.state && (
                <p className="mt-1 text-sm text-red-600">{formErrors.state}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ZIP Code
              </label>
              <Input
                type="text"
                name="zipCode"
                defaultValue={address?.zipCode || ""}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  formErrors.zipCode ? "border-red-500" : ""
                }`}
              />
              {formErrors.zipCode && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.zipCode}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <Input
                type="tel"
                name="phone"
                defaultValue={address?.phone || ""}
                placeholder="+1 (123) 456-7890"
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  formErrors.phone ? "border-red-500" : ""
                }`}
              />
              {formErrors.phone && (
                <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            disabled={mutation.isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-custom-green hover:bg-opacity-90"
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? address
                ? "Saving..."
                : "Adding..."
              : address
              ? "Save Changes"
              : "Add Address"}
          </button>
        </div>
      </form>
    </div>
  );
}
