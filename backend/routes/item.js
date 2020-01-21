const {Router} = require('express');
const Item = require('../models/item');
const router = new Router();

router.post('/putData', async (req, res) => {

    let data = new Item();

    let { label, parentId } = req.body;
    data.label = label;
    data.parentId = parentId;
    Item.find({ parentId: parentId })
        .then(children => {data.pos = children.length ? children.length : 0});
    data.save((err, obj) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: obj });
    });

    // let data = await new Item(...req.body);
    //
    // try{
    //     await data.save();
    //    await res.send({ success: true, data})
    // } catch (err) {
    //    await res.json({ success: false, error: err.message })
    // }
});

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
    Item.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
    const { id, update } = req.body;
    Data.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
    const { id } = req.body;
    Data.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});


module.exports = router;