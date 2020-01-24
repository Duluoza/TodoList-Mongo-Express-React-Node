const {Router} = require('express');
const Item = require('../models/item');
const List = require('../models/list');
const router = new Router();

router.post('/addItem', async (req, res) => {
    let data = new Item();

    let { label, parentId } = req.body;
    
    if(parentId === 0) {
        const startId = await List.find({parentId: null});
        parentId = startId[0]._id
    }

    data.label = label;
    data.parentId = parentId;
    let position = await Item.find({ parentId: parentId });
    data.pos = position.length;

    let result = await List.find({_id: parentId});
    data.ancestors = result[0].ancestors.concat(parentId);

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

router.post('/deleteItem', (req, res) => {
    const {id} = req.body;
    console.log('id' , id)
    List.find({ ancestors: id }).then(lists => {
        if (lists.length) {
            List.deleteMany({ ancestors: id }).then(() => {
            })
        }
    });
    Item.find({ ancestors: id }).then(items => {
        if (items.length) {
            Item.deleteMany({ ancestors: id }).then(() => {
            })
        }
    });
    Item.find({_id: id}).then(item => {
        let parentId = item[0].parentId;
        let pos = item[0].pos;
        Item.find({parentId: parentId}).then(child => {
            child.filter(item => item.id !== id)
                .forEach(item => {
                    if(item.pos > pos) item.pos -= 1;
                    item.save()
                })
        });
        Item.findByIdAndRemove({_id: id}).then(item => {
            res.status(200).json({ success: true, data: item });
        })
    });
});

module.exports = router;