/**
 * All copy lives here. Facts come from the Stay at Bokkoms Booking.com listing
 * and Facebook page (November 2026) — check them before you go live, and edit
 * them here rather than in the components.
 */
import type {MediaName} from './lib/media';

export type Line = {t: string; i?: boolean};
export type PageId = 'home' | 'stay' | 'gallery' | 'explore' | 'reviews' | 'contact';

export const site = {
  name: 'Stay at Bokkoms',
  short: 'Bokkoms',
  place: 'Paternoster',
  phone: '079 746 2868',
  phoneHref: 'tel:+27797462868',
  whatsapp: 'https://wa.me/27797462868',
  email: 'stayatbokkomsinpaternoster@yahoo.co.za',
  address: ['10 Kriedoring Street', 'Bekbaai, Paternoster', 'Western Cape, 7381'],
  maps: 'https://www.google.com/maps/search/?api=1&query=10+Kriedoring+Street+Bekbaai+Paternoster+7381',
  /** Direct booking engine — the main "Book now" everywhere. Opens in a new tab. */
  book: 'https://book.nightsbridge.com/17491',
  facebook: 'https://www.facebook.com/StayatBokkomsinPaternoster/',
};

/** The pages, in menu order. `href` is relative to the site root. */
export const pages: {id: PageId; href: string; label: string}[] = [
  {id: 'home', href: '', label: 'Home'},
  {id: 'stay', href: 'stay.html', label: 'The Stay'},
  {id: 'gallery', href: 'gallery.html', label: 'Gallery'},
  {id: 'explore', href: 'explore.html', label: 'Paternoster'},
  {id: 'reviews', href: 'reviews.html', label: 'Reviews & Hosts'},
  {id: 'contact', href: 'contact.html', label: 'Book & Contact'},
];

export const socials = [
  {label: 'Facebook', href: site.facebook},
  {label: 'WhatsApp', href: site.whatsapp},
  {label: 'Book online', href: site.book},
];

/* ------------------------------------------------------------------ Home */

export const home = {
  hero: {
    slides: [
      {name: 'house-white', alt: 'The whitewashed gables of Bokkoms against a deep blue West Coast sky'},
      {name: 'house-daisies', alt: 'Bokkoms and neighbouring thatched cottages above a field of spring daisies'},
      {name: 'gulls', alt: 'Gulls landing on the granite rocks at the edge of the Atlantic'},
      {name: 'daisy-path', alt: 'A sandy path through white spring daisies towards the sea'},
    ] as {name: MediaName; alt: string}[],
    lines: [{t: 'Salt air,'}, {t: 'white walls.', i: true}, {t: 'Slow days on the'}, {t: 'West Coast', i: true}] as Line[],
    body: 'A two-bedroom self-catering guest flat in Paternoster — four minutes on foot to Bekbaai Beach, with a private patio and hosts who live just upstairs.',
  },
  /** Each panel has its own photo, so the three read as three different things. */
  panels: {
    items: [
      {id: 'stay', image: 'panel-stay' as MediaName, pos: '58% 50%', alt: 'White thatched cottages above a path through spring daisies', title: ['The', 'Stay'], specs: [['Bedrooms', '2 en-suite'], ['Sleeps', '4 guests']], href: 'stay.html', tint: '#1f4f8f'},
      {id: 'village', image: 'panel-village' as MediaName, pos: '62% 50%', alt: 'The white houses of Paternoster above a rocky bay', title: ['The', 'Village'], specs: [['Bekbaai Beach', '300 m'], ['Cape Columbine', '3.7 km']], href: 'explore.html', tint: '#4d6a3c'},
      {id: 'guests', image: 'panel-beach' as MediaName, pos: '68% 50%', alt: 'A calm beach at Paternoster with granite rocks in the morning mist', title: ['Our', 'Guests'], specs: [['Booking.com', '9.3 / 10'], ['Reviews', '91']], href: 'reviews.html', tint: '#9a5b34'},
    ],
  },
  intro: {
    eyebrow: 'Welcome to Bokkoms',
    title: [{t: 'A home on'}, {t: 'three levels', i: true}] as Line[],
    lede: 'Alvin, an architect, designed Bokkoms on three levels. Your guest flat is the whole ground floor — its own lounge, kitchen and two en-suite bedrooms, opening onto a patio with a braai, hammocks and part sea views.',
    body: 'We live and work upstairs, so we are close by for advice or a hand whenever you need it, and out of the way when you don’t. Bring the dog, too: pets are welcome by prior arrangement.',
  },
  stats: [
    ['9.3', 'Guest rating'],
    ['300 m', 'To Bekbaai Beach'],
    ['2', 'En-suite bedrooms'],
    ['Yes', 'Back-up power'],
  ] as [string, string][],
  quote: {
    text: 'Stunning place, stunning location. Beautiful short walk to the beach in a very quiet area. Only the birds and waves to be heard!',
    by: 'Mj, South Africa',
  },
  duo: [
    {name: 'hammocks' as MediaName, alt: 'Two hammocks strung under the pergola on the patio', caption: 'Hammocks under the pergola'},
    {name: 'patio-view' as MediaName, alt: 'Cobalt-blue bottles on the whitewashed patio wall, with the village and the sea beyond', caption: 'Blue bottles and a glimpse of the sea'},
  ],
};

