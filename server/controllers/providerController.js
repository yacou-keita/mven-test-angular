
// DEPENDENCIES ==========================

// Provider model
const { Provider } = require('../models/providerModel');
const catchAsync = require('../utils/catchAsync');


// HANDLERS ==============================


// Get all providers
exports.getAllProvider = catchAsync(async (req, res, next) => {
  const providers = await Provider.find();
  res.status(200).json({
    status: 'success', data: {
      providers
    }
  });
});

// Create a provider
exports.createProvider = catchAsync(async (req, res, next) => {
  const provider = await Provider.create(req.body);
  res.status(201).json({ status: 'success', data: { provider } });
});

exports.getProvider = catchAsync(async (req, res, next) => {
  const provider = await Provider.findById(req.params.id).select('-__v');
  res.status(200).json({ status: 'success', data: { provider } });
});

exports.updateProvider = catchAsync(async (req, res, next) => {
  const provider = await Provider.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });
  res.status(200).json({ status: 'success', data: { provider } });
});

exports.deleteProvider = catchAsync(async (req, res, next) => {
  await Provider.findByIdAndDelete(req.params.id);
  return res.status(202).json({ status: 'success', data: null });
});