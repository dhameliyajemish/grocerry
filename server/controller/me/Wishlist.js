import Users from "../../model/Users.js";
import Products from "../../model/Products.js";

export const getWishlist = async (req, res) => {
    const id = req.user?.id;

    try {
        if (!id) {
            return res.status(400).json({ message: "User ID missing from token payload" });
        }
        const user = await Users.findById(id);
        if (!user) {
            console.warn(`getWishlist: User not found in DB for ID: ${id}`);
            return res.status(404).json({ message: "User not found. Please log in again." });
        }
        const wishlist = user.wishlist || [];
        const products = await Products.find({ id: { $in: wishlist } });
        res.status(200).json(products);
    } catch (e) {
        console.error("getWishlist error:", e);
        res.status(400).json({ message: e.message });
    }
}

export const updateWishlist = async (req, res) => {
    const id = req.user?.id;
    const { product_id } = req.body;
    try {
        if (!id) {
            return res.status(400).json({ message: "User ID missing from token payload" });
        }
        const user = await Users.findById(id);
        if (!user) {
            console.warn(`updateWishlist: User not found in DB for ID: ${id}`);
            return res.status(404).json({ message: "User not found. Please log in again." });
        }

        // if the user doesn't have a wishlist defined yet set it to an empty array
        const wishlist = user.wishlist || [];

        // if the wishlist contains the item, remove it
        let newWishlist;
        if (wishlist.includes(product_id))
            newWishlist = wishlist.filter((item) => item !== product_id);
        else // else add it to the wishlist
            newWishlist = [...wishlist, product_id];

        // update the database with the new wishlist
        await Users.findByIdAndUpdate(id, { wishlist: newWishlist });

        // respond with the new wishlist
        res.status(201).json({ wishlist: newWishlist });
    } catch (error) {
        console.error("updateWishlist error:", error);
        res.status(409).json({ message: error.message });
    }
}