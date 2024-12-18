import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProductListing from "../Home/ProductsListing/ProductListing";
import RegistrationForm from "../Auth/register/Register";
import Login from "../Auth/Login/Login";
import LandingPage from "../Home/Landing.page";
import Da_Ly from "../Dash/Da-Ly";
import ProfileLayout from "@/components/layout/Profile.layout";
import AddressList from "../User/AddressList";
import OrderHistory from "../User/OrderHistory";
import Wishlist from "../User/Wishlist";
import Dashboard from "../User/Dashboard.profile";
import ProductPage from "../Home/Productview.page";
import Productlayout from "@/components/layout/Product.layout";
import ProfileCard from "../User/ProfileInfo";
import { useAuth } from "@/hooks/Auth-provider";
import CartPage from "../User/cart/Cart.page";
import AddressForm from "../User/AddressForm";
//import { useAuth } from "@/hooks/Auth-provider";

// Layout Components
const BaseLayout = lazy(() => import("@/components/layout/Base.layout"));
// const AdminLayout = lazy(() => import("@/components/layout/AdminLayout"));
// const AuthLayout = lazy(() => import("@/components/layout/AuthLayout"));

// // Public Pages
// const HomePage = lazy(() => import("@/pages/home/HomePage"));
// const ProductListingPage = lazy(() =>
//   import("@/pages/products/ProductListingPage")
// );
// const ProductDetailPage = lazy(() =>
//   import("@/pages/products/ProductDetailPage")
// );
// const CategoryPage = lazy(() => import("@/pages/categories/CategoryPage"));
// const CartPage = lazy(() => import("@/pages/cart/CartPage"));
// const CheckoutPage = lazy(() => import("@/pages/checkout/CheckoutPage"));
// const OrderConfirmationPage = lazy(() =>
//   import("@/pages/checkout/OrderConfirmationPage")
// );
// const ContactPage = lazy(() => import("@/pages/contact/ContactPage"));
// const AboutPage = lazy(() => import("@/pages/about/AboutPage"));
// const NotFoundPage = lazy(() => import("@/pages/404/NotFoundPage"));

// // Auth Pages
// const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
// const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
// const ForgotPasswordPage = lazy(() =>
//   import("@/pages/auth/ForgotPasswordPage")
// );
// const ResetPasswordPage = lazy(() => import("@/pages/auth/ResetPasswordPage"));

// // User Account Pages
// const AccountDashboard = lazy(() => import("@/pages/account/AccountDashboard"));
// const OrderHistory = lazy(() => import("@/pages/account/OrderHistory"));
// const OrderDetail = lazy(() => import("@/pages/account/OrderDetail"));
// const WishlistPage = lazy(() => import("@/pages/account/WishlistPage"));
// const AddressBook = lazy(() => import("@/pages/account/AddressBook"));
// const AccountSettings = lazy(() => import("@/pages/account/AccountSettings"));

// // Admin Pages
// const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
// const ProductManagement = lazy(() =>
//   import("@/pages/admin/products/ProductManagement")
// );
// const CategoryManagement = lazy(() =>
//   import("@/pages/admin/categories/CategoryManagement")
// );
// const OrderManagement = lazy(() =>
//   import("@/pages/admin/orders/OrderManagement")
// );
// const CustomerManagement = lazy(() =>
//   import("@/pages/admin/customers/CustomerManagement")
// );
// const InventoryManagement = lazy(() =>
//   import("@/pages/admin/inventory/InventoryManagement")
// );
// const SalesReport = lazy(() => import("@/pages/admin/reports/SalesReport"));

