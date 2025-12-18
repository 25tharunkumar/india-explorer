export interface FamousPlace {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface Event {
  id: string;
  title: string;
  location: string;
  district: string;
  startDate: string;
  endDate: string;
  time: string;
  type: 'Culture' | 'Food' | 'Adventure' | 'Historic' | 'Tech';
  description: string;
}

export interface District {
  name: string;
  events: Event[];
  attractions: FamousPlace[];
}

export interface State {
  id: string;
  name: string;
  capital: string;
  image: string;
  description: string;
  famousPlaces: FamousPlace[];
  events: Event[];
  districts: District[];
}

export const statesData: State[] = [
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    capital: 'Chennai',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop',
    description: 'Tamil Nadu, the land of temples and classical arts, showcases a rich cultural heritage spanning thousands of years. From the magnificent Dravidian temples to the serene beaches of Marina, this southern state captivates visitors with its timeless traditions.',
    famousPlaces: [
      { id: 'meenakshi', name: 'Meenakshi Temple', image: 'https://images.unsplash.com/photo-1621496503717-095a20dcc503?w=600&auto=format&fit=crop', description: 'Ancient temple with stunning gopurams' },
      { id: 'marina', name: 'Marina Beach', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&auto=format&fit=crop', description: "World's second longest urban beach" },
      { id: 'mahabalipuram', name: 'Mahabalipuram', image: 'https://images.unsplash.com/photo-1600100396778-b0e8c9a2c63b?w=600&auto=format&fit=crop', description: 'UNESCO World Heritage shore temples' },
    ],
    events: [
      { id: 'tn-1', title: 'Pongal Festival', location: 'Chennai', district: 'Chennai', startDate: '2025-01-14', endDate: '2025-01-17', time: '06:00 AM', type: 'Culture', description: 'Harvest festival celebrations' },
      { id: 'tn-2', title: 'Chennai Music Season', location: 'Music Academy', district: 'Chennai', startDate: '2025-12-15', endDate: '2025-01-15', time: '05:00 PM', type: 'Culture', description: 'Classical music and dance festival' },
      { id: 'tn-3', title: 'Tech Summit 2025', location: 'Chennai Trade Centre', district: 'Chennai', startDate: '2025-03-10', endDate: '2025-03-12', time: '09:00 AM', type: 'Tech', description: 'Annual technology conference' },
    ],
    districts: [
      { name: 'Chennai', events: [], attractions: [] },
      { name: 'Madurai', events: [], attractions: [] },
      { name: 'Coimbatore', events: [], attractions: [] },
    ],
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    capital: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&auto=format&fit=crop',
    description: 'Karnataka blends ancient heritage with modern innovation. From the ruins of Hampi to the tech hubs of Bangalore, this diverse state offers royal palaces, coffee plantations, and coastal beauty.',
    famousPlaces: [
      { id: 'mysore-palace', name: 'Mysore Palace', image: 'https://images.unsplash.com/photo-1600100397608-e1a5c9ea0d40?w=600&auto=format&fit=crop', description: 'Magnificent royal palace' },
      { id: 'hampi', name: 'Hampi', image: 'https://images.unsplash.com/photo-1600100396778-b0e8c9a2c63b?w=600&auto=format&fit=crop', description: 'UNESCO World Heritage ruins' },
      { id: 'coorg', name: 'Coorg', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop', description: 'Scotland of India' },
    ],
    events: [
      { id: 'ka-1', title: 'Mysore Dasara', location: 'Mysore', district: 'Mysore', startDate: '2025-10-01', endDate: '2025-10-10', time: '07:00 PM', type: 'Culture', description: 'Grand royal festival' },
      { id: 'ka-2', title: 'Bangalore Tech Week', location: 'BIEC', district: 'Bangalore', startDate: '2025-11-15', endDate: '2025-11-20', time: '10:00 AM', type: 'Tech', description: 'Tech innovation showcase' },
    ],
    districts: [
      { name: 'Bangalore', events: [], attractions: [] },
      { name: 'Mysore', events: [], attractions: [] },
    ],
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    capital: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&auto=format&fit=crop',
    description: 'Maharashtra, home to Mumbai, the city of dreams, offers a vibrant mix of Bollywood glamour, ancient caves, hill stations, and the spiritual heart of India at Shirdi.',
    famousPlaces: [
      { id: 'gateway', name: 'Gateway of India', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&auto=format&fit=crop', description: 'Iconic Mumbai landmark' },
      { id: 'ajanta', name: 'Ajanta Caves', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&auto=format&fit=crop', description: 'Ancient Buddhist caves' },
      { id: 'lonavala', name: 'Lonavala', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop', description: 'Popular hill station' },
    ],
    events: [
      { id: 'mh-1', title: 'Ganesh Chaturthi', location: 'Mumbai', district: 'Mumbai', startDate: '2025-08-27', endDate: '2025-09-06', time: '06:00 AM', type: 'Culture', description: 'Grand Ganpati festival' },
      { id: 'mh-2', title: 'Mumbai Food Festival', location: 'BKC', district: 'Mumbai', startDate: '2025-02-14', endDate: '2025-02-16', time: '12:00 PM', type: 'Food', description: 'Culinary extravaganza' },
    ],
    districts: [
      { name: 'Mumbai', events: [], attractions: [] },
      { name: 'Pune', events: [], attractions: [] },
    ],
  },
  {
    id: 'delhi',
    name: 'Delhi',
    capital: 'New Delhi',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop',
    description: 'Delhi, the capital territory, seamlessly blends Mughal grandeur with modern governance. From the Red Fort to India Gate, every corner tells a story of empires and independence.',
    famousPlaces: [
      { id: 'red-fort', name: 'Red Fort', image: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=600&auto=format&fit=crop', description: 'Historic Mughal fort' },
      { id: 'india-gate', name: 'India Gate', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop', description: 'War memorial' },
      { id: 'qutub', name: 'Qutub Minar', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop', description: 'UNESCO World Heritage tower' },
    ],
    events: [
      { id: 'dl-1', title: 'Republic Day Parade', location: 'Rajpath', district: 'New Delhi', startDate: '2025-01-26', endDate: '2025-01-26', time: '09:00 AM', type: 'Culture', description: 'National celebration' },
      { id: 'dl-2', title: 'Delhi Heritage Walk', location: 'Old Delhi', district: 'Central Delhi', startDate: '2025-02-15', endDate: '2025-02-15', time: '07:00 AM', type: 'Historic', description: 'Walking tour of historic sites' },
    ],
    districts: [
      { name: 'New Delhi', events: [], attractions: [] },
      { name: 'Central Delhi', events: [], attractions: [] },
    ],
  },
  {
    id: 'west-bengal',
    name: 'West Bengal',
    capital: 'Kolkata',
    image: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=800&auto=format&fit=crop',
    description: 'West Bengal, the cultural capital of India, is renowned for its literature, art, and the grandest festival - Durga Puja. Kolkata\'s colonial architecture and intellectual heritage make it unique.',
    famousPlaces: [
      { id: 'victoria', name: 'Victoria Memorial', image: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=600&auto=format&fit=crop', description: 'Majestic white marble building' },
      { id: 'howrah', name: 'Howrah Bridge', image: 'https://images.unsplash.com/photo-1536421469767-80559bb6f5e1?w=600&auto=format&fit=crop', description: 'Iconic cantilever bridge' },
      { id: 'darjeeling', name: 'Darjeeling', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&auto=format&fit=crop', description: 'Queen of the Hills' },
    ],
    events: [
      { id: 'wb-1', title: 'Durga Puja', location: 'Kolkata', district: 'Kolkata', startDate: '2025-10-01', endDate: '2025-10-05', time: '06:00 AM', type: 'Culture', description: 'Grand festival of Bengal' },
      { id: 'wb-2', title: 'Kolkata Book Fair', location: 'Salt Lake', district: 'Kolkata', startDate: '2025-01-28', endDate: '2025-02-09', time: '12:00 PM', type: 'Culture', description: 'World\'s largest book fair' },
    ],
    districts: [
      { name: 'Kolkata', events: [], attractions: [] },
      { name: 'Darjeeling', events: [], attractions: [] },
    ],
  },
  {
    id: 'telangana',
    name: 'Telangana',
    capital: 'Hyderabad',
    image: 'https://images.unsplash.com/photo-1603684261098-de07d8422477?w=800&auto=format&fit=crop',
    description: 'Telangana, home to the City of Pearls, combines Nizami heritage with tech prowess. Hyderabad\'s biryani, Charminar, and HITEC City represent the perfect blend of tradition and modernity.',
    famousPlaces: [
      { id: 'charminar', name: 'Charminar', image: 'https://images.unsplash.com/photo-1603684261098-de07d8422477?w=600&auto=format&fit=crop', description: 'Iconic monument' },
      { id: 'golconda', name: 'Golconda Fort', image: 'https://images.unsplash.com/photo-1600100396778-b0e8c9a2c63b?w=600&auto=format&fit=crop', description: 'Historic diamond fort' },
      { id: 'hussain-sagar', name: 'Hussain Sagar', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&auto=format&fit=crop', description: 'Heart-shaped lake' },
    ],
    events: [
      { id: 'ts-1', title: 'Bonalu Festival', location: 'Old City', district: 'Hyderabad', startDate: '2025-07-06', endDate: '2025-07-27', time: '05:00 AM', type: 'Culture', description: 'Traditional goddess worship' },
      { id: 'ts-2', title: 'Hyderabad Food Fest', location: 'Necklace Road', district: 'Hyderabad', startDate: '2025-03-20', endDate: '2025-03-23', time: '11:00 AM', type: 'Food', description: 'Biryani and more' },
    ],
    districts: [
      { name: 'Hyderabad', events: [], attractions: [] },
      { name: 'Warangal', events: [], attractions: [] },
    ],
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    capital: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&auto=format&fit=crop',
    description: 'Rajasthan, the land of kings, dazzles with majestic forts, vibrant deserts, and royal hospitality. From the Pink City to the golden sands of Jaisalmer, every vista is breathtaking.',
    famousPlaces: [
      { id: 'hawa-mahal', name: 'Hawa Mahal', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&auto=format&fit=crop', description: 'Palace of Winds' },
      { id: 'amber-fort', name: 'Amber Fort', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&auto=format&fit=crop', description: 'Hilltop fortress' },
      { id: 'udaipur', name: 'Lake Palace Udaipur', image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=600&auto=format&fit=crop', description: 'Venice of the East' },
    ],
    events: [
      { id: 'rj-1', title: 'Pushkar Camel Fair', location: 'Pushkar', district: 'Ajmer', startDate: '2025-11-05', endDate: '2025-11-12', time: '06:00 AM', type: 'Culture', description: 'World\'s largest camel fair' },
      { id: 'rj-2', title: 'Jaipur Literature Festival', location: 'Diggi Palace', district: 'Jaipur', startDate: '2025-01-23', endDate: '2025-01-27', time: '10:00 AM', type: 'Culture', description: 'Asia\'s largest literary gathering' },
    ],
    districts: [
      { name: 'Jaipur', events: [], attractions: [] },
      { name: 'Udaipur', events: [], attractions: [] },
      { name: 'Jaisalmer', events: [], attractions: [] },
    ],
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    capital: 'Gandhinagar',
    image: 'https://images.unsplash.com/photo-1609947017136-9daf32a15c9e?w=800&auto=format&fit=crop',
    description: 'Gujarat, the birthplace of Mahatma Gandhi, showcases the world\'s largest statue, ancient stepwells, and the white desert of Kutch. Its entrepreneurial spirit is matched by rich traditions.',
    famousPlaces: [
      { id: 'statue-unity', name: 'Statue of Unity', image: 'https://images.unsplash.com/photo-1609947017136-9daf32a15c9e?w=600&auto=format&fit=crop', description: 'World\'s tallest statue' },
      { id: 'gir', name: 'Gir National Park', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&auto=format&fit=crop', description: 'Home of Asiatic lions' },
      { id: 'rann', name: 'Rann of Kutch', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop', description: 'White salt desert' },
    ],
    events: [
      { id: 'gj-1', title: 'Rann Utsav', location: 'Kutch', district: 'Kutch', startDate: '2024-11-01', endDate: '2025-02-28', time: '06:00 PM', type: 'Culture', description: 'Desert carnival' },
      { id: 'gj-2', title: 'Navratri Garba', location: 'Ahmedabad', district: 'Ahmedabad', startDate: '2025-09-22', endDate: '2025-10-01', time: '08:00 PM', type: 'Culture', description: 'Nine nights of dance' },
    ],
    districts: [
      { name: 'Gandhinagar', events: [], attractions: [] },
      { name: 'Ahmedabad', events: [], attractions: [] },
      { name: 'Kutch', events: [], attractions: [] },
    ],
  },
  {
    id: 'kerala',
    name: 'Kerala',
    capital: 'Thiruvananthapuram',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop',
    description: 'Kerala, God\'s Own Country, enchants with serene backwaters, Ayurvedic traditions, and lush hill stations. The state\'s unique culture and natural beauty create an unforgettable experience.',
    famousPlaces: [
      { id: 'alleppey', name: 'Alleppey Backwaters', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&auto=format&fit=crop', description: 'Venice of the East' },
      { id: 'munnar', name: 'Munnar', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop', description: 'Tea garden paradise' },
      { id: 'kovalam', name: 'Kovalam Beach', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&auto=format&fit=crop', description: 'Crescent beach haven' },
    ],
    events: [
      { id: 'kl-1', title: 'Onam Festival', location: 'Thiruvananthapuram', district: 'Thiruvananthapuram', startDate: '2025-08-25', endDate: '2025-09-04', time: '06:00 AM', type: 'Culture', description: 'Harvest festival of Kerala' },
      { id: 'kl-2', title: 'Nehru Trophy Boat Race', location: 'Alleppey', district: 'Alappuzha', startDate: '2025-08-09', endDate: '2025-08-09', time: '02:00 PM', type: 'Adventure', description: 'Snake boat race' },
    ],
    districts: [
      { name: 'Thiruvananthapuram', events: [], attractions: [] },
      { name: 'Kochi', events: [], attractions: [] },
      { name: 'Alappuzha', events: [], attractions: [] },
    ],
  },
  {
    id: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    capital: 'Lucknow',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop',
    description: 'Uttar Pradesh houses the iconic Taj Mahal and sacred cities of Varanasi and Ayodhya. This historic land has witnessed empires rise and fall, leaving behind unparalleled architectural wonders.',
    famousPlaces: [
      { id: 'taj', name: 'Taj Mahal', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop', description: 'Wonder of the world' },
      { id: 'varanasi', name: 'Varanasi Ghats', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&auto=format&fit=crop', description: 'Spiritual capital' },
      { id: 'bara-imambara', name: 'Bara Imambara', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop', description: 'Nawabi architecture' },
    ],
    events: [
      { id: 'up-1', title: 'Dev Deepawali', location: 'Varanasi', district: 'Varanasi', startDate: '2025-11-15', endDate: '2025-11-15', time: '05:00 PM', type: 'Culture', description: 'Festival of lights on ghats' },
      { id: 'up-2', title: 'Lucknow Mahotsav', location: 'Lucknow', district: 'Lucknow', startDate: '2025-11-25', endDate: '2025-12-05', time: '04:00 PM', type: 'Culture', description: 'Cultural extravaganza' },
    ],
    districts: [
      { name: 'Lucknow', events: [], attractions: [] },
      { name: 'Agra', events: [], attractions: [] },
      { name: 'Varanasi', events: [], attractions: [] },
    ],
  },
  {
    id: 'punjab',
    name: 'Punjab',
    capital: 'Chandigarh',
    image: 'https://images.unsplash.com/photo-1588096344356-5e0e756c49dd?w=800&auto=format&fit=crop',
    description: 'Punjab, the land of five rivers, pulsates with Bhangra beats, warm hospitality, and the sacred Golden Temple. Its fertile plains produce India\'s breadbasket and vibrant culture.',
    famousPlaces: [
      { id: 'golden-temple', name: 'Golden Temple', image: 'https://images.unsplash.com/photo-1588096344356-5e0e756c49dd?w=600&auto=format&fit=crop', description: 'Holiest Sikh shrine' },
      { id: 'jallianwala', name: 'Jallianwala Bagh', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&auto=format&fit=crop', description: 'Historic memorial' },
      { id: 'rock-garden', name: 'Rock Garden', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop', description: 'Chandigarh\'s wonder' },
    ],
    events: [
      { id: 'pb-1', title: 'Baisakhi', location: 'Amritsar', district: 'Amritsar', startDate: '2025-04-13', endDate: '2025-04-14', time: '05:00 AM', type: 'Culture', description: 'Harvest festival' },
      { id: 'pb-2', title: 'Rural Olympics', location: 'Kila Raipur', district: 'Ludhiana', startDate: '2025-02-01', endDate: '2025-02-03', time: '09:00 AM', type: 'Adventure', description: 'Traditional sports' },
    ],
    districts: [
      { name: 'Chandigarh', events: [], attractions: [] },
      { name: 'Amritsar', events: [], attractions: [] },
    ],
  },
  {
    id: 'madhya-pradesh',
    name: 'Madhya Pradesh',
    capital: 'Bhopal',
    image: 'https://images.unsplash.com/photo-1600100397608-e1a5c9ea0d40?w=800&auto=format&fit=crop',
    description: 'Madhya Pradesh, the heart of India, preserves UNESCO heritage sites, ancient cave art, and pristine tiger reserves. Its untouched wilderness and historical monuments offer authentic Indian experiences.',
    famousPlaces: [
      { id: 'khajuraho', name: 'Khajuraho Temples', image: 'https://images.unsplash.com/photo-1600100397608-e1a5c9ea0d40?w=600&auto=format&fit=crop', description: 'UNESCO temple complex' },
      { id: 'sanchi', name: 'Sanchi Stupa', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop', description: 'Ancient Buddhist monument' },
      { id: 'bandhavgarh', name: 'Bandhavgarh', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&auto=format&fit=crop', description: 'Tiger reserve' },
    ],
    events: [
      { id: 'mp-1', title: 'Khajuraho Dance Festival', location: 'Khajuraho', district: 'Chhatarpur', startDate: '2025-02-20', endDate: '2025-02-26', time: '06:30 PM', type: 'Culture', description: 'Classical dance at temples' },
      { id: 'mp-2', title: 'Lokrang Festival', location: 'Bhopal', district: 'Bhopal', startDate: '2025-01-26', endDate: '2025-02-01', time: '05:00 PM', type: 'Culture', description: 'Folk arts celebration' },
    ],
    districts: [
      { name: 'Bhopal', events: [], attractions: [] },
      { name: 'Indore', events: [], attractions: [] },
      { name: 'Chhatarpur', events: [], attractions: [] },
    ],
  },
];

export const eventTypes = ['Culture', 'Food', 'Adventure', 'Historic', 'Tech'] as const;

export const eventTypeColors: Record<string, string> = {
  Culture: 'bg-purple-100 text-purple-800 border-purple-200',
  Food: 'bg-orange-100 text-orange-800 border-orange-200',
  Adventure: 'bg-blue-100 text-blue-800 border-blue-200',
  Historic: 'bg-amber-100 text-amber-800 border-amber-200',
  Tech: 'bg-emerald-100 text-emerald-800 border-emerald-200',
};
