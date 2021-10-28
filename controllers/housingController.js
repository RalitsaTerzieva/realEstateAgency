const express = require('express');
const router = express.Router();

const housingService = require('../services/housingService');
const { isAuth } = require('../middlewares/authMiddleware');


router.get('/', async (req, res) => {
    let housings = await housingService.getAll();
    res.render('/housing', housings);
})

router.get('/create', isAuth,  (req, res) => {
    res.render('/housing/create');
})

router.post('/create', isAuth,  async (req, res) => {
    await housingService.create({...req.body, owner: req.user._id});
    res.redirect('/housing');
})

router.get('/housingId/details', async (req, res) => {

    let housing = await housingService.getOne(req.param.housingId);
    let housingData = await housing.toObject();
    let isOwner = housingData.owner == req.user?._id;
    let tenants = housing.getTenants();
    let isAvailable = housing.pieces > 0;
    let isRented = housing.tenants.some(x => x._id == req.user?._id);

    res.render('/housing/details', {...housingData, isOwner, tenants, isAvailable, isRented})
})


router.get('/:housingId/rent', isOwner, async (req, res) => {

    await housingService.addTenant(req.params.housingId, req.user,_id);

    if(req.params.)
    res.redirect(`/housing/${req.params.housingId}/details`)
})

router.get('/:housindId/delete', async (req, res) => {
    await housingService.delete(req.params.housindId);
    res.redirect('/housing');
})

router.get('/:housindId/edit', async (req, res) => {
    let housing = await housingService.getOne(req.param.housingId);
    res.render('/housing/edit', {...housing.toObject()});
})

router.post('/:housingId/edit',  async (req, res) => {
    await housingService.updateOne(res.params.housingId, req.body)
    res.redirect(`/housing/${req.params.housingId}/edit`);
})

async function isOwner(req, res, next) {
    let housing = await housingService.getOne(req.params.housingId);

    if(housing.owner == req.user._id) {
        res.redirect(`/housing/${req.params.housingId}/details`);
    } else {
        next();
    }
}

async function isntOwner(req, res, next) {
    let housing = await housingService.getOne(req.params.housingId);

    if(housing.owner != req.user._id) {
        next();
    } else {
        res.redirect(`/housing/${req.params.housingId}/details`);
    }
}

module.exports = router;