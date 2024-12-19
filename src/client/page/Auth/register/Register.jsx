import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useApi } from "@/page/utils/fetcher";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const api = useApi();
  const navigate = useNavigate();

  const registrationMutation = useMutation({
    mutationFn: async (formData) => {
      if (!formData.username || !formData.email || !formData.password) {
        throw new Error("Please fill in all required fields");
      }
      return await api("/auth/register", {
        method: "POST",
        body: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      });
    },
    onSuccess: (data) => {
      toast.success("Registration successful!");

      navigate("/auth/login");
    },
    onError: (error) => {
      console.error("Registration error:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.";

      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    registrationMutation.mutate(formData);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto p-4">
      {/* Registration Section */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-800">
            REGISTER
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium">
                Username <span className="text-red-500">*</span>
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                className="w-full p-2 border rounded-md"
                disabled={registrationMutation.isPending}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email ID <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="w-full p-2 border rounded-md"
                disabled={registrationMutation.isPending}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="w-full p-2 border rounded-md"
                disabled={registrationMutation.isPending}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-md"
              disabled={registrationMutation.isPending}
            >
              {registrationMutation.isPending ? "Registering..." : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Login Section */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-800">
            LOGIN
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            Registering for this site allows you to access your order status and
            history. Just fill in the fields below, and we'll get a new account
            set up for you in no time. We will only ask you for information
            necessary to make the purchase process faster and easier.
          </p>
          <Button
            onClick={() => navigate("/auth/login")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-8 rounded-md"
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;
