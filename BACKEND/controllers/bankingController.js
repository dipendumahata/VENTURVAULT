import LoanProduct from '../models/LoanProduct.js';

export const createLoanProduct = async (req, res, next) => {
  try {
    req.body.bankerId = req.user.id;
    const loanProduct = await LoanProduct.create(req.body);
    res.status(201).json({ success: true, data: loanProduct });
  } catch (error) { next(error); }
};

export const getLoanProducts = async (req, res, next) => {
    try {
        const products = await LoanProduct.find({ isActive: true }).populate('bankerId', 'profile');
        res.status(200).json({ success: true, count: products.length, data: products });
    } catch (error) { next(error); }
};

/**
 * @desc    Get all loan products for the currently logged-in banker
 * @route   GET /api/banking/my-products
 * @access  Private (Role: 'banker')
 */
export const getMyLoanProducts = async (req, res, next) => {
    try {
        const products = await LoanProduct.find({ bankerId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: products.length, data: products });
    } catch (error) {
        next(error);
    }
};

export const getLoanProductById = async (req, res, next) => {
    try {
        const product = await LoanProduct.findById(req.params.id).populate('bankerId', 'profile');
        if (!product) {
            return res.status(404).json({ success: false, message: 'Loan product not found' });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

export const updateLoanProduct = async (req, res, next) => {
    try {
        let product = await LoanProduct.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Loan product not found' });
        }
        if (product.bankerId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this product' });
        }
        product = await LoanProduct.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};