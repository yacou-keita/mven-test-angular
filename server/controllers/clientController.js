const Client = require('../models/clientModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


exports.getAllClients = catchAsync(async (req, res, next) => {
  const clients = await Client.find().populate('providers').select('-__v');
  res
    .status(200)
    .json({
      status: 'success',
      results: clients.length,
      data: { clients }
    });
});

exports.createClient = catchAsync(async (req, res, next) => {
  const client = await (await Client.create(req.body)).populate('providers').execPopulate();
  if (!client) return next(new AppError('No client found', 400));
  res.status(201).json({ status: 'success', data: { client } });
});


exports.getClient = catchAsync(async (req, res, next) => {
  const client = await Client.findById(req.params.id).populate({
    path: 'providers',
    select: '-__v'
  }).select('-__v');
  if (!client) return next(new AppError('No client found', 404));
  return res.status(200).json({ status: 'success', data: { client } });

});

exports.updateClient = catchAsync(async (req, res, next) => {
  const client = await (await Client
    .findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true }))
    .populate('providers')
    .execPopulate();
  if (!client) return next(new AppError('No client found', 404));
  return res.status(200).json({ status: 'success', data: { client } });
});

exports.deleteClient = catchAsync(async (req, res, next) => {
  const client = await Client.findByIdAndDelete(req.params.id);
  if (!client) return next(new AppError('No client found', 404));
  return res.status(202).json({ status: 'success', data: null });
});