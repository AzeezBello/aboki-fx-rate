const PRISMIC_API_URL = 'https://abokifxrate.cdn.prismic.io/api/v2'

const NEWS_URL = 'nigeriannews-nigeriannewspapers'


const DEFAULT_SEO = {
    title: 'AbokiFX Rate | Your Daily Naira to Dollar Exchange Rate',
    description: 'The most trusted Naira to Dollar exchange rates platform. Get free daily dollar rate, convert foreign currencies including Naira to cedi, Naira to Pounds, with live foreign exchange rate calculator on AbokiFX.',
    openGraph: {
      type: 'website',
      locale: 'en_IE',
      url: 'https://abokifxrate.com',
      title: 'AbokiFX Rate | Your Daily Naira to Dollar Exchange Rate',
      description: 'The most trusted Naira to Dollar exchange rates platform. Get free daily dollar rate, convert foreign currencies including Naira to cedi, Naira to Pounds, with live foreign exchange rate calculator on AbokiFX.',
      image:
        '/static/assets/android-chrome-512x512.png',
      site_name: 'abokifxrate.com',
      imageWidth: 512,
      imageHeight: 512
    },
    twitter: {
      handle: '@AbokifxR',
      cardType: 'summary_large_image'
    }
  };

module.exports = {DEFAULT_SEO, PRISMIC_API_URL, NEWS_URL}

