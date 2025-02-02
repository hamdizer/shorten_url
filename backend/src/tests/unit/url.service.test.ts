import UrlService from "../../services/url.service";
import UrlRepository from "../../repositories/url.repository";

// Mocking the repository methods
jest.mock("../../repositories/url.repository");
jest.mock("nanoid", () => ({ nanoid: jest.fn(() => "abc1234") }));

describe("UrlService", () => {
  const originalUrl = "https://example.com";
  const shortenedId = "abc1234";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a shortened URL and return it", async () => {
    const createUrlMock = jest
      .fn()
      .mockResolvedValue({ originalUrl, shortCode: shortenedId });
    (UrlRepository.createUrl as jest.Mock) = createUrlMock;

    const shortenedUrl = await UrlService.createShortenedUrl(originalUrl);

    expect(shortenedUrl).toBe(`${process.env.BASE_URL}/api/abc1234`);
    expect(createUrlMock).toHaveBeenCalledWith({
      originalUrl,
      shortCode: shortenedId,
    });
    expect(createUrlMock).toHaveBeenCalledTimes(1);
  });

  it("should return existing shortened URL if the URL is already shortened", async () => {
    const existingUrl = { originalUrl, shortCode: shortenedId };
    const getUrlMock = jest.fn().mockResolvedValue(existingUrl);
    (UrlRepository.getUrlByOriginalUrl as jest.Mock) = getUrlMock;

    const shortenedUrl = await UrlService.createShortenedUrl(originalUrl);

    expect(shortenedUrl).toBe(`${process.env.BASE_URL}/api/abc1234`);
    expect(getUrlMock).toHaveBeenCalledWith(originalUrl);
    expect(getUrlMock).toHaveBeenCalledTimes(1);
  });

  it("should throw error for invalid URL", async () => {
    const invalidUrl = "invalid-url";

    await expect(UrlService.createShortenedUrl(invalidUrl)).rejects.toThrow(
      "Invalid URL"
    );
  });

  it("should return null if shortened ID is not found", async () => {
    const getUrlMock = jest.fn().mockResolvedValue(null);
    (UrlRepository.getUrlByShortenedId as jest.Mock) = getUrlMock;

    const url = await UrlService.getUrlByShortenedId(shortenedId);

    expect(url).toBeNull();
    expect(getUrlMock).toHaveBeenCalledWith(shortenedId);
    expect(getUrlMock).toHaveBeenCalledTimes(1);
  });
});
