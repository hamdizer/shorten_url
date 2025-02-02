import UrlRepository from "../repositories/url.repository";
import { nanoid } from "nanoid";
import validator from "validator";

class UrlService {
  async createShortenedUrl(originalUrl: string): Promise<string> {
    if (!validator.isURL(originalUrl)) {
      throw new Error("Invalid URL");
    }

    const existingUrl = await UrlRepository.getUrlByOriginalUrl(originalUrl);
    if (existingUrl) {
      return `${process.env.BASE_URL}/api/${existingUrl.shortCode}`;
    }

    const shortenedId = nanoid(7);

    await UrlRepository.createUrl({
      originalUrl,
      shortCode: shortenedId,
    } as any);

    return `${process.env.BASE_URL}/api/${shortenedId}`;
  }

  async getUrlByShortenedId(shortenedId: string): Promise<any | null> {
    return UrlRepository.getUrlByShortenedId(shortenedId);
  }
}

export default new UrlService();
