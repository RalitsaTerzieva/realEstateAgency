const Housing = require('../models/Housing');

exports.getAll = () => Housing.find().lean();

exports.getOne = (housingId) => Housing.findById(housingId).populate('tenants');

exports.create = (housingData) => Housing.create(housingData);

exports.getTopHouses = () => Housing.find().sort({createdAt: -1}).limit(3).lean();

exports.addTenants = async (housingId, tenantId) => {
    //let housing = await housingService.getOne(req.param.housingId);
    //housing.tenants.push(req.user._id);
    // return housing.save();
    return Housing.findOneAndUpdate(
        {_id: housingId}, 
        {$push: {tenants: tenantId}, 
        $inc: {pieces: -1}}, 
    {
        runValidators: true
    });
} 

exports.delete = (housingId) => Housing.findByIdAndDelete(housingId);

exports.updateOne = (housingId, housingData) => Housing.findByIdAndUpdate(housingId, housingData);