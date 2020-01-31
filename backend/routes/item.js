const {Router} = require('express');
const itemModelClass = require('../models/item');
const itemModel = new itemModelClass;
const router = new Router();

router.get('/', async (req, res) => {

    let data = await itemModel.get();

    await res.json({ success: true, data });

});

router.post('/add', async (req, res) => {

    const { label, parentId } = req.body;

    let data = await itemModel.add(label, parentId);

    await res.json({ success: true, data });
});

router.post('/delete', async (req, res) => {
    
    const { id } = req.body;

    let data = await itemModel.delete(id);

    await res.json({ success: true, data });
});

router.patch('/edit', async (req, res) => {
    
    const {...item} = req.body;

    let data = await itemModel.update(item);

    await res.json({ success: true, data: data[0] });
});

module.exports = router;