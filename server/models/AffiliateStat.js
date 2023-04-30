import mongoose from "mongoose";

const AffiliateStatSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: "User" },
        affiliateSales: {
            type: [mongoose.Types.ObjectId],
            ref: "Transaction", // defining a relation to Transaction (one to many)
        },
    },
    { timestamps: true }
);

const AffiliateStat = mongoose.model("AffiliateStat", AffiliateStatSchema);
export default AffiliateStat;