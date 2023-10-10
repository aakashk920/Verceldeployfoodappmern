const express = require('express');
const router = express.Router();
router.post('/foodData', (req, res) => {
    try {
        const responseData = {
            food: global.food,
            fooditems: global.fooditems
        };

        res.send(responseData);
    } catch (error) {
        console.error(error);
        res.send("Server Error");
    }
});

module.exports=router;