/* ------------------------------------------------------------------ Stay */

export const stay = {
  hero: {
    image: 'lounge' as MediaName,
    alt: 'The guest lounge with a wicker sofa, wooden floors and colourful art on whitewashed walls',
    eyebrow: '02 — The Stay',
    lines: [{t: 'Your own'}, {t: 'ground floor', i: true}, {t: 'by the sea.'}] as Line[],
    body: 'Two en-suite bedrooms, a lounge and kitchen of your own, and a private patio with a braai and hammocks.',
  },
  facts: [
    ['Sleeps', '4 guests'],
    ['Bedrooms', '1 double, 1 twin'],
    ['Bathrooms', '2 en-suite'],
    ['Kitchen', 'Fully equipped'],
    ['Wi-Fi', 'Free'],
    ['Parking', 'Free, on site'],
  ] as [string, string][],
  rooms: [
    {
      name: 'bedroom-1' as MediaName,
      alt: 'Bedroom one: a double bed on wooden floors, with a desk and an arched alcove',
      kicker: 'Bedroom one',
      title: [{t: 'Double bed,'}, {t: 'own bathroom', i: true}] as Line[],
      text: 'A full-size double bed made up with good linen, its own en-suite bathroom, an internet TV and a table to work at. Patio doors open straight onto the garden.',
    },
    {
      name: 'bedroom-2' as MediaName,
      alt: 'Bedroom two: two single beds with patterned covers and a window to the garden',
      kicker: 'Bedroom two',
      title: [{t: 'Two singles,'}, {t: 'garden doors', i: true}] as Line[],
      text: 'Two single beds, an en-suite bathroom, internet TV and a work table — with its own door out to the patio, so early risers can slip out to the sea.',
    },
    {
      name: 'kitchen' as MediaName,
      alt: 'The guest kitchen with wooden counters, open shelves and a dining table',
      kicker: 'Lounge & kitchen',
      title: [{t: 'Cook the'}, {t: 'catch of the day', i: true}] as Line[],
      text: 'A private lounge and dining area, and a fully equipped kitchen: fridge, microwave, kettle, hob, toaster, crockery and cleaning materials — everything for slow breakfasts and long seafood suppers.',
    },
    {
      name: 'hammocks-2' as MediaName,
      alt: 'The private patio with a wooden table, hammocks and the garden beyond',
      kicker: 'Patio & braai',
      title: [{t: 'Outside is'}, {t: 'the best room', i: true}] as Line[],
      text: 'Your private patio has a braai, a fire bowl, an outdoor table, hammocks under the pergola, a garden and part sea views over the fynbos.',
    },
  ],
  amenities: [
    {icon: 'wifi', label: 'Free Wi-Fi'},
    {icon: 'car', label: 'Free private parking'},
    {icon: 'zap', label: 'Back-up power'},
    {icon: 'flame', label: 'Braai & fire bowl'},
    {icon: 'utensils', label: 'Equipped kitchen'},
    {icon: 'bath', label: 'Two en-suite bathrooms'},
    {icon: 'bed', label: 'Linen & towels'},
    {icon: 'tv', label: 'Internet TV in each room'},
    {icon: 'laptop', label: 'Work tables'},
    {icon: 'waves', label: 'Part sea views'},
    {icon: 'leaf', label: 'Garden & patio'},
    {icon: 'paw', label: 'Pets on request'},
    {icon: 'bike', label: 'Bike hire'},
    {icon: 'sparkle', label: 'Free toiletries'},
    {icon: 'key', label: 'Private check-in'},
    {icon: 'smokeOff', label: 'Non-smoking'},
  ] as {icon: IconName; label: string}[],
  rules: [
    ['Check-in', '14:00 – 19:00. Please let us know your arrival time in advance.'],
    ['Check-out', '09:00 – 10:00.'],
    ['Pets', 'Welcome by prior arrangement, at no extra charge.'],
    ['Children', 'All ages welcome. We don’t have cots or extra beds.'],
    ['Check-in age', 'The person checking in must be 18 or older.'],
    ['Smoking & parties', 'No smoking indoors, and no parties or events.'],
  ] as [string, string][],
  notes: [
    'We live in the floors above. The flat shares a front entrance with our home, and a flight of stairs leads down from the front door to your lounge.',
    'Bokkoms has back-up power, so load-shedding won’t leave you in the dark.',
    'The West Coast is water-wise country — please help us use water sparingly.',
  ],
};

