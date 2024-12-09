const Setting = require('../models/Setting');

exports.setCredit = async (req, res) => {
    try {
        const { creditCnt, cPrice } = req.body;
        let setting = await Setting.findOne();
        if(setting){
            setting.common.creditCnt = creditCnt;
            setting.common.price = cPrice;
            await setting.save();
            return res.json({ message: 'success', credit: creditCnt, price: cPrice });
        } else {
            setting = new Setting({
                common: { creditCnt, price: cPrice },
            });
            await setting.save();
            return res.json({ message: 'success', credit: creditCnt, price: cPrice });
        }
    } catch (error) {
        res.status(500).json({ message: 'failed_setCredit', error });
    }
}

exports.setBonusCredit = async (req, res) => {
    try {
        const { credit, price } = req.body;
        let setting = await Setting.findOne();
        if(setting){
            setting.bonus.creditCnt = credit;
            setting.bonus.price = price;
            await setting.save();
            return res.json({ message: 'success', credit: credit, price: price });
        } else {
            setting = new Setting({
                bonus: { credit, price: price },
            });
            await setting.save();
            return res.json({ message: 'success', credit: credit, price: price });
        }
    } catch (error) {
        res.status(500).json({ message: 'failed_setCredit', error });
    }
}

exports.getSettingData = async (req, res) => {
    let setting = await Setting.findOne();
    if(setting){
        return res.json({ setting });
    } else {
        return res.json({  })
    }
}