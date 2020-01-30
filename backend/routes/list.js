const {Router} = require('express');
const List = require('../schemas/list');
const Item = require('../schemas/item');
const router = new Router();

router.post('/add', async (req, res) => {
    let list = new List();

    let { parentId } = req.body;

    list.parentId = parentId;
    let result = await Item.find({_id: parentId});
    list.ancestors = result[0].ancestors.concat(parentId);

    list.save((err, obj) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: obj });
    });
});

// router.get('/:id', async (req, res) => {
//     const {id} = req.params;
//
// })

router.get('/', async (req, res) => {
    // const lists = await  List.find({});
    // let data = [];
    //
    // if(lists.length === 0){
    //     const list = await List.create({parentId: null});
    //     data.push(list)
    // }
    // data = [
    //     ...lists
    // ];
    //
    // res.json({ success: true, data });

    List.find({}).then(datas => {
        if (!datas.length) {
            List.create({parentId: null})
                .then(data => {
                    datas.push(data);
                    res.json({ success: true, data: datas });
                })
        } else {
            res.json({ success: true, data: datas });
        }
    })

});

router.post('/delete', (req, res) => {
    const { id } = req.body;

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
    List.findByIdAndRemove({_id: id}).then(item => {
        res.status(200).json({ success: true, data: item });
    });
});

module.exports = router;