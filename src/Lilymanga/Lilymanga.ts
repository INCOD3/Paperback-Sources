import { Source, Manga, MangaStatus, Chapter, ChapterDetails, HomeSectionRequest, HomeSection, MangaTile, SearchRequest, LanguageCode, TagSection, Request, MangaUpdates, SourceTag, TagType, PagedResults } from "paperback-extensions-common"
const SOURCE_DOMAIN = "https://lilymanga.com/"

export class Lilymanga extends Source {
    constructor(cheerio: CheerioAPI) {
        super(cheerio)
    }

    get version(): string { return '0.1.0' }
    get name(): string { return 'Lilymanga' }
    get description(): string { return 'A source for lily/yuri manga' }
    get author(): string { return 'Lily Lovers' }
    get authorWebsite(): string { return '' }
    get icon(): string { return "Lily-Manga.png" }
    get hentaiSource(): boolean { return false }
    get sourceTags(): SourceTag[] { 
		return [
		{
			text: "Experimental",
			type: TagType.RED
		}
		];	
	}
    get rateLimit(): Number {
      return 2
    }
    get websiteBaseURL(): string { return SOURCE_DOMAIN }

    /**
     * This method has been provided to you as it's probably rather rare that it ever needs to be changed
     * even on different sources.
     * This Method should point to the URL of a specific manga object on your source. Make sure to change
     * line 33 so that it points to your manga! In this case, 'id' is the manga identifier
     */
    getMangaDetailsRequest(ids: string[]): Request[] {
      let requests: Request[] = []
      for (let id of ids) {
        let metadata = { 'id': id }
        requests.push(createRequestObject({
          url: `${SOURCE_DOMAIN}/ys/${id}`,
          metadata: metadata,
          method: 'GET'
        }))
      }
      return requests
    }
    
    getMangaDetails(data: any, metadata: any): Manga[] {
      let result = JSON.parse(data);

    let mangas = [];
    for (let mangaDetails of result["result"]) {
      mangas.push(createManga({
        id: mangaDetails["id"].toString(),
        titles: mangaDetails["titles"],
        image: mangaDetails["image"] ?? "https://mangadex.org/images/avatars/default1.jpg",
        rating: mangaDetails["rating"],
        status: mangaDetails["status"],
        langFlag: mangaDetails["langFlag"],
        langName: mangaDetails["langName"],
        artist: mangaDetails["artist"],
        author: mangaDetails["author"],
        avgRating: mangaDetails["avgRating"],
        covers: mangaDetails["covers"],
        desc: mangaDetails["description"],
        follows: mangaDetails["follows"],
        tags: [
          createTagSection({
            id: "content",
            label: "Content",
            tags: mangaDetails["content"].map((x: any) => createTag({ id: x["id"].toString(), label: x["value"] }))
          }),
          createTagSection({
            id: "demographic",
            label: "Demographic",
            tags: mangaDetails["demographic"].map((x: any) => createTag({ id: x["id"].toString(), label: x["value"] }))
          }),
          createTagSection({
            id: "format",
            label: "Format",
            tags: mangaDetails["format"].map((x: any) => createTag({ id: x["id"].toString(), label: x["value"] }))
          }),
          createTagSection({
            id: "genre",
            label: "Genre",
            tags: mangaDetails["genre"].map((x: any) => createTag({ id: x["id"].toString(), label: x["value"] }))
          }),
          createTagSection({
            id: "theme",
            label: "Theme",
            tags: mangaDetails["theme"].map((x: any) => createTag({ id: x["id"].toString(), label: x["value"] }))
          })
        ],
        users: mangaDetails["users"],
        views: mangaDetails["views"],
        hentai: mangaDetails["hentai"],
        relatedIds: mangaDetails["relatedIds"],
        lastUpdate: mangaDetails["lastUpdate"]
      }));
    }

    return mangas;
    }
    getChaptersRequest(mangaId: string): Request {
      throw new Error("Method not implemented.")
    }
    getChapters(data: any, metadata: any): Chapter[] {
      throw new Error("Method not implemented.")
    }
    getChapterDetailsRequest(mangaId: string, chapId: string): Request {
      throw new Error("Method not implemented.")
    }
    getChapterDetails(data: any, metadata: any): ChapterDetails {
      throw new Error("Method not implemented.")
    }
    searchRequest(query: SearchRequest): Request {
      throw new Error("Method not implemented.")
    }
    search(data: any, metadata: any): PagedResults {
      throw new Error("Method not implemented.")
    }

}