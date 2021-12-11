import { LoadLocalRepository, SaveLocalRepository } from '@/domain/contracts'
import puppeteer from 'puppeteer'

export class AccessYoutube {
  constructor (
    private readonly videoUrlsRepo: SaveLocalRepository & LoadLocalRepository,
    private readonly videoNamesRepo: SaveLocalRepository & LoadLocalRepository,
    private readonly videoSearchStringsRepo: SaveLocalRepository & LoadLocalRepository
  ) {}

  async perform (searchStrings: string[]): Promise<void> {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    const videoUrls = []
    const videoNames = []
    const videoSearchStrings = []

    for (const string of searchStrings) {
      await page.goto('https://youtube.com')
      await page.type('input[id=search]', string)
      await page.click('button[id=search-icon-legacy]')

      await page.waitForSelector('.yt-simple-endpoint.style-scope.ytd-toggle-button-renderer')

      const filterButton = await page.$('.yt-simple-endpoint.style-scope.ytd-toggle-button-renderer')

      filterButton?.click()

      await page.waitForSelector('.yt-simple-endpoint.style-scope.ytd-search-filter-renderer')
      const fourMinTime = await page.$$('.yt-simple-endpoint.style-scope.ytd-search-filter-renderer')

      fourMinTime[9]?.click()

      await page.waitForSelector('a[id=video-title]')

      const videoUrl = await page.$$eval('a[id=video-title]', el => el
        .filter(x => !x.getAttribute('title')?.toLowerCase()?.includes('ao vivo'))
        .filter(x => !x.getAttribute('title')?.toLowerCase()?.includes('remix'))
        .map(x => x.getAttribute('href')))

      const videoName = await page.$$eval('a[id=video-title]', el => el
        .filter(x => !x.getAttribute('title')?.toLowerCase()?.includes('ao vivo'))
        .filter(x => !x.getAttribute('title')?.toLowerCase()?.includes('remix'))
        .map(x => x.getAttribute('title')))

      videoUrls.push(`https://www.youtube.com${videoUrl[0]}`)
      videoNames.push(`${videoName[0]}`)
      videoSearchStrings.push(string)

      const savedUrls = await this.videoUrlsRepo.load()
      await this.videoUrlsRepo.save([...new Set([...videoUrls, ...savedUrls])])
      const savedNames = await this.videoNamesRepo.load()
      await this.videoNamesRepo.save([...new Set([...videoNames, ...savedNames])])
      const savedSearchStrings = await this.videoSearchStringsRepo.load()
      await this.videoSearchStringsRepo.save([...new Set([...videoSearchStrings, ...savedSearchStrings])])

      console.log(`Saving ${videoName} | ${(100 * videoUrls.length / searchStrings.length).toFixed(2)}%`)
    }
    await browser.close()
    console.log('-------------------------FIM-------------------------')
  }
}
