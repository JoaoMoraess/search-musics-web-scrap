import { LoadNotSavedVideos } from '@/application/contracts'
import { LoadLocalRepository, SaveLocalRepository } from '@/domain/contracts'
import puppeteer from 'puppeteer'

export class AccessYoutube implements LoadNotSavedVideos {
  constructor (
    private readonly videoUrlsRepo: SaveLocalRepository & LoadLocalRepository,
    private readonly videoNamesRepo: SaveLocalRepository & LoadLocalRepository,
    private readonly videoSearchStringsRepo: SaveLocalRepository & LoadLocalRepository
  ) {}

  async perform (searchStrings: string[]): Promise<void> {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    const videoUrls = []
    const videoNames = []
    const videoSearchStrings = []

    for (const string of searchStrings) {
      let searchVideos = []
      await page.goto('https://youtube.com')

      await page.waitForSelector('input[id=search]')
      await page.type('input[id=search]', string)
      await page.click('button[id=search-icon-legacy]')

      await page.waitForSelector('.yt-simple-endpoint.style-scope.ytd-toggle-button-renderer')
      const filterButton = await page.$('.yt-simple-endpoint.style-scope.ytd-toggle-button-renderer')
      await filterButton?.click()
      await page.waitForSelector('.yt-simple-endpoint.style-scope.ytd-search-filter-renderer')
      const fourMinTime = await page.$$('.yt-simple-endpoint.style-scope.ytd-search-filter-renderer')
      await fourMinTime[9]?.click()

      await page.waitForSelector('#search-clear-button')
      const clearSearchButtons = await page.$$('#search-clear-button')

      await clearSearchButtons[0].click()

      await page.waitForSelector('ytd-thumbnail.ytd-video-renderer')

      await page.waitForSelector('a[id=video-title]')

      searchVideos = await page.$$eval('a[id=video-title]', el => el
        .filter(x => !x.getAttribute('title')?.toLowerCase()?.includes('ao vivo'))
        .filter(x => !x.getAttribute('title')?.toLowerCase()?.includes('remix'))
        .filter(x => !x.getAttribute('title')?.toLowerCase()?.includes('programa'))
        .filter(x => !x.getAttribute('title')?.toLowerCase()?.includes('karaokê'))
        .filter(x => !x.getAttribute('title')?.toLowerCase()?.includes('karaoke'))
        .map(x => ({ url: x.getAttribute('href'), name: x.getAttribute('title') })))

      const video = searchVideos[0]

      videoUrls.push(`https://www.youtube.com${video.url}`)
      videoNames.push(video.name!)
      videoSearchStrings.push(string)

      const savedUrls = await this.videoUrlsRepo.load()
      await this.videoUrlsRepo.save([...new Set([...videoUrls, ...savedUrls])])
      const savedNames = await this.videoNamesRepo.load()
      await this.videoNamesRepo.save([...new Set([...videoNames, ...savedNames])])
      const savedSearchStrings = await this.videoSearchStringsRepo.load()
      await this.videoSearchStringsRepo.save([...new Set([...videoSearchStrings, ...savedSearchStrings])])

      console.log(`Saving ${video.name} | ${(100 * videoUrls.length / searchStrings.length).toFixed(2)}%`)
    }
    await browser.close()
    console.log('-------------------------FIM-------------------------')
  }
}