export type IconName =
  | 'wifi' | 'car' | 'zap' | 'flame' | 'utensils' | 'bath' | 'bed' | 'tv' | 'laptop' | 'waves'
  | 'leaf' | 'paw' | 'bike' | 'sparkle' | 'key' | 'smokeOff' | 'phone' | 'mail' | 'pin'
  | 'chat' | 'arrowRight' | 'arrowLeft' | 'arrowUpRight' | 'close' | 'clock' | 'star' | 'calendar';

/* --------------------------------------------------------------- Gallery */

export type Shot = {name: MediaName; alt: string; tag: 'inside' | 'outside' | 'village'};

export const gallery = {
  eyebrow: '03 — Gallery',
  title: [{t: 'Have a'}, {t: 'look around.', i: true}] as Line[],
  filters: [
    {id: 'all', label: 'Everything'},
    {id: 'inside', label: 'Inside'},
    {id: 'outside', label: 'Patio & garden'},
    {id: 'village', label: 'Paternoster'},
  ] as const,
  shots: [
    {name: 'house-white', alt: 'The white gables of Bokkoms against a blue sky', tag: 'outside'},
    {name: 'panel-village', alt: 'The white houses of Paternoster above a rocky bay', tag: 'village'},
    {name: 'panel-stay', alt: 'White thatched cottages above a path through spring daisies', tag: 'village'},
    {name: 'panel-beach', alt: 'A calm beach with granite rocks in the morning mist', tag: 'village'},
    {name: 'bedroom-1', alt: 'Bedroom one with a double bed and desk', tag: 'inside'},
    {name: 'hammocks', alt: 'Hammocks and a table on the patio under the pergola', tag: 'outside'},
    {name: 'lounge', alt: 'The lounge with wicker sofa and colourful paintings', tag: 'inside'},
    {name: 'rocks', alt: 'Granite boulders in calm, clear water at the shore', tag: 'village'},
    {name: 'bedroom-2', alt: 'Bedroom two with two single beds', tag: 'inside'},
    {name: 'firepit', alt: 'The fire bowl on the stone patio', tag: 'outside'},
    {name: 'alcove-room', alt: 'A reading chair by the arched alcove and garden window', tag: 'inside'},
    {name: 'library', alt: 'A wall of books beside the staircase', tag: 'inside'},
    {name: 'house-daisies', alt: 'Bokkoms above a field of spring daisies', tag: 'village'},
    {name: 'kitchen', alt: 'The guest kitchen and dining table', tag: 'inside'},
    {name: 'patio-view', alt: 'Blue bottles on the patio wall with the village beyond', tag: 'outside'},
    {name: 'windsurfer', alt: 'A windsurfer jumping a wave off Paternoster', tag: 'village'},
    {name: 'stairs-art', alt: 'Stairs and a portrait painting in the passage', tag: 'inside'},
    {name: 'pergola', alt: 'Striped shade from the pergola on the whitewashed patio', tag: 'outside'},
    {name: 'gulls', alt: 'Gulls landing on coastal rocks', tag: 'village'},
    {name: 'bathroom', alt: 'An en-suite bathroom with slate tiles', tag: 'inside'},
    {name: 'patio-table', alt: 'The outdoor table in the striped shade of the patio', tag: 'outside'},
    {name: 'hammocks-2', alt: 'Hammocks in the dappled light of the pergola', tag: 'outside'},
    {name: 'daisy-path', alt: 'A path through white spring daisies', tag: 'village'},
    {name: 'kitchen-table', alt: 'The kitchen table and shelves of books', tag: 'inside'},
    {name: 'picnic-table', alt: 'A wooden table on the shaded side patio', tag: 'outside'},
    {name: 'coast', alt: 'Fynbos running down to the coastline', tag: 'village'},
    {name: 'reading-chair', alt: 'A reading chair below shelves of books', tag: 'inside'},
    {name: 'entrance', alt: 'The wooden front door and entrance hall', tag: 'inside'},
    {name: 'dog-daisies', alt: 'A black and white dog running through a meadow of daisies', tag: 'village'},
    {name: 'passage', alt: 'The passage with wooden floors and steps', tag: 'inside'},
    {name: 'aerial', alt: 'Bokkoms seen from above among the white houses of Paternoster', tag: 'village'},
    {name: 'kitchen-shelves', alt: 'Kitchen shelves with crockery, microwave and kettle', tag: 'inside'},
    {name: 'gate', alt: 'The front gate and garage with the Bokkoms sign', tag: 'outside'},
    {name: 'fynbos-sea', alt: 'Yellow wild flowers in the fynbos with the sea behind', tag: 'village'},
    {name: 'library-stairs', alt: 'The staircase lined with bookshelves', tag: 'inside'},
    {name: 'window', alt: 'Morning light through a window onto the garden', tag: 'inside'},
    {name: 'dog-flowers', alt: 'A happy dog among the spring flowers', tag: 'village'},
    {name: 'embroidery', alt: 'An embroidered cloth with blue and red flowers', tag: 'inside'},
    {name: 'stair-down', alt: 'Steps leading down to the guest flat', tag: 'inside'},
    {name: 'kitchenette', alt: 'Kitchen counter with wooden shelves', tag: 'inside'},
    {name: 'bed-detail', alt: 'A double bed with patterned linen', tag: 'inside'},
    {name: 'bathroom-2', alt: 'A round basin in the second en-suite bathroom', tag: 'inside'},
    {name: 'guestbook', alt: 'A page of the Bokkoms guestbook with a drawing of the lighthouse', tag: 'inside'},
  ] as Shot[],
};

