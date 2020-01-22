const {Router} = require('express');
const Item = require('../models/item');
const router = new Router();

router.post('/addItem', async (req, res) => {
    let data = new Item();

    let { label, parentId } = req.body;

    data.label = label;
    data.parentId = parentId;
    let position = await Item.find({ parentId: parentId });
    data.pos = position.length;

    data.save((err, obj) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: obj });
    });
});

router.get('/getItems', (req, res) => {
    Item.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.post('/updateData', (req, res) => {
    const { id, update } = req.body;
    Data.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.delete('/deleteData', (req, res) => {
    const { id } = req.body;
    Data.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

module.exports = router;