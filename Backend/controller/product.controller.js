import Product from "../model/product.model.js";

export const getProduct = async (req, res) => {
    try {

        const products = await Product.find();

        res.status(200).json(products);

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            message: error.message,
        });

    }
}

export const getMyProduct = async (req, res) => {
    try {
        const { userId } = req.params;
        const products = await Product.find({
            userId: userId,
        });
        res.status(200).json(products);
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ message: error.message })
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, category, price, contact_number, address, description, userId, username } = req.body;
        if (!req.file) {
            return res.status(400).json({
                message: "Image upload failed"
            });
        }

        const image = req.file.path;

        const newProduct = new Product({
            name: name,
            category: category,
            price: Number(price),
            contact_number: contact_number,
            address: address,
            description: description,
            image: image,
            userId: userId,
            username: username,
        })

        await newProduct.save();
        res.status(201).json({ message: "Product uploaded successfully", product: newProduct });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {

        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
        });

    } catch (error) {

        console.log("Error: ", error);

        res.status(500).json({
            message: error.message,
        });

    }
};