/* --------------------------------------------------------------- Explore */

export const explore = {
  hero: {
    image: 'fynbos-sea' as MediaName,
    alt: 'Yellow wild flowers and fynbos running down to the Atlantic near Paternoster',
    eyebrow: '04 — Paternoster',
    lines: [{t: 'A whitewashed'}, {t: 'fishing village', i: true}, {t: 'on the'}, {t: 'Atlantic', i: true}] as Line[],
    body: 'White cottages, fishing boats on the beach, protected coast and some of the best food on the West Coast — all a short walk from the door.',
  },
  intro: {
    title: [{t: 'Whitewashed'}, {t: 'and wind-swept', i: true}] as Line[],
    lede: 'Paternoster is one of the oldest fishing villages on South Africa’s West Coast. Its white houses will remind you of a Greek island; its beaches, rocks and fynbos are pure Atlantic.',
    body: 'Bokkoms sits in Bekbaai, a quiet corner of the village where the loudest things are the birds and the waves. Walk to the beach, walk to dinner, and leave the car in the drive.',
  },
  nearby: [
    {group: 'Beaches', items: [['Bekbaai Beach', '300 m'], ['Paternoster Main Beach', '650 m']]},
    {group: 'Eat', items: [['De See Kat', '300 m'], ['Gaaitjie', '600 m'], ['Wolfgat', '600 m']]},
    {group: 'Nature & sights', items: [['Cape Columbine Nature Reserve', '3.7 km'], ['Paternoster Rock Island Reserve', '11 km'], ['Vasco da Gama Monument, St Helena Bay', '15 km']]},
  ] as {group: string; items: [string, string][]}[],
  things: [
    {name: 'coast' as MediaName, alt: 'The coastal path through fynbos above the sea', title: 'Walk the coast', text: 'Follow the shoreline into Cape Columbine Nature Reserve, with its lighthouse, granite outcrops and hidden coves.'},
    {name: 'gulls' as MediaName, alt: 'Gulls landing on the rocks', title: 'Watch the birds', text: 'Gulls, cormorants and oystercatchers work the rocks and the tideline. Bring binoculars.'},
    {name: 'windsurfer' as MediaName, alt: 'A windsurfer in the surf off Paternoster', title: 'Catch the wind', text: 'The steady West Coast wind makes Paternoster a favourite with windsurfers and kiters.'},
    {name: 'daisy-path' as MediaName, alt: 'White spring daisies in flower', title: 'Spring flowers', text: 'From late winter into spring the veld around the village turns white, orange and gold with wild flowers.'},
    {name: 'rocks' as MediaName, alt: 'Boulders in clear rock-pool water', title: 'Rock pools & photographs', text: 'Clear water, smooth granite and long golden evenings — a gift for photographers.'},
    {name: 'house-daisies' as MediaName, alt: 'Whitewashed cottages above the flowers', title: 'Village life', text: 'Wander the white lanes, buy fish off the boats, browse the galleries and stop for coffee.'},
  ],
  getting: {
    title: [{t: 'Getting'}, {t: 'here', i: true}] as Line[],
    text: 'Paternoster is about 150 km north of Cape Town — roughly two hours by car along the R27 West Coast road, turning off through Vredenburg. Free private parking waits at the door.',
  },
};

