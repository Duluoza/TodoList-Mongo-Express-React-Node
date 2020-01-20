const {Router} = require('express');
const Item = require('../models/item');
const router = Router();

// getAll
router.get('/', async (req, res) =>{
    const items = Item.find();
    console.log(items)
});

// add
// router.post('/putData', (req, res) => {
//     let data = new Item();
//
//     const { label, id, pos, parentId } = req.body;
//
//     if ((!id && id !== 0) || !label || !pos || !parentId) {
//         return res.json({
//             success: false,
//             error: 'INVALID INPUTS',
//         });
//     }
//     data.label = label;
//     data.id = id;
//     data.pos = pos;
//     data.parentId = parentId;
//     data.save((err) => {
//         if (err) return res.json({ success: false, error: err });
//         return res.json({ success: true });
//     });
// });


// router.post('/', async (req, res) => {
//     const items = new Item({
//
//     });
//
//     try {
//         await items.save();
//     } catch (e) {
//         console.log(e)
//     }
// });

module.exports = router;