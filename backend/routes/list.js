const {Router} = require('express');
const listModelClass = require('../models/list');
const listModel = new listModelClass;
const router = new Router();

router.post('/add', async (req, res) => {

    const { parentId } = req.body;

    let data = await listModel.add(parentId);

    await res.json({ success: true, data });

});

router.get('/', async (req, res) => {

    let data = await listModel.get();

    await res.json({ success: true, data });

});

router.post('/delete', async (req, res) => {

    const { id } = req.body;

    let item = await listModel.delete(id);

    await res.json({ success: true, data: item });

});

module.exports = router;