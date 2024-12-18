import { Router } from "express";
import { userActivitiesController } from "../controllers/user.activities.controller.js";
import { authUser, authAdmin } from "../Middlewares/authmiddleware.js";
const userActivitiesRouter = Router();

// userActivitiesRouter.route("/cart").get(userActivitiesController.getUserCart);
userActivitiesRouter
  .route("/addcart")
  .post(authUser, userActivitiesController.addToCart);

userActivitiesRouter
  .route("/removecart/:id")
  .delete(authUser, userActivitiesController.removeFromCart);
userActivitiesRouter
  .route("/updatecart/:productId/:variantId")
  .put(authUser, userActivitiesController.updateCartQuantity);
userActivitiesRouter
  .route("/getcart")
  .get(authUser, userActivitiesController.getUserCart);

userActivitiesRouter
  .route("/getwishlist")
  .get(authUser, userActivitiesController.getUserWishlist);
userActivitiesRouter
  .route("/addwishlist")
  .post(authUser, userActivitiesController.addToWishlist); // now same product can be added multiple times
// userActivitiesRouter
//   .route("/wishlist/:id")
//   .delete(userActivitiesController.removeProductFromWishlist);
//userActivitiesRouter.route("/order").get(userActivitiesController.getUserOrder);

export default userActivitiesRouter;