// Loading Fallback Component
const LoadingFallback = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <span className="text-lg font-medium">Loading...</span>
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LandingPage />
          </Suspense>
        ),
      },
      // Move children inside the route object
      // Public Routes
      {
        path: "products",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Productlayout />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <ProductListing />
              </Suspense>
            ),
          },
          {
            path: "view/:id",
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <ProductPage />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: "cart",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: "wishlist",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Wishlist />
          </Suspense>
        ),
      },
      // Add other child routes here as needed
      // auth route

      {
        path: "auth",
        children: [
          {
            path: "login",
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <Login />
              </Suspense>
            ),
          },
          {
            path: "registration",
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <RegistrationForm />
              </Suspense>
            ),
          },
          // {
          //   path: "reset-password",
          //   element: (
          //     <Suspense fallback={<LoadingFallback />}>
          //       <ResetPassword />
          //     </Suspense>
          //   ),
          // },
        ],
      },
      {
        path: "profile",
        element: <ProtectedRoute />,
        children: [
          {
            path: "", // This empty path means it will match /profile
            element: <ProfileLayout />,
            children: [
              {
                path: "",
                element: (
                  <Suspense fallback={<LoadingFallback />}>
                    <Dashboard />
                  </Suspense>
                ),
              },
              {
                path: "info",
                element: (
                  <Suspense fallback={<LoadingFallback />}>
                    <ProfileCard />
                  </Suspense>
                ),
              },
              {
                path: "addresses",
                element: (
                  <Suspense fallback={<LoadingFallback />}>
                    <AddressList />
                  </Suspense>
                ),
              },
              {
                path: "address-form",
                element: (
                  <Suspense fallback={<LoadingFallback />}>
                    <AddressForm />
                  </Suspense>
                ),
              },
              {
                path: "orders",
                element: (
                  <Suspense fallback={<LoadingFallback />}>
                    <OrderHistory />
                  </Suspense>
                ),
              },
              {
                path: "wishlist",
                element: (
                  <Suspense fallback={<LoadingFallback />}>
                    <Wishlist />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "auth/admin",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Da_Ly />
          </Suspense>
        ),
      },
      // Add other top-level routes here as needed
    ],
  },
]); // Public Routes
//     {
//       path: "",
//       element: (
//         <Suspense fallback={<LoadingFallback />}>
//           <HomePage />
//         </Suspense>
//       ),
//     },
//     {
//       path: "products",
//       children: [
//         {
//           path: "",
//           element: (
//             <Suspense fallback={<LoadingFallback />}>
//               <ProductListingPage />
//             </Suspense>
//           ),
//         },
//         {
//           path: ":productId",
//           element: (
//             <Suspense fallback={<LoadingFallback />}>
//               <ProductDetailPage />
//             </Suspense>
//           ),
//         },
//       ],
//     },
//     {
//       path: "category/:categoryId",
//       element: (
//         <Suspense fallback={<LoadingFallback />}>
//           <CategoryPage />
//         </Suspense>
//       ),
//     },
//     {
//       path: "cart",
//       element: (
//         <Suspense fallback={<LoadingFallback />}>
//           <CartPage />
//         </Suspense>
//       ),
//     },
//     {
//       path: "about",
//       element: (
//         <Suspense fallback={<LoadingFallback />}>
//           <AboutPage />
//         </Suspense>
//       ),
//     },
//     {
//       path: "contact",
//       element: (
//         <Suspense fallback={<LoadingFallback />}>
//           <ContactPage />
//         </Suspense>
//       ),
//     },
//   ],
// },

// // Auth Routes
// {
//   path: "auth",
//   element: <AuthLayout />,
//   children: [
//     {
//       path: "login",
//       element: (
//         <Suspense fallback={<LoadingFallback />}>
//           <LoginPage />
//         </Suspense>
//       ),
//     },
//     {
//       path: "register",
//       element: (
//         <Suspense fallback={<LoadingFallback />}>
//           <RegisterPage />
//         </Suspense>
//       ),
//     },
//     {
//       path: "forgot-password",
//       element: (
//         <Suspense fallback={<LoadingFallback />}>
//           <ForgotPasswordPage />
//         </Suspense>
//       ),
//     },
//     {
//       path: "reset-password",
//       element: (
//         <Suspense fallback={<LoadingFallback />}>
//           <ResetPasswordPage />
//         </Suspense>
//       ),
//     },
//   ],
// },