/* --------------------------------------------------------------- Reviews */

export const reviews = {
  eyebrow: '05 — Reviews & Hosts',
  title: [{t: 'Wonderful,'}, {t: 'say our'}, {t: 'guests.', i: true}] as Line[],
  score: '9.3',
  scoreLabel: 'Wonderful · 91 reviews on Booking.com',
  award: {score: '4.7 / 5', text: 'LekkeSlaap Certificate of Excellence, 2025'},
  categories: [
    ['Cleanliness', 9.7],
    ['Staff', 9.6],
    ['Value for money', 9.6],
    ['Facilities', 9.5],
    ['Location', 9.5],
    ['Comfort', 9.4],
    ['Free Wi-Fi', 8.3],
  ] as [string, number][],
  quotes: [
    {text: 'If you need to visit a space where home, rest and heaven-on-earth meet, please book a Stay at Bokkoms! Paternoster is beautiful, but this home is a home where the beauty meets you on the inside. The Roon Family are amazing people, and Amanda is an incredible host. We also loved that animals (of all shapes and sizes) were welcome.', by: 'Anina', from: 'Google review'},
    {text: 'Amanda is a great host. She has had the property for years, and has it very well equipped. It is extremely spacious, especially for the price. There is a pleasant place to sit outside.', by: 'Colin', from: 'Canada'},
    {text: 'Stunning place, stunning location. Beautiful short walk to the beach in a very quiet area. Only the birds and waves to be heard! Pet friendly stay was an added bonus.', by: 'Mj', from: 'South Africa'},
    {text: 'Comfortable and spacious with everything needed to make our stay a stay to remember.', by: 'Fantie', from: 'South Africa'},
    {text: 'Beautifully decorated, comfortable and very clean. Friendly and welcoming host. Close to the beach. Hangmats.', by: 'Alisha', from: 'Australia'},
    {text: 'We liked everything! The hosts are very friendly. The beds were comfortable with lovely bedding, also the towels are good quality too. The outside braai area is good too, with a sea view. I will definitely go stay again 100%.', by: 'T&A', from: 'South Africa'},
    {text: 'Large bedroom & comfortable bed. Nice outside braai area. Located close to new waterfront. Friendly hosts. Homely touches.', by: 'Hilton', from: 'South Africa'},
    {text: 'Hosts were welcoming and friendly, shared some thoughts and had a mutual conversation. Accommodation catered for our needs and venue cosy.', by: 'Lionel', from: 'South Africa'},
    {text: 'Everything. It was a beautiful place to call home for two days.', by: 'Leanne', from: 'South Africa'},
    {text: 'A lovely home, comfortable and cozy and hosts were helpful and friendly.', by: 'Helin', from: 'South Africa'},
    {text: 'En-suite rooms with individual TVs. Location to the beach.', by: 'Leigh', from: 'South Africa'},
  ],
  hosts: {
    eyebrow: 'Your hosts',
    title: [{t: 'Meet Alvin'}, {t: '& Amanda', i: true}] as Line[],
    lede: 'Alvin and Amanda live permanently in Paternoster and are passionate about the village and, above all, its natural surroundings.',
    body: [
      'Alvin is an architect: he designed Bokkoms, built on three levels, and runs his practice from here. Amanda is a qualified leadership coach and is training as an accredited Pilates instructor.',
      'Because we live and work at Bokkoms, we are around for advice or assistance whenever you need it — in Afrikaans, English or Dutch.',
    ],
    image: 'stairs-art' as MediaName,
    imageAlt: 'The staircase at Bokkoms with a painted portrait on the whitewashed wall',
  },
  guestbook: {
    image: 'guestbook' as MediaName,
    alt: 'A handwritten page of the Bokkoms guestbook with a sketch of the Cape Columbine lighthouse',
    caption: 'From our guestbook — thank-you notes, drawings and the odd paw print.',
  },
};

/* --------------------------------------------------------------- Contact */

export const contact = {
  hero: {
    image: 'aerial' as MediaName,
    alt: 'Bokkoms seen from above, among the white houses of Paternoster with the sea beyond',
    eyebrow: '06 — Book & Contact',
    lines: [{t: 'Come and'}, {t: 'stay a while.', i: true}] as Line[],
    body: 'Check dates and book directly with us online, or send us a WhatsApp. Either way, we’ll be here to welcome you.',
  },
};
