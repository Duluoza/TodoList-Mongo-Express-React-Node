const {Router} = require('express');
const Item = require('../models/item');
const router = new Router();

router.post('/putData',async (req, res) => {

    let { id, label } = req.body;
    if (!id || !label) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }

    let data = await new Item(req.body);
    console.log("data", data);

await res.send(data)
    // data._id = _id;
    // data.label = label;
    // data.id = ids;
    // data.save((err, cont) => {
    //     if (err) return res.json({ success: false, error: err });
    //     return res.status(200).send(cont)
    // });

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