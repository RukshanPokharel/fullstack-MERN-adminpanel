import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: "admin" }).select("-password"); // exclude password property from response
        res.status(200).json(admins);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserPerformance = async (req, res) => {
    try {
        const { id } = req.params;

        const userWithStats = await User.aggregate([ // aggregate => similar to join in mysql
            { $match: { _id: new mongoose.Types.ObjectId(id) } }, // matching and finding user with the particular id from User model
            {
                // grab info from affilatestat model matching the _id of User
                $lookup: {
                    from: "affiliatestats",
                    localField: "_id",
                    foreignField: "userId",
                    as: "affiliateStats" // save the result as affiliateStat property
                }
            },
            {
                $unwind: "$affiliateStats" // flatten that property
            }

        ]);

        const saleTransactions = await Promise.all(
            userWithStats[0].affiliateStats.affiliateSales.map((id) => {
                return Transaction.findById(id);
            })
        );
        const filteredSaleTransactions = saleTransactions.filter(
            (transaction) => transaction !== null
        );

        res.status(200).json({ user: userWithStats[0], sales: filteredSaleTransactions });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}