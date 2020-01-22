const {Router} = require('express');
const List = require('../models/list');
const router = new Router();

router.post('/addList', async (req, res) => {
    let list = new List();

    let { parentId } = req.body;

    list.parentId = parentId;

    list.save((err, obj) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: obj });
    });
});

router.get('/getLists', (req, res) => {
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

module.exports = router;