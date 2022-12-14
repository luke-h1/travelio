const siteUrl = process.env.NEXT_PUBLIC_URL;

function getPolicies() {
  switch (siteUrl) {
    case 'yo':
    case 'yoo':
      return [{ userAgent: '*', allow: '/' }];

    default:
      return [{ userAgent: 'Googlebot', disallow: '/' }];
  }
}

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: getPolicies(),
    additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
  },
};
