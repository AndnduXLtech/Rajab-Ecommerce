import { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
  "Sports",
  "Toys",
  "Beauty",
  "Automotive",
  "Health",
  "Food & Beverages",
  "Office Supplies",
  "Pet Supplies",
  "Tools & Hardware",
  "Music",
  "Movies",
];

function Products() {
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Wireless Headphones",
      category: "Electronics",
      price: "$129.99",
      stock: 45,
      status: "in-stock",
    },
    {
      id: "2",
      name: "Smart Watch",
      category: "Electronics",
      price: "$199.99",
      stock: 0,
      status: "out-of-stock",
    },
  ]);

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [
      ...prev,
      {
        ...newProduct,
        id: (prev.length + 1).toString(),
        status: newProduct.stock > 0 ? "in-stock" : "out-of-stock",
      },
    ]);
    setIsDialogOpen(false);
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Product Management</h2>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm onSubmit={handleAddProduct} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "capitalize",
                      product.status === "in-stock"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    )}
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// We also need to modify the ProductForm component to handle form submission
function ProductForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    discount: "0",
    stock: "0",
    sku: "",
    images: [{ url: "", altText: "" }],
    variants: [{ color: "", size: "", stock: "0", sku: "" }],
    specifications: [{ key: "", value: "" }],
    shipping: {
      weight: "",
      dimensions: {
        length: "",
        width: "",
        height: "",
      },
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);

    setFormData({
      name: "",
      description: "",
      brand: "",
      category: "",
      price: "",
      discount: "0",
      stock: "0",
      sku: "",
      images: [{ url: "", altText: "" }],
      variants: [{ color: "", size: "", stock: "0", sku: "" }],
      specifications: [{ key: "", value: "" }],
      shipping: {
        weight: "",
        dimensions: {
          length: "",
          width: "",
          height: "",
        },
      },
    });
  };

  const handleChange = (e, field, index = null, nestedField = null) => {
    const value = e.target.value;

    if (index !== null) {
      // Handle array fields
      setFormData((prev) => {
        const newArray = [...prev[field]];
        if (nestedField) {
          newArray[index] = { ...newArray[index], [nestedField]: value };
        } else {
          newArray[index] = value;
        }
        return { ...prev, [field]: newArray };
      });
    } else if (field.includes(".")) {
      // Handle nested objects
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      // Handle simple fields
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const addArrayItem = (field, template) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], template],
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange(e, "name")}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="brand">Brand *</Label>
          <Input
            id="brand"
            value={formData.brand}
            onChange={(e) => handleChange(e, "brand")}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sku">SKU *</Label>
          <Input
            id="sku"
            value={formData.sku}
            onChange={(e) => handleChange(e, "sku")}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange(e, "description")}
          required
        />
      </div>

      {/* Pricing and Stock */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price *</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleChange(e, "price")}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="discount">Discount (%)</Label>
          <Input
            id="discount"
            type="number"
            min="0"
            max="100"
            value={formData.discount}
            onChange={(e) => handleChange(e, "discount")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock *</Label>
          <Input
            id="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={(e) => handleChange(e, "stock")}
            required
          />
        </div>
      </div>

      {/* Images */}
      <div className="space-y-4">
        <Label>Images</Label>
        {formData.images.map((image, index) => (
          <div key={index} className="flex gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Input
                placeholder="Image URL"
                value={image.url}
                onChange={(e) => handleChange(e, "images", index, "url")}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Input
                placeholder="Alt Text"
                value={image.altText}
                onChange={(e) => handleChange(e, "images", index, "altText")}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => removeArrayItem("images", index)}
              className="mb-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addArrayItem("images", { url: "", altText: "" })}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Image
        </Button>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <Label>Variants</Label>
        {formData.variants.map((variant, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 items-end">
            <Input
              placeholder="Color"
              value={variant.color}
              onChange={(e) => handleChange(e, "variants", index, "color")}
            />
            <Input
              placeholder="Size"
              value={variant.size}
              onChange={(e) => handleChange(e, "variants", index, "size")}
            />
            <Input
              type="number"
              placeholder="Stock"
              value={variant.stock}
              onChange={(e) => handleChange(e, "variants", index, "stock")}
            />
            <div className="flex gap-2">
              <Input
                placeholder="SKU"
                value={variant.sku}
                onChange={(e) => handleChange(e, "variants", index, "sku")}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeArrayItem("variants", index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            addArrayItem("variants", {
              color: "",
              size: "",
              stock: "0",
              sku: "",
            })
          }
        >
          <Plus className="h-4 w-4 mr-2" /> Add Variant
        </Button>
      </div>

      {/* Specifications */}
      <div className="space-y-4">
        <Label>Specifications</Label>
        {formData.specifications.map((spec, index) => (
          <div key={index} className="flex gap-4 items-end">
            <div className="flex-1">
              <Input
                placeholder="Key"
                value={spec.key}
                onChange={(e) =>
                  handleChange(e, "specifications", index, "key")
                }
              />
            </div>
            <div className="flex-1">
              <Input
                placeholder="Value"
                value={spec.value}
                onChange={(e) =>
                  handleChange(e, "specifications", index, "value")
                }
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => removeArrayItem("specifications", index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addArrayItem("specifications", { key: "", value: "" })}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Specification
        </Button>
      </div>

      {/* Shipping Information */}
      <div className="space-y-4">
        <Label>Shipping Information</Label>
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Weight</Label>
            <Input
              id="weight"
              type="number"
              value={formData.shipping.weight}
              onChange={(e) => handleChange(e, "shipping.weight")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="length">Length</Label>
            <Input
              id="length"
              type="number"
              value={formData.shipping.dimensions.length}
              onChange={(e) => handleChange(e, "shipping.dimensions.length")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="width">Width</Label>
            <Input
              id="width"
              type="number"
              value={formData.shipping.dimensions.width}
              onChange={(e) => handleChange(e, "shipping.dimensions.width")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              type="number"
              value={formData.shipping.dimensions.height}
              onChange={(e) => handleChange(e, "shipping.dimensions.height")}
            />
          </div>
        </div>
      </div>

      <Button className="w-full" size="lg">
        Create Product
      </Button>
    </form>
  );
}

export default Products;
