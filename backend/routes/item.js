const {Router} = require('express');
const Item = require('../schemas/item');
const List = require('../schemas/list');
const itemModel = require('../models/item');
const router = new Router();

router.get('/', (req, res) => {
    Item.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
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
    console.log(data)

    await res.json({ success: true, data });

    // Item.findByIdAndUpdate({ _id: req.body._id }, req.body).then(() => {
    //     Item.findOne({ _id: req.body._id }).then(item => {
    //         res.status(200).send(item);
    //     });
    // });
});

module.exports = router;