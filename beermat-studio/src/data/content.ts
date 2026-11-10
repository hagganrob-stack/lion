export const faqs = [
  {
    q: 'Can my staff add events without me?',
    a: 'Yes. That is the whole point. Anyone on your team can open the form on their phone, add the event name, date, time and a line about it, and it shows on your website straight away. You never need to ring me.',
  },
  {
    q: 'Do I need to be technical?',
    a: 'No. If you can fill in an online form, you can run your website. There are no logins and no website editor to learn.',
  },
  {
    q: 'Can I change the menu?',
    a: 'Yes. Your menu is built to be changed when your food and drinks change, so it never ends up as a PDF from two summers ago. I will show you how it works when your site goes live.',
  },
  {
    q: 'Do I own the site?',
    a: 'Once your plan ends, the site is yours. Hosting, domain and SSL are included while you are on the plan. After that you can look after it yourself, or keep hosting and support with me for £29 a month.',
  },
  {
    q: 'How long does it take?',
    a: 'Usually 3 to 6 weeks. The biggest factor is how quickly we get your photos, menu and opening hours together, so a quick call at the start saves a lot of time.',
  },
  {
    q: 'I already have a website or domain. Can you move it?',
    a: 'Yes. Keep your domain and I will point it at the new site, so your regulars find you at the same address. Tell me what you have on the call and I will sort the rest.',
  },
  {
    q: 'Do you do pub groups?',
    a: 'Yes. The Pub Group plan gives you a page for each pub and an events calendar for each pub, all on one website. Keep Calm & Beer It is a group of three pubs running on exactly this set-up.',
  },
];

export const problemChecks = [
  'What’s on tonight',
  'The food menu',
  'Opening hours',
  'How to book',
  'Where to park',
];

export const includes = [
  {
    title: 'A what’s on calendar',
    text: 'Add events with a simple Google Form on your phone. They show on your site straight away and drop off once they have passed.',
  },
  {
    title: 'A menu you can edit',
    text: 'Change dishes and prices when your menu changes, without waiting for a web designer.',
  },
  {
    title: 'A book-a-table link',
    text: 'A clear button that takes people to your own booking link, so no one has to ring to ask.',
  },
  {
    title: 'Opening hours and a map',
    text: 'Hours, address and a map people can tap for directions, with a note on parking if you want one.',
  },
  {
    title: 'Google Business Profile set up properly',
    text: 'So you show up the right way on Google Maps and in search.',
  },
  {
    title: 'Fast on a pub-garden 4G signal',
    text: 'Built light, so it loads quickly on a phone even when the signal in the beer garden is patchy.',
  },
  {
    title: 'Built for local search',
    text: 'Set up so people searching for a “pub near me” or your town can find you.',
  },
];

export const tiers = [
  {
    id: 'snug',
    name: 'The Snug',
    blurb: 'One pub, up and running with everything it needs.',
    upfront: '£250',
    monthly: '£39',
    term: '12 months',
    oneOff: null,
    featured: false,
    lead: null,
    features: [
      'Up to 3 pages',
      'What’s on calendar (Google Form)',
      'Opening hours and map',
      'On-page SEO',
      'GA4 and Search Console set up',
      'Hosting, domain and SSL included during the plan',
    ],
  },
  {
    id: 'local',
    name: 'The Local',
    blurb: 'For the pub that wants to be found and booked.',
    upfront: '£350',
    monthly: '£45',
    term: '24 months',
    oneOff: '£1,200',
    featured: true,
    lead: 'Everything in The Snug, plus',
    features: [
      'Up to 5 pages',
      'Copy written for you',
      'Google Business Profile setup and optimisation',
      'A news and blog section',
      'Image optimisation',
      'A custom email address',
    ],
  },
  {
    id: 'group',
    name: 'The Pub Group',
    blurb: 'For landlords and groups with more than one pub.',
    upfront: '£500',
    monthly: '£69',
    term: '24 months',
    oneOff: '£2,000',
    featured: false,
    lead: null,
    features: [
      'Up to 10 pages',
      'A page for each pub',
      'Events calendar for each pub',
      'Full copywriting',
      'SEO strategy',
      'Conversion tracking',
      'A video walkthrough',
    ],
  },
];

export const caseStudy = {
  name: 'Keep Calm & Beer It',
  pubs: ['The Builders Arms', 'The Hope Tavern', 'The Bowling Green'],
  /**
   * Screenshot slots. Drop a file with the matching name into src/assets/case-study/
   * (png, jpg, webp or avif) and it appears on the page. See README.
   */
  slots: [
    { file: 'desktop-home', kind: 'desktop', alt: 'The Keep Calm & Beer It website on a desktop screen.' },
    { file: 'mobile-home', kind: 'mobile', alt: 'The Keep Calm & Beer It home page on a phone.' },
    { file: 'mobile-events', kind: 'mobile', alt: 'A pub events page from the Keep Calm & Beer It website on a phone.' },
  ],
};
