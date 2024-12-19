import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormToJson } from "@/page/utils/Form.helper";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "@/page/utils/fetcher";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/Auth-provider";

function Login() {
  const api = useApi();
  const navigate = useNavigate();
  const { setToken, setRole } = useAuth();
  const mutation = useMutation({
    mutationFn: (body) => api("auth/login", { body, method: "post" }),
    onSuccess: (r) => {
      setToken(r?.token);
      setRole(r?.role);
      navigate("/profile");
      toast.success("login successful!");
    },
    onError: (e) => {
      toast("Login unsuccessful, Please try again");
    },
  });
  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto p-4">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-800">
            LOGIN
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = FormToJson(e);
              console.log("the data", formData);
              mutation.mutate(formData);
            }}
            className="space-y-6"
          >
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
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-md"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Login Section */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-800">S</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            Registering for this site allows you to access your order status and
            history. Just fill in the fields below, and we'll get a new account
            set up for you in no time. We will only ask you for information
            necessary to make the purchase process faster and easier.
          </p>
          <Link
            to={"/auth/registration"}
            className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-8 rounded-md"
          >
            Registration?
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
