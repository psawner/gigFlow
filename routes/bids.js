const express = require('express')
const router = express.Router()

const Bid = require('../models/bid')
const Gig = require('../models/gig')

const authMiddleware = require('../middleware/authMiddleware')
const { route } = require('./auth')

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { gigId, message, price } = req.body;

        const gig = await Gig.findById(gigId);
        if (!gig || gig.status !== "open") {
            return res.status(400).json({ message: "Gig not available" });
        }

        if (gig.ownerId.toString() === req.user) {
            return res.status(400).json({ message: "Owner cannot bid" });
        }

        const bid = await Bid.create({
            gigId,
            freelancerId: req.user,
            message,
            price
        });

        res.status(201).json(bid);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:gigId", authMiddleware, async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.gigId);

        if (!gig) {
            return res.status(404).json({ message: "Gig not found" });
        }

        if (gig.ownerId.toString() !== req.user) {
            return res.status(403).json({ message: "Access denied" });
        }

        const bids = await Bid.find({ gigId: gig._id });
        res.json(bids);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch("/:bidId/hire", authMiddleware, async (req, res) => {
    try {
        const bid = await Bid.findById(req.params.bidId);
        if (!bid) {
            return res.status(404).json({ message: "Bid not found" });
        }

        const gig = await Gig.findById(bid.gigId);
        if (!gig) {
            return res.status(404).json({ message: "Gig not found" });
        }

        if (gig.ownerId.toString() !== req.user) {
            return res.status(403).json({ message: "Not authorized" });
        }

        if (gig.status === "assigned") {
            return res.status(400).json({ message: "Gig already assigned" });
        }

        gig.status = "assigned";
        await gig.save();

        bid.status = "hired";
        await bid.save();

        await Bid.updateMany(
            { gigId: gig._id, _id: { $ne: bid._id } },
            { status: "rejected" }
        );

        res.json({ message: "Freelancer hired successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router
