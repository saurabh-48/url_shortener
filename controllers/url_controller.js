import shortid from 'shortid';
import URL from '../models/url.js';

class UrlController {
    async generateNewShortUrl(req, res){
        const reqBody = req.body;
        if(!reqBody.url) return res.status(400).json({ error: 'Url is required' });
        const shortId = shortid(8);
        console.log('Short Id: ', shortId);

        await URL.create({
            shortId,
            redirectUrl: reqBody.url,
            visitHistory: [],
            createdBy: req.user._id
        });

        return res.json({ id: shortId })
    }

    async getAllUrls(req, res){
        const result = await URL.find({});

        return res.json(result);
    }

    async getUrlByShortId(req, res){
        const shortId = req.params.short_id;
        const url = await URL.findOneAndUpdate({
            shortId: shortId
        },{
            $push: {
                visitHistory: { timestamps: new Date()}
            }
        });
        return res.redirect(`https://${url.redirectUrl}`);
    }

    async getUserUrls(req, res){
        const url = await URL.find({
            createdBy: req.user._id
        });
        return res.json(url);
    }

    async getAnalytics(req, res){
        const shortId = req.params.short_id;
        const result = await URL.findOne({ shortId });
        return res.json({
            totalVisits: result.visitHistory.length,
            visitHistory: result.visitHistory
        })
    }
}

export default UrlController;