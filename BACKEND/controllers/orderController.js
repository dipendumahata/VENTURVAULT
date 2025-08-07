import Order from '../models/Order.js';
import Gig from '../models/Gig.js';
import Transaction from '../models/Transaction.js';

export const createOrder = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.gigId);
        if (!gig) return res.status(404).json({ success: false, message: 'Gig not found' });

        const totalAmount = gig.price;
        const commissionPercentage = gig.platformFee || 15;
        const commissionAmount = (totalAmount * commissionPercentage) / 100;
        const amountPayableToAdvisor = totalAmount - commissionAmount;

        const order = await Order.create({
            gigId: gig._id,
            businessId: req.user.id,
            advisorId: gig.advisorId,
            totalAmount,
            commission: commissionAmount,
            amountPayableToAdvisor,
            paymentStatus: 'paid', // Assumed for now
            status: 'in_progress'
        });

        await Transaction.create({
            orderId: order._id,
            userId: req.user.id,
            amount: totalAmount,
            type: 'payment',
            status: 'completed' // Assumed for now
        });

        res.status(201).json({ success: true, data: order });
    } catch (error) { next(error); }
};
export const getMyOrders = async (req, res, next) => {
    try {
        let query = {};
        if (req.user.role === 'business') {
            query = { businessId: req.user.id };
        } else if (req.user.role === 'advisor') {
            query = { advisorId: req.user.id };
        } else {
            // If user is not a business or advisor, they have no orders
            return res.status(200).json({ success: true, count: 0, data: [] });
        }

        const orders = await Order.find(query).populate({
            path: 'gigId',
            select: 'title price'
        }).populate({
            path: 'businessId',
            select: 'profile.firstName profile.lastName'
        }).populate({
            path: 'advisorId',
            select: 'profile.firstName profile.lastName'
        });

        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (error) {
        next(error);
    }
};

