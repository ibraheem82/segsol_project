export async function home(req, res) {
  res.render('pages/index.njk', {
    title: 'Home',
      description: 'SegSol IT Solutions — Empowering Businesses, Securing Futures.',
    location: process.env.ORG_LOCATION || 'Lagos',
    phone: process.env.ORG_PHONE || '+234-813-000-0000',
    email: process.env.ORG_EMAIL || 'info@segsol.com'
  });
}

export async function about(req, res) {
  res.render('pages/about.njk', {
    title: 'About Us - SEGSOL IT Solutions',
    description: 'Learn about SegSol IT Solutions, our mission, values, and commitment to delivering cutting-edge IT security and data management solutions in Nigeria.',
    location: process.env.ORG_LOCATION || 'Lagos',
    phone: process.env.ORG_PHONE || '+234-813-000-0000',
    email: process.env.ORG_EMAIL || 'info@segsol.com'
  });
}
export async function contact(req, res) {
  res.render('pages/contact.njk', {
    title: 'Contact Us - SEGSOL IT Solutions',
    description: 'Get in touch with SegSol IT Solutions. Contact us for IT security, data management, and technology solutions in Nigeria.',
    location: process.env.ORG_LOCATION || 'Lagos',
    phone: process.env.ORG_PHONE || '+234-813-000-0000',
    email: process.env.ORG_EMAIL || 'info@segsol.com'
  });
}