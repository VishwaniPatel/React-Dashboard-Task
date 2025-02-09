import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput, Textarea, NumberInput, Select, Button } from "@mantine/core";
import { useAddProductMutation, useUpdateProductMutation } from "../../utility/services/products.service";
import { useEffect } from "react";

// Category options
const categoryOptions = [
    "Electronics",
    "Clothing",
    "Books",
    "Home Appliances",
    "Toys",
    "Automobiles",
    "Beauty & Personal Care",
    "Sports & Fitness",
    "Groceries",
    "Furniture"
]

// Define validation schema using Yup
const productSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    price: yup.number()
        .required("Price is required").typeError("Price must be a number")
        .positive("Price must be positive"),
    category: yup.string().required("Category is required"),
    status: yup.string().oneOf(["active", "inactive"], "Select status").required("Status is required"),
});

const ProductForm = ({ product, onSuccess }) => {
    const {
        control,
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(productSchema), // Use Yup resolver
        defaultValues: {
            name: "",
            description: "",
            price: "",
            category: "",
            status: "",
        },
    });

    useEffect(() => {
        if (product) {
            setValue("name", product.name);
            setValue("description", product.description);
            setValue("price", product.price);
            setValue("category", product.category);
            setValue("status", product.status);
        }
    }, [product, setValue]);

    const [addProduct] = useAddProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    // Submit product data
    const onSubmit = async (data) => {
        try {
            if (product) {
                // update product data
                await updateProduct({ id: product.id, ...data });
            } else {
                // add product data
                await addProduct(data).unwrap();
            }
            alert(`Product ${product ? "updated" : "added"} successfully!`);
            reset(); 
            onSuccess();
        } catch (error) {
            console.error("Error saving product", error);
        }
    };

    return (
        // Start: Product Form
        <form onSubmit={handleSubmit(onSubmit)}>          
            <TextInput label="Product Name" {...register("name")} error={errors.name?.message}/>
            <Textarea label="Description" {...register("description")} error={errors.description?.message} mt="md" />
            
            <Controller
                name="price"
                control={control}
                render={({ field }) => (
                    <NumberInput 
                        {...field} 
                        label="Price" 
                        mt="md"   
                        error={errors.price?.message} 
                        value={field.value || undefined} // ✅ Ensure it's undefined if empty
                        onChange={(value) => field.onChange(value === "" ? undefined : value)}
                    />
                )}
            />
            
            <Controller
                name="category"
                control={control}
                render={({ field }) => (
                    <Select 
                        {...field} 
                        label="Category" 
                        data={categoryOptions} 
                        mt="md"  
                        error={errors.category?.message} 
                        onChange={(value) => field.onChange(value)}
                    />
                )}
            />

            <Controller
                name="status"
                control={control}
                render={({ field }) => (
                    <Select 
                        {...field} 
                        label="Status" 
                        data={[
                            { value: "active", label: "Active" },
                            { value: "inactive", label: "Inactive" },
                        ]} 
                        mt="md" 
                        error={errors.status?.message} 
                        onChange={(value) => field.onChange(value)}
                    />
                )}
            />

            <Button type="submit" fullWidth mt="lg">
                {product ? "Update Product" : "Add Product"}
            </Button>
        </form>
        // End: Product Form
    );
};

export default ProductForm;