// // Protected Customer Routes
// {
//   path: "account",
//   element: <ProtectedComponent />,
//   children: [
//     {
//       path: "",
//       element: (
//         <Suspense fallback={<LoadingFallback />}>
//           <AccountDashboard />
//         </Suspense>
//       ),
//     },
//     {
//       path: "orders",
//       children: [
//         {
//           path: "",
//           element: (
//             <Suspense fallback={<LoadingFallback />}>
//               <OrderHistory />
//             </Suspense>
//           ),
//         },
//         {
//           path: ":orderId",
//           element: (
//             <Suspense fallback={<LoadingFallback />}>
//               <OrderDetail />
//             </Suspense>
//           ),
//         },
//       ],
//     },
//     {
//       path: "wishlist",
//       element: (
//         <Suspense fallback={<LoadingFallback />}>
//           <WishlistPage />
//         </Suspense>
//       ),
//     },
//     {
//       path: "checkout",
//       element: (
//         <Suspense fallback={<LoadingFallback />}>
//           <CheckoutPage />
//         </Suspense>
//       ),
//     },
//     {
//       path: "order-confirmation/:orderId",
//       element: (
//         <Suspense fallback={<LoadingFallback />}>
//           <OrderConfirmationPage />
//         </Suspense>
//       ),
//     },
//     {
//       path: "addresses",
//       element: (
//         <Suspense fallback={<LoadingFallback />}>
//           <AddressBook />
//         </Suspense>
//       ),
//     },
//     {
//       path: "settings",
//       element: (
//         <Suspense fallback={<LoadingFallback />}>
//           <AccountSettings />
//         </Suspense>
//       ),
//     },
//   ],
// },

// // Admin Routes
// {
//   path: "admin",
//   element: <SuperadminComponent />,
//   children: [
//     {
//       path: "",
//       element: (
//         <Suspense fallback={<LoadingFallback />}>
//           <AdminDashboard />
//         </Suspense>
//       ),
//     },
//     {
//       path: "products",
//       element: (
//         <ProtectedAdminRoute allowedRoles={["admin", "superadmin"]}>
//           <Suspense fallback={<LoadingFallback />}>
//             <ProductManagement />
//           </Suspense>
//         </ProtectedAdminRoute>
//       ),
//     },
//     {
//       path: "categories",
//       element: (
//         <ProtectedAdminRoute allowedRoles={["admin", "superadmin"]}>
//           <Suspense fallback={<LoadingFallback />}>
//             <CategoryManagement />
//           </Suspense>
//         </ProtectedAdminRoute>
//       ),
//     },
//     {
//       path: "orders",
//       element: (
//         <ProtectedAdminRoute allowedRoles={["admin", "superadmin"]}>
//           <Suspense fallback={<LoadingFallback />}>
//             <OrderManagement />
//           </Suspense>
//         </ProtectedAdminRoute>
//       ),
//     },
//     {
//       path: "customers",
//       element: (
//         <ProtectedAdminRoute allowedRoles={["superadmin"]}>
//           <Suspense fallback={<LoadingFallback />}>
//             <CustomerManagement />
//           </Suspense>
//         </ProtectedAdminRoute>
//       ),
//     },
//     {
//       path: "inventory",
//       element: (
//         <ProtectedAdminRoute allowedRoles={["admin", "superadmin"]}>
//           <Suspense fallback={<LoadingFallback />}>
//             <InventoryManagement />
//           </Suspense>
//         </ProtectedAdminRoute>
//       ),
//     },
//     {
//       path: "reports",
//       element: (
//         <ProtectedAdminRoute allowedRoles={["superadmin"]}>
//           <Suspense fallback={<LoadingFallback />}>
//             <SalesReport />
//           </Suspense>
//         </ProtectedAdminRoute>
//       ),
//     },
//   ],
// },

// 404 Route
// {
//   path: "*",
//   element: (
//     <Suspense fallback={<LoadingFallback />}>
//       <div className="flex h-screen w-full items-center justify-center">
//         <h1 className="text-2xl font-bold">Page Not Found</h1>
//         <p className="mt-2">The page you are looking for does not exist.</p>
//       </div>
//     </Suspense>
//   ),
// },

function ProtectedRoute() {
  const { ProtectedComponent } = useAuth();
  return <ProtectedComponent />;
}

export { router };
