import shortid from 'shortid';
import URL from '../models/url.js';
import { Url } from 'url';

class UrlController {
    async generateNewShortUrl(req, res){
        const reqBody = req.body;
        if(!reqBody.url) return res.status(400).json({ error: 'Url is required' });
        const shortId = shortid(8);
        console.log('Short Id: ', shortId);

        await URL.create({
            shortId,
            redirectUrl: reqBody.url,
            visitHistory: []
        });

        return res.json({ id: shortId })
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

        res.redirect(url.redirectUrl);
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