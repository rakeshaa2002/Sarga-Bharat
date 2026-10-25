/**
 * Company information shown across the site.
 *
 * Name, monogram and taglines come from the Sarga Bharath Industries logo. The bearing portfolio
 * is in bearings.ts. Phone and email were carried over from an earlier version of this site and should be
 * confirmed before launch. Do not add claims (years in
 * business, certifications, customer names, statistics) unless they have been confirmed by the company.
 */

export const company = {
  name: 'Sarga Bharath Industries Pvt. Ltd.',
  shortName: 'Sarga Bharath',
  // taglines as written on the logo
  motto: 'From Indian to Indians',
  tagline: 'Make in India | Built for the World',
  // company statements, in the company's own words
  philosophy: 'Indian Roots. Shared Growth. Global Impact.',
  vision: 'To build a stronger India by empowering Indian manufacturers and taking Indian excellence to the world.',
  mission:
    'To bridge the gap between Indian manufacturers and global opportunities through trusted partnerships, quality solutions, and lasting relationships.',
  values:
    'We believe in integrity, trust, quality, innovation, and collective growth—creating value for every partner and progress for every generation.',
  location: 'Bengaluru',
  email: {
    display: 'ramannasanthosh.8@gmail.com',
    href: 'mailto:ramannasanthosh.8@gmail.com',
  },
  offices: [
    {
      title: 'Office (Bengaluru)',
      city: 'Bengaluru',
      lines: [
        '19th Cross, Chikkabidarakallu',
        'Nagasandra',
        'Bengaluru 560073, Karnataka, India',
      ],
      mapUrl: 'https://maps.google.com/?q=19th+Cross+Chikkabidarakallu+Nagasandra+Bengaluru+560073',
    },
  ],
  phone: {
    display: '+91 96325 56494',
    href: 'tel:+919632556494',
  },
  whatsapp: {
    display: '+91 96325 56494',
    /** international format without "+" or spaces, as wa.me expects */
    number: '919632556494',
  },
} as const

/** Opens a WhatsApp chat with the sales team, optionally with a pre-filled message. */
export const whatsappLink = (message = 'Hello Sarga Bharath Industries, I would like to enquire about bearings.') =>
  `https://wa.me/${company.whatsapp.number}?text=${encodeURIComponent(message)}`
