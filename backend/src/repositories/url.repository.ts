import URL, { IURL } from '../models/url.model';

class UrlRepository {
    async createUrl(url: IURL): Promise<IURL> {
        return URL.create(url);
    }

    async getUrlByShortenedId(shortenedId: string): Promise<IURL | null> {
        return URL.findOne({ shortCode:shortenedId });
    }

    async getUrlByOriginalUrl(originalUrl: string): Promise<IURL | null> {
        return URL.findOne({ originalUrl });
    }
}

export default new UrlRepository();