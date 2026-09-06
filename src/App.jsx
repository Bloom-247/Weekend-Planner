import React, { useState, useEffect } from 'react';

// --- ROBUST MOCK DATA & REUSABLE STRUCTURE ---
const DESTINATIONS = [
  {
    id: 'lonavala',
    name: 'Lonavala',
    region: 'Sahyadri Hills, Maharashtra',
    heroImage: 'https://images.unsplash.com/photo-1584811644167-a5448bb444ff?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Mist-clad valleys, cascading waterfalls, and famous crispy chikki treats.',
    distance: '83 km',
    travelTime: '2h 15m',
    budgetLevel: 'Medium',
    budgetNumeric: 3400,
    bestFor: 'Nature',
    rating: 4.8,
    tags: ['Nature', 'Hiking', 'Scenic'],
    highlights: ['Tiger’s Leap viewpoint panorama', 'Bhushi Dam water streams', 'Ancient Karla Buddhist caves'],
    weekendRhythm: {
      friday: 'Depart city late afternoon, check into a valley-view resort, and enjoy cozy evening chai.',
      saturday: 'Early morning trek to Tiger’s Leap, local market tour at noon, sunset at Ryewood Park.',
      sunday: 'Breakfast at a classic café, quick stop at Bhushi Dam, and smooth drive home.'
    },
    practicalNotes: {
      gettingThere: 'Expressway drive or comfortable intercity bus.',
      idealPace: 'Balanced and relaxed',
      whatToBring: 'Light waterproof jacket and comfortable walking shoes.'
    },
    accentColor: '#0F766E',
    mood: ['Nature', 'Adventure', 'Romantic']
  },
  {
    id: 'alibaug',
    name: 'Alibaug',
    region: 'Konkan Coast, Maharashtra',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Sun-kissed black and white sand beaches, sea forts, and coastal seafood.',
    distance: '95 km',
    travelTime: '2h 45m',
    budgetLevel: 'Medium',
    budgetNumeric: 4200,
    bestFor: 'Beach',
    rating: 4.7,
    tags: ['Beach', 'Foodie', 'Relaxing'],
    highlights: ['Historic 17th-century Kolaba Sea Fort', 'Nagaon & Alibaug Beach sunsets', 'Authentic Konkani fish thalis'],
    weekendRhythm: {
      friday: 'Take the afternoon Ro-Ro ferry or coastal drive, check into a beach villa.',
      saturday: 'Explore Kolaba Fort during low tide, afternoon beach relaxation, seafood dinner.',
      sunday: 'Sunrise stroll on the shore, local coconut market visit, ferry ride back.'
    },
    practicalNotes: {
      gettingThere: 'Ferry from Gateway of India + local auto, or scenic road trip.',
      idealPace: 'Slow and restorative',
      whatToBring: 'Sunscreen, swimwear, and shades.'
    },
    accentColor: '#0F766E',
    mood: ['Beach', 'Food', 'Relaxing', 'Romantic']
  },
  {
    id: 'mahabaleshwar',
    name: 'Mahabaleshwar',
    region: 'Western Ghats, Maharashtra',
    heroImage: 'https://images.unsplash.com/photo-1595655635130-f5ea78cbe33f?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Endless strawberry farms, evergreen forests, and dramatic cliff viewpoints.',
    distance: '120 km',
    travelTime: '3h 30m',
    budgetLevel: 'High',
    budgetNumeric: 5100,
    bestFor: 'Romantic',
    rating: 4.9,
    tags: ['Romantic', 'Nature', 'Foodie'],
    highlights: ['Venna Lake boating and horse riding', 'Mapro Garden strawberry treats', 'Arthur’s Seat cliff drop views'],
    weekendRhythm: {
      friday: 'Evening arrival through winding mountain roads, warm dinner by a bonfire.',
      saturday: 'Full day viewpoint hopping (Wilson Point, Arthur’s Seat), evening strawberry picking at Mapro.',
      sunday: 'Boating on Venna Lake, purchasing fresh preserves, and departure.'
    },
    practicalNotes: {
      gettingThere: 'Smooth national highway followed by smooth mountain climbs.',
      idealPace: 'Leisurely',
      whatToBring: 'Warm woolen sweater for chilly evenings.'
    },
    accentColor: '#0F766E',
    mood: ['Romantic', 'Nature', 'Food']
  },
  {
    id: 'matheran',
    name: 'Matheran',
    region: 'Eco-Sensitive Hill Station',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Asia’s only automobile-free hill station with pristine red-soil trails.',
    distance: '90 km',
    travelTime: '2h 30m',
    budgetLevel: 'Low',
    budgetNumeric: 2800,
    bestFor: 'Adventure',
    rating: 4.6,
    tags: ['Adventure', 'Nature', 'Relaxing'],
    highlights: ['Historic toy train ride through valleys', 'Panorama Point sunrise view', 'Pristine quiet pine forests'],
    weekendRhythm: {
      friday: 'Park vehicles at Dasturi, walk or ride horseback into the vehicle-free sanctuary.',
      saturday: 'Morning forest hikes to viewpoints, afternoon reading under canopy shade, stargazing.',
      sunday: 'Final panoramic coffee at Echo Point, leisurely walk down, and trip home.'
    },
    practicalNotes: {
      gettingThere: 'Train or drive to Neral, then toy train or horse trek up.',
      idealPace: 'Active walking pace',
      whatToBring: 'Sturdy walking boots and mosquito repellent.'
    },
    accentColor: '#0F766E',
    mood: ['Adventure', 'Nature', 'Relaxing']
  },
  {
    id: 'nashik',
    name: 'Nashik',
    region: 'Wine Capital, Maharashtra',
    heroImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Rolling vineyards, wine-tasting estates, and serene lakeside dining.',
    distance: '165 km',
    travelTime: '3h 15m',
    budgetLevel: 'High',
    budgetNumeric: 5800,
    bestFor: 'Foodie',
    rating: 4.8,
    tags: ['Foodie', 'Romantic', 'Instagrammable'],
    highlights: ['Sula Vineyards guided tours and tasting', 'Grover Zampa estate visits', 'Soma Vineyard lakeside dinners'],
    weekendRhythm: {
      friday: 'Scenic drive north, evening check-in at a vineyard resort overlooking the vines.',
      saturday: 'Grape crushing experience, sommelier-led wine tasting session, gourmet sunset dinner.',
      sunday: 'Slow breakfast by the lake, local artisan shopping, afternoon drive back.'
    },
    practicalNotes: {
      gettingThere: 'Excellent 4-lane highway drive from Mumbai or Pune.',
      idealPace: 'Sophisticated and relaxed',
      whatToBring: 'Smart casual resort wear and sunglasses.'
    },
    accentColor: '#0F766E',
    mood: ['Food', 'Romantic', 'Relaxing', 'Instagrammable']
  },
  {
    id: 'igatpuri',
    name: 'Igatpuri',
    region: 'Highland Valleys, Maharashtra',
    heroImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Majestic peaks, ancient fort ruins, and world-renowned meditation centers.',
    distance: '120 km',
    travelTime: '2h 30m',
    budgetLevel: 'Medium',
    budgetNumeric: 3100,
    bestFor: 'Relaxing',
    rating: 4.7,
    tags: ['Nature', 'Relaxing', 'Adventure'],
    highlights: ['Vipassana International Academy campus', 'Bhatsa River Valley overlooks', 'Trek to Kalsubai Peak base'],
    weekendRhythm: {
      friday: 'Tranquil evening arrival, unwind amidst mountain silence and crisp air.',
      saturday: 'Morning valley exploration, waterfall photography, deep relaxation and peace.',
      sunday: 'Refreshing herbal tea, scenic mountain drive back.'
    },
    practicalNotes: {
      gettingThere: 'Direct highway or scenic rail route.',
      idealPace: 'Restorative and quiet',
      whatToBring: 'Comfortable leisure wear and hydration packs.'
    },
    accentColor: '#0F766E',
    mood: ['Relaxing', 'Nature', 'Adventure']
  }
];

const VIBES = [
  { id: 'Nature', label: 'Nature', icon: '🌿' },
  { id: 'Beach', label: 'Beach', icon: '🏖️' },
  { id: 'Adventure', label: 'Adventure', icon: '🏔️' },
  { id: 'Romantic', label: 'Romantic', icon: '❤️' },
  { id: 'Food', label: 'Foodie', icon: '🍴' },
  { id: 'Relaxing', label: 'Relaxing', icon: '😌' },
  { id: 'Instagrammable', label: 'Instagrammable', icon: '📸' },
  { id: 'Party', label: 'Party', icon: '🎉' }
];

export default function WeekendPlannerApp() {
  // --- STATE MANAGEMENT ---
  const [currentView, setCurrentView] = useState('home'); // home, planner, results, saved, details
  const [selectedVibe, setSelectedVibe] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDestination, setActiveDestination] = useState(null);

  // Planner Form State
  const [formData, setFormData] = useState({
    startingLocation: 'Mumbai',
    destination: 'Alibaug',
    travelers: '2',
    startDate: '2026-10-03',
    endDate: '2026-10-04',
    budget: '5000',
    preference: 'Beach',
    vibe: 'Beach'
  });

  // AI Generation Loading State Steps
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const loadingStepsText = [
    'Checking destination availability...',
    'Optimizing travel routes & traffic...',
    'Curating hand-picked activities...',
    'Calculating precise budget breakdown...',
    'Assembling your custom AI itinerary...'
  ];

  // Generated Itinerary State
  const [generatedTrip, setGeneratedTrip] = useState(null);

  // Saved Trips with localStorage persistence (Only Alibaug retained initially)
  const [savedTrips, setSavedTrips] = useState(() => {
    try {
      const saved = localStorage.getItem('weekend_saved_trips_v2');
      return saved ? JSON.parse(saved) : [
        {
          id: 'saved-2',
          destination: 'Alibaug',
          dates: '3–4 October',
          travelers: 2,
          budget: '₹4,200',
          totalCostNumeric: 4200,
          distance: '95 km',
          travelTime: '2h 45m',
          rating: 4.7,
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
          vibe: 'Beach'
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('weekend_saved_trips_v2', JSON.stringify(savedTrips));
    } catch (e) {
      console.error(e);
    }
  }, [savedTrips]);

  // Handle AI Trip Generation Simulation
  const handleGenerateTrip = (e) => {
    e?.preventDefault();
    setIsGenerating(true);
    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < loadingStepsText.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsGenerating(false);
            const destObj = DESTINATIONS.find(d => d.name.toLowerCase() === formData.destination.toLowerCase()) || DESTINATIONS[1];
            setGeneratedTrip({
              id: Date.now(),
              destination: destObj.name,
              region: destObj.region,
              image: destObj.heroImage,
              dates: '3–4 October',
              travelers: formData.travelers,
              budgetLimit: Number(formData.budget),
              totalCost: destObj.budgetNumeric,
              savings: Number(formData.budget) - destObj.budgetNumeric,
              distance: destObj.distance,
              travelTime: destObj.travelTime,
              rating: destObj.rating,
              vibe: formData.vibe,
              startingLocation: formData.startingLocation,
              budgetBreakdown: {
                transport: Math.round(destObj.budgetNumeric * 0.3),
                stay: Math.round(destObj.budgetNumeric * 0.4),
                food: Math.round(destObj.budgetNumeric * 0.2),
                activities: Math.round(destObj.budgetNumeric * 0.1)
              },
              itinerary: [
                {
                  day: 'SATURDAY',
                  items: [
                    { time: '08:00 AM', activity: `Depart from ${formData.startingLocation}`, location: 'Gateway of India / Ro-Ro Ferry', duration: '1h 30m', cost: '₹500 Ferry Ticket', notes: 'Enjoy the coastal breeze across the harbor.' },
                    { time: '10:00 AM', activity: 'Coastal Breakfast & Coconut Water', location: 'Mandwa Jetty Cafe', duration: '45m', cost: '₹350', notes: 'Fresh local breakfast options.' },
                    { time: '11:30 AM', activity: 'Beach Villa Check-in & Relax', location: `${destObj.name} Beachfront Stay`, duration: '1h 30m', cost: 'Included', notes: 'Settle into your coastal room.' },
                    { time: '01:30 PM', activity: 'Authentic Seafood Thali Lunch', location: 'Local Coastal Diner', duration: '1h 15m', cost: '₹900', notes: 'Try signature prawn or surmai preparations.' },
                    { time: '03:30 PM', activity: 'Explore Historic Sea Fort', location: 'Kolaba Fort (Low Tide Walk)', duration: '2h', cost: '₹50 entry', notes: 'Walk across the shallow sea bed during low tide.' },
                    { time: '06:00 PM', activity: 'Sunset Shore Stroll', location: 'Alibaug Main Beach', duration: '1h 30m', cost: 'Free', notes: 'Stunning evening sky colors over the Arabian Sea.' },
                    { time: '08:30 PM', activity: 'Beachside Dinner', location: 'Seaside Shack Restaurant', duration: '2h', cost: '₹1,100', notes: 'Relaxed atmosphere under string lights.' }
                  ]
                },
                {
                  day: 'SUNDAY',
                  items: [
                    { time: '08:00 AM', activity: 'Morning Sunrise Beach Walk', location: 'Nagaon Shoreline', duration: '1h', cost: 'Free', notes: 'Peaceful morning air and calm waves.' },
                    { time: '09:30 AM', activity: 'Traditional Breakfast & Coffee', location: 'Village Bakery', duration: '45m', cost: '₹300', notes: 'Local baked snacks and hot filter coffee.' },
                    { time: '11:00 AM', activity: 'Local Spice & Coconut Market Visit', location: 'Alibaug Town Bazaar', duration: '1h 30m', cost: '₹400', notes: 'Pick up homemade coconut sweets and spices.' },
                    { time: '01:00 PM', activity: 'Leisurely Farewell Lunch', location: 'Garden Courtyard Restaurant', duration: '1h 30m', cost: '₹800', notes: 'Final relaxing meal before checkout.' },
                    { time: '03:30 PM', activity: 'Ferry Return to ' + formData.startingLocation, location: 'Mandwa Jetty', duration: '1h 30m', cost: '₹500', notes: 'Scenic boat ride back to the city.' }
                  ]
                }
              ]
            });
            setCurrentView('results');
          }, 800);
        }
        return prev + 1;
      });
    }, 600);
  };

  const saveCurrentTrip = () => {
    if (!generatedTrip) return;
    const exists = savedTrips.some(t => t.destination === generatedTrip.destination);
    if (!exists) {
      const newTrip = {
        id: generatedTrip.id,
        destination: generatedTrip.destination,
        dates: generatedTrip.dates,
        travelers: Number(generatedTrip.travelers),
        budget: `₹${generatedTrip.totalCost.toLocaleString()}`,
        totalCostNumeric: generatedTrip.totalCost,
        distance: generatedTrip.distance,
        travelTime: generatedTrip.travelTime,
        rating: generatedTrip.rating,
        image: generatedTrip.image,
        vibe: generatedTrip.vibe
      };
      setSavedTrips([newTrip, ...savedTrips]);
    }
    setCurrentView('saved');
  };

  const deleteSavedTrip = (id) => {
    setSavedTrips(savedTrips.filter(t => t.id !== id));
  };

  const filteredDestinations = DESTINATIONS.filter(d => {
    const matchesVibe = selectedVibe === 'All' || d.mood.includes(selectedVibe);
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesVibe && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#1C1917] font-sans antialiased selection:bg-[#0F766E] selection:text-white flex flex-col justify-between">
      
      {/* NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E7E5E4] px-6 lg:px-12 py-4 flex items-center justify-between transition-all">
        <div 
          onClick={() => setCurrentView('home')} 
          className="cursor-pointer flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#0F766E]/10 flex items-center justify-center text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white transition-all shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <span className="font-semibold text-lg tracking-tight text-[#1C1917]">Weekend Escapes</span>
            <span className="block text-[10px] text-[#78716C] tracking-widest uppercase font-medium">AI Travel Planner</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#44403C]">
          <button 
            onClick={() => setCurrentView('home')} 
            className={`transition-colors hover:text-[#0F766E] ${currentView === 'home' ? 'text-[#0F766E] font-semibold' : ''}`}
          >
            Explore
          </button>
          <button 
            onClick={() => setCurrentView('planner')} 
            className={`transition-colors hover:text-[#0F766E] ${currentView === 'planner' ? 'text-[#0F766E] font-semibold' : ''}`}
          >
            AI Planner
          </button>
          <button 
            onClick={() => setCurrentView('saved')} 
            className={`transition-colors hover:text-[#0F766E] flex items-center gap-1.5 ${currentView === 'saved' ? 'text-[#0F766E] font-semibold' : ''}`}
          >
            My Trips
            {savedTrips.length > 0 && (
              <span className="bg-[#0F766E] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {savedTrips.length}
              </span>
            )}
          </button>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentView('planner')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#0F766E] text-white font-medium text-sm hover:bg-[#0d655e] transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            ✨ Plan My Weekend
          </button>
          <button 
            onClick={() => setCurrentView('saved')} 
            className="md:hidden p-2 rounded-xl bg-[#F5F5F4] text-[#44403C] relative"
          >
            ❤️
            {savedTrips.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#0F766E] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {savedTrips.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-12 py-8">

        {/* LOADING STATE OVERLAY */}
        {isGenerating && (
          <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-[#0F766E]/10 flex items-center justify-center text-[#0F766E] text-2xl mb-6 animate-pulse">
              ✨
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#1C1917] mb-2">
              Planning your perfect weekend...
            </h2>
            <p className="text-sm text-[#78716C] mb-8 max-w-md">
              Our travel AI is combining distance algorithms, live budget models, and expert itineraries for {formData.destination}.
            </p>

            <div className="space-y-3 text-left w-full max-w-sm bg-white p-6 rounded-2xl border border-[#E7E5E4] shadow-sm">
              {loadingStepsText.map((stepText, idx) => {
                const isComplete = idx < loadingStep;
                const isCurrent = idx === loadingStep;
                return (
                  <div key={idx} className={`flex items-center gap-3 text-sm transition-all ${isComplete ? 'text-[#0F766E] font-medium' : isCurrent ? 'text-[#1C1917] font-semibold animate-pulse' : 'text-[#A8A29E]'}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${isComplete ? 'bg-[#0F766E] text-white' : isCurrent ? 'bg-[#0F766E]/20 text-[#0F766E]' : 'bg-[#F5F5F4] text-[#A8A29E]'}`}>
                      {isComplete ? '✓' : idx + 1}
                    </span>
                    <span>{stepText}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* HOME VIEW */}
        {currentView === 'home' && (
          <div className="space-y-16 animate-fadeIn">
            
            {/* HERO SECTION */}
            <div className="relative rounded-3xl overflow-hidden bg-[#1C1917] text-white p-8 md:p-16 shadow-xl flex flex-col justify-end min-h-[500px]">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80" 
                  alt="Travel Hero" 
                  className="w-full h-full object-cover opacity-45 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/50 to-transparent"></div>
              </div>

              <div className="relative z-10 max-w-2xl space-y-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium tracking-wide uppercase text-[#E7E5E4] border border-white/10">
                  ✨ Powered by Advanced Travel AI
                </span>
                <h1 className="text-4xl md:text-6xl font-serif font-normal leading-tight tracking-tight">
                  Your Perfect Weekend, Planned in Minutes.
                </h1>
                <p className="text-base md:text-lg text-[#D6D3D1] font-light leading-relaxed">
                  Discover destinations, build personalized itineraries, and plan your entire weekend around your time, budget, and vibe.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <button 
                    onClick={() => setCurrentView('planner')}
                    className="px-8 py-4 rounded-xl bg-[#0F766E] text-white font-medium text-sm hover:bg-[#0d655e] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    ✨ Plan My Weekend
                  </button>
                  <button 
                    onClick={() => {
                      const el = document.getElementById('destinations-grid');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md text-white font-medium text-sm hover:bg-white/20 transition-all border border-white/20"
                  >
                    Explore Destinations
                  </button>
                </div>
              </div>
            </div>

            {/* VIBE FILTERS SECTION */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-serif font-medium text-[#1C1917]">What's your weekend vibe?</h2>
                  <p className="text-sm text-[#78716C] mt-1">Select your mood to instantly filter relevant destinations.</p>
                </div>
                {selectedVibe !== 'All' && (
                  <button 
                    onClick={() => setSelectedVibe('All')}
                    className="text-xs font-semibold text-[#0F766E] hover:underline self-start md:self-auto"
                  >
                    Reset vibe filter
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                <button
                  onClick={() => setSelectedVibe('All')}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${selectedVibe === 'All' ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-sm' : 'bg-white text-[#44403C] border-[#E7E5E4] hover:border-[#0F766E]'}`}
                >
                  <span className="text-xl">✨</span>
                  <span className="text-xs font-medium">All Vibes</span>
                </button>
                {VIBES.map(vibe => (
                  <button
                    key={vibe.id}
                    onClick={() => setSelectedVibe(vibe.id)}
                    className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${selectedVibe === vibe.id ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-sm' : 'bg-white text-[#44403C] border-[#E7E5E4] hover:border-[#0F766E]'}`}
                  >
                    <span className="text-xl">{vibe.icon}</span>
                    <span className="text-xs font-medium">{vibe.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* DESTINATION DISCOVERY SECTION */}
            <div id="destinations-grid" className="space-y-6 pt-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-serif font-medium text-[#1C1917]">Popular Weekend Escapes</h2>
                  <p className="text-sm text-[#78716C] mt-1">Hand-picked getaways within a comfortable driving or ferry distance.</p>
                </div>
                <div className="w-full md:w-72">
                  <input 
                    type="text"
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7E5E4] text-sm focus:outline-none focus:border-[#0F766E] transition-all shadow-sm"
                  />
                </div>
              </div>

              {filteredDestinations.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-[#E7E5E4] space-y-4">
                  <p className="text-lg font-medium text-[#78716C]">No destinations found matching your criteria.</p>
                  <button 
                    onClick={() => { setSelectedVibe('All'); setSearchQuery(''); }}
                    className="px-6 py-2.5 rounded-xl bg-[#0F766E] text-white text-sm font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredDestinations.map(dest => (
                    <div 
                      key={dest.id}
                      onClick={() => {
                        setActiveDestination(dest);
                        setCurrentView('details');
                      }}
                      className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-[#E7E5E4] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={dest.heroImage} 
                          alt={dest.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#1C1917] shadow-sm flex items-center gap-1">
                          ★ {dest.rating}
                        </div>
                        <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-[#1C1917] font-medium text-xs px-3 py-1 rounded-full shadow-sm">
                          {dest.travelTime} away • From ₹{dest.budgetNumeric.toLocaleString()}
                        </span>
                      </div>

                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex gap-2 flex-wrap">
                            {dest.tags.map((tag, idx) => (
                              <span key={idx} className="text-[10px] tracking-wider uppercase font-semibold text-[#0F766E] bg-[#0F766E]/10 px-2.5 py-1 rounded-md">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-2xl font-serif font-medium text-[#1C1917]">{dest.name}</h3>
                          <p className="text-xs text-[#78716C]">{dest.region}</p>
                          <p className="text-sm text-[#44403C] line-clamp-2 leading-relaxed">{dest.shortDescription}</p>
                        </div>

                        <div className="pt-4 border-t border-[#F5F5F4] flex justify-between items-center text-xs font-medium text-[#44403C]">
                          <span className="text-[#78716C]">Best for: <strong className="text-[#1C1917]">{dest.bestFor}</strong></span>
                          <span className="group-hover:translate-x-1 transition-transform text-[#0F766E] font-semibold flex items-center gap-1">
                            Explore Plan →
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* WEEKEND PLANNER VIEW */}
        {currentView === 'planner' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#0F766E]">AI Itinerary Generator</span>
              <h1 className="text-3xl md:text-4xl font-serif font-medium text-[#1C1917] mt-1">Design Your Custom Escape</h1>
              <p className="text-sm text-[#78716C] mt-1">Provide your trip preferences, and our engine will build your minute-by-minute plan.</p>
            </div>

            <form onSubmit={handleGenerateTrip} className="bg-white p-8 md:p-12 rounded-3xl border border-[#E7E5E4] shadow-sm space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2">Starting Location</label>
                  <input 
                    type="text" 
                    value={formData.startingLocation}
                    onChange={(e) => setFormData({...formData, startingLocation: e.target.value})}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] focus:border-[#0F766E] focus:outline-none text-sm font-medium"
                    placeholder="e.g. Mumbai"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2">Destination</label>
                  <select 
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] focus:border-[#0F766E] focus:outline-none text-sm font-medium cursor-pointer"
                  >
                    {DESTINATIONS.map(d => (
                      <option key={d.id} value={d.name}>{d.name} ({d.region})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2">Start Date</label>
                  <input 
                    type="date" 
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] focus:border-[#0F766E] focus:outline-none text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2">End Date</label>
                  <input 
                    type="date" 
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] focus:border-[#0F766E] focus:outline-none text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2">Travelers</label>
                  <select 
                    value={formData.travelers}
                    onChange={(e) => setFormData({...formData, travelers: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] focus:border-[#0F766E] focus:outline-none text-sm font-medium cursor-pointer"
                  >
                    <option value="1">1 Traveler (Solo)</option>
                    <option value="2">2 Travelers (Couple)</option>
                    <option value="4">4 Travelers (Group)</option>
                    <option value="6">6+ Group / Family</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C]">Maximum Budget Limit (₹)</label>
                  <span className="text-sm font-bold text-[#0F766E]">₹{Number(formData.budget).toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="2000" 
                  max="15000" 
                  step="500"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full accent-[#0F766E] cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-3">Select Weekend Vibe</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {VIBES.slice(0, 8).map(vibe => (
                    <div 
                      key={vibe.id}
                      onClick={() => setFormData({...formData, vibe: vibe.id, preference: vibe.id})}
                      className={`cursor-pointer p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${formData.vibe === vibe.id ? 'bg-[#0F766E]/10 border-[#0F766E] text-[#0F766E] font-semibold' : 'bg-[#FAFAF9] border-[#E7E5E4] text-[#44403C] hover:border-[#0F766E]'}`}
                    >
                      <span className="text-xl">{vibe.icon}</span>
                      <span className="text-xs">{vibe.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#0F766E] text-white font-medium text-base hover:bg-[#0d655e] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  ✨ Generate My Weekend
                </button>
              </div>

            </form>
          </div>
        )}

        {/* GENERATED RESULTS & ITINERARY VIEW */}
        {currentView === 'results' && generatedTrip && (
          <div className="space-y-12 animate-fadeIn pb-16">
            
            <div className="flex justify-between items-center">
              <button 
                onClick={() => setCurrentView('planner')}
                className="text-sm font-medium text-[#78716C] hover:text-[#0F766E] flex items-center gap-2"
              >
                ← Back to Planner
              </button>
              <div className="flex gap-3">
                <button 
                  onClick={saveCurrentTrip}
                  className="px-5 py-2.5 rounded-xl bg-white border border-[#E7E5E4] text-sm font-medium hover:bg-[#FAFAF9] transition-all shadow-sm flex items-center gap-2 text-[#1C1917]"
                >
                  ❤️ Save Trip
                </button>
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: generatedTrip.destination, text: `Check out my AI-planned weekend escape to ${generatedTrip.destination}!` }).catch(() => {});
                    } else {
                      alert('Trip summary link copied to clipboard!');
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#0F766E] text-white text-sm font-medium hover:bg-[#0d655e] transition-all shadow-sm"
                >
                  Share Trip ↗
                </button>
              </div>
            </div>

            {/* TRIP SUMMARY CARD */}
            <div className="bg-white rounded-3xl border border-[#E7E5E4] p-8 md:p-12 shadow-sm space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#F5F5F4]">
                <div className="flex items-center gap-6">
                  <img src={generatedTrip.image} alt={generatedTrip.destination} className="w-24 h-24 rounded-2xl object-cover shadow-sm" />
                  <div>
                    <span className="text-xs uppercase tracking-widest font-semibold text-[#0F766E]">Your Perfect Weekend</span>
                    <h1 className="text-3xl md:text-4xl font-serif font-medium text-[#1C1917] mt-1">{generatedTrip.destination}</h1>
                    <p className="text-sm text-[#78716C] mt-1">{generatedTrip.region}</p>
                  </div>
                </div>
                <div className="text-left md:text-right bg-[#FAFAF9] p-4 rounded-2xl border border-[#E7E5E4]">
                  <span className="text-xs uppercase tracking-wider text-[#78716C] block">Total Estimated Cost</span>
                  <span className="text-2xl font-bold text-[#1C1917]">₹{generatedTrip.totalCost.toLocaleString()}</span>
                  <span className="block text-xs font-semibold text-[#0F766E] mt-0.5">
                    ₹{Math.abs(generatedTrip.savings).toLocaleString()} under your budget 🎉
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#78716C]">Dates</span>
                  <span className="font-medium text-base text-[#1C1917]">{generatedTrip.dates}</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#78716C]">Travelers</span>
                  <span className="font-medium text-base text-[#1C1917]">{generatedTrip.travelers} Guests</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#78716C]">Distance & Time</span>
                  <span className="font-medium text-base text-[#1C1917]">{generatedTrip.distance} ({generatedTrip.travelTime})</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#78716C]">Destination Rating</span>
                  <span className="font-medium text-base text-[#1C1917]">★ {generatedTrip.rating} / 5.0</span>
                </div>
              </div>
            </div>

            {/* BUDGET BREAKDOWN SECTION */}
            <div className="bg-white rounded-3xl border border-[#E7E5E4] p-8 md:p-12 shadow-sm space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-serif font-medium text-[#1C1917]">Trip Budget Breakdown</h2>
                  <p className="text-sm text-[#78716C] mt-1">Transparent AI cost allocation across accommodation, food, and transport.</p>
                </div>
                <span className="text-sm font-bold text-[#0F766E]">Total: ₹{generatedTrip.totalCost.toLocaleString()}</span>
              </div>

              <div className="space-y-4 pt-2">
                <div className="h-4 w-full bg-[#FAFAF9] rounded-full overflow-hidden flex border border-[#E7E5E4]">
                  <div style={{ width: `${(generatedTrip.budgetBreakdown.stay / generatedTrip.totalCost) * 100}%` }} className="bg-[#0F766E]" title="Stay"></div>
                  <div style={{ width: `${(generatedTrip.budgetBreakdown.transport / generatedTrip.totalCost) * 100}%` }} className="bg-[#14B8A6]" title="Transport"></div>
                  <div style={{ width: `${(generatedTrip.budgetBreakdown.food / generatedTrip.totalCost) * 100}%` }} className="bg-[#FBBF24]" title="Food"></div>
                  <div style={{ width: `${(generatedTrip.budgetBreakdown.activities / generatedTrip.totalCost) * 100}%` }} className="bg-[#F87171]" title="Activities"></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="bg-[#FAFAF9] p-4 rounded-2xl border border-[#E7E5E4]">
                    <span className="flex items-center gap-1.5 text-xs text-[#78716C] mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0F766E]"></span> Stay / Accommodation
                    </span>
                    <span className="text-lg font-bold text-[#1C1917]">₹{generatedTrip.budgetBreakdown.stay.toLocaleString()}</span>
                  </div>
                  <div className="bg-[#FAFAF9] p-4 rounded-2xl border border-[#E7E5E4]">
                    <span className="flex items-center gap-1.5 text-xs text-[#78716C] mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]"></span> Transport / Fuel
                    </span>
                    <span className="text-lg font-bold text-[#1C1917]">₹{generatedTrip.budgetBreakdown.transport.toLocaleString()}</span>
                  </div>
                  <div className="bg-[#FAFAF9] p-4 rounded-2xl border border-[#E7E5E4]">
                    <span className="flex items-center gap-1.5 text-xs text-[#78716C] mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]"></span> Food & Dining
                    </span>
                    <span className="text-lg font-bold text-[#1C1917]">₹{generatedTrip.budgetBreakdown.food.toLocaleString()}</span>
                  </div>
                  <div className="bg-[#FAFAF9] p-4 rounded-2xl border border-[#E7E5E4]">
                    <span className="flex items-center gap-1.5 text-xs text-[#78716C] mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F87171]"></span> Activities & Entry
                    </span>
                    <span className="text-lg font-bold text-[#1C1917]">₹{generatedTrip.budgetBreakdown.activities.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ROUTE / MAP VISUALIZATION SECTION */}
            <div className="bg-white rounded-3xl border border-[#E7E5E4] p-8 md:p-12 shadow-sm space-y-6">
              <div>
                <h2 className="text-2xl font-serif font-medium text-[#1C1917]">Optimized Travel Route</h2>
                <p className="text-sm text-[#78716C] mt-1">Seamless point-to-point progression with minimal transit overhead.</p>
              </div>

              <div className="bg-[#FAFAF9] p-6 rounded-2xl border border-[#E7E5E4] flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-[#1C1917]">
                  <span className="px-4 py-2 rounded-xl bg-white border border-[#E7E5E4] shadow-sm">{generatedTrip.startingLocation}</span>
                  <span className="text-[#0F766E] font-bold">↓</span>
                  <span className="px-4 py-2 rounded-xl bg-white border border-[#E7E5E4] shadow-sm">Ferry / Coastal Route</span>
                  <span className="text-[#0F766E] font-bold">↓</span>
                  <span className="px-4 py-2 rounded-xl bg-[#0F766E] text-white shadow-sm">{generatedTrip.destination}</span>
                  <span className="text-[#0F766E] font-bold">↓</span>
                  <span className="px-4 py-2 rounded-xl bg-white border border-[#E7E5E4] shadow-sm">Beachfront & Forts</span>
                </div>
                <div className="text-xs text-[#78716C] font-medium bg-white px-4 py-2.5 rounded-xl border border-[#E7E5E4]">
                  Total Distance: <strong className="text-[#1C1917]">{generatedTrip.distance}</strong> • Est Time: <strong className="text-[#1C1917]">{generatedTrip.travelTime}</strong>
                </div>
              </div>
            </div>

            {/* AI ITINERARY VERTICAL TIMELINE */}
            <div className="bg-white rounded-3xl border border-[#E7E5E4] p-8 md:p-12 shadow-sm space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-medium text-[#1C1917]">Your AI Itinerary Timeline</h2>
                <p className="text-sm text-[#78716C] mt-1">Minute-by-minute weekend plan optimized for weather, crowd levels, and timing.</p>
              </div>

              <div className="space-y-10">
                {generatedTrip.itinerary.map((dayBlock, dIdx) => (
                  <div key={dIdx} className="space-y-6">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#0F766E] text-white text-xs font-bold tracking-wider uppercase shadow-sm">
                      {dayBlock.day}
                    </div>

                    <div className="relative pl-6 md:pl-8 border-l-2 border-[#E7E5E4] space-y-8">
                      {dayBlock.items.map((item, iIdx) => (
                        <div key={iIdx} className="relative group">
                          <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#0F766E] shadow-sm"></div>

                          <div className="bg-[#FAFAF9] p-6 rounded-2xl border border-[#E7E5E4] hover:border-[#0F766E] transition-all space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <span className="text-xs font-bold text-[#0F766E] tracking-wider uppercase">{item.time} ({item.duration})</span>
                              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white border border-[#E7E5E4] text-[#44403C]">Est: {item.cost}</span>
                            </div>
                            <h3 className="text-lg font-serif font-medium text-[#1C1917]">{item.activity}</h3>
                            <p className="text-xs font-medium text-[#78716C]">📍 {item.location}</p>
                            <p className="text-xs text-[#57534E] pt-1 leading-relaxed border-t border-[#E7E5E4]/60">{item.notes}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* DESTINATION DETAILS VIEW */}
        {currentView === 'details' && activeDestination && (
          <div className="max-w-4xl mx-auto space-y-12 animate-fadeIn pb-16">
            <button 
              onClick={() => setCurrentView('home')}
              className="text-sm font-medium text-[#78716C] hover:text-[#0F766E] flex items-center gap-2"
            >
              ← Back to Discovery Grid
            </button>

            <div className="space-y-6">
              <div className="relative rounded-3xl overflow-hidden h-[420px] shadow-xl">
                <img src={activeDestination.heroImage} alt={activeDestination.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white space-y-3">
                  <div className="text-xs uppercase tracking-widest text-[#D6D3D1] font-semibold">
                    {activeDestination.region} • {activeDestination.travelTime} away
                  </div>
                  <h1 className="text-4xl md:text-5xl font-serif font-medium">{activeDestination.name}</h1>
                  <p className="text-lg text-[#D6D3D1] max-w-2xl font-light">{activeDestination.shortDescription}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-[#E7E5E4] shadow-sm">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#78716C]">Travel Time</span>
                  <span className="font-serif text-lg font-medium text-[#1C1917]">{activeDestination.travelTime}</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#78716C]">Starting Budget</span>
                  <span className="font-serif text-lg font-medium text-[#1C1917]">₹{activeDestination.budgetNumeric.toLocaleString()} ({activeDestination.budgetLevel})</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#78716C]">Best For</span>
                  <span className="font-serif text-lg font-medium text-[#1C1917]">{activeDestination.bestFor}</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#78716C]">Rating</span>
                  <span className="font-serif text-lg font-medium text-[#1C1917]">★ {activeDestination.rating} / 5.0</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#E7E5E4] space-y-6 shadow-sm">
              <h2 className="text-2xl font-serif font-medium text-[#1C1917]">Top Highlights</h2>
              <div className="space-y-4">
                {activeDestination.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                    <span className="w-6 h-6 rounded-full bg-[#0F766E] text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-sm text-[#44403C] leading-relaxed font-medium">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#E7E5E4] space-y-6 shadow-sm">
              <h2 className="text-2xl font-serif font-medium text-[#1C1917]">Suggested Weekend Rhythm</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] space-y-2">
                  <span className="text-xs uppercase tracking-widest text-[#0F766E] font-semibold">Friday Evening</span>
                  <p className="text-sm text-[#44403C] leading-relaxed">{activeDestination.weekendRhythm.friday}</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] space-y-2">
                  <span className="text-xs uppercase tracking-widest text-[#0F766E] font-semibold">Saturday</span>
                  <p className="text-sm text-[#44403C] leading-relaxed">{activeDestination.weekendRhythm.saturday}</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] space-y-2">
                  <span className="text-xs uppercase tracking-widest text-[#0F766E] font-semibold">Sunday</span>
                  <p className="text-sm text-[#44403C] leading-relaxed">{activeDestination.weekendRhythm.sunday}</p>
                </div>
              </div>
            </div>

            <div className="sticky bottom-6 bg-[#1C1917] text-white p-6 rounded-2xl shadow-2xl flex flex-wrap items-center justify-between gap-4 z-40">
              <div>
                <h3 className="font-serif text-lg">Ready to visit {activeDestination.name}?</h3>
                <p className="text-xs text-[#D6D3D1]">Launch the AI generator preset for this destination.</p>
              </div>
              <button 
                onClick={() => {
                  setFormData({...formData, destination: activeDestination.name, budget: String(activeDestination.budgetNumeric + 1000)});
                  setCurrentView('planner');
                }}
                className="px-6 py-3 rounded-xl bg-[#0F766E] hover:bg-[#0d655e] text-sm font-medium transition-colors shadow-md"
              >
                ✨ Plan This Destination
              </button>
            </div>
          </div>
        )}

        {/* SAVED TRIPS VIEW & EMPTY STATES */}
        {currentView === 'saved' && (
          <div className="space-y-8 animate-fadeIn pb-16">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#0F766E]">Shortlist</span>
              <h1 className="text-3xl md:text-4xl font-serif font-medium text-[#1C1917] mt-1">My Saved Trips</h1>
              <p className="text-sm text-[#78716C] mt-1">Review, edit, or manage your shortlisted weekend itineraries.</p>
            </div>

            {savedTrips.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-[#E7E5E4] space-y-6 shadow-sm max-w-lg mx-auto">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center text-2xl">
                  ❤️
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-medium text-[#1C1917]">No saved trips yet.</h3>
                  <p className="text-sm text-[#78716C] max-w-sm mx-auto">Start planning your first weekend escape or save an itinerary from the discovery feed.</p>
                </div>
                <button 
                  onClick={() => setCurrentView('planner')}
                  className="px-8 py-3.5 rounded-xl bg-[#0F766E] text-white text-sm font-medium hover:bg-[#0d655e] transition-all shadow-md"
                >
                  Plan My Weekend
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {savedTrips.map(trip => (
                  <div key={trip.id} className="bg-white rounded-3xl border border-[#E7E5E4] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                    <div className="relative h-48 overflow-hidden">
                      <img src={trip.image} alt={trip.destination} className="w-full h-full object-cover" />
                      <button 
                        onClick={() => deleteSavedTrip(trip.id)}
                        className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white w-8 h-8 rounded-full text-xs flex items-center justify-center transition-colors"
                        title="Delete saved trip"
                      >
                        ✕
                      </button>
                      <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-[#1C1917] font-medium text-xs px-3 py-1 rounded-full shadow-sm">
                        {trip.dates}
                      </span>
                    </div>

                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs uppercase tracking-wider font-semibold text-[#0F766E]">{trip.vibe || 'Escape'}</span>
                          <span className="text-xs font-semibold text-[#1C1917]">★ {trip.rating}</span>
                        </div>
                        <h3 className="text-2xl font-serif font-medium text-[#1C1917]">{trip.destination}</h3>
                        <p className="text-xs text-[#78716C]">{trip.distance} away • {trip.travelTime}</p>
                      </div>

                      <div className="pt-4 border-t border-[#F5F5F4] flex justify-between items-center">
                        <span className="text-sm font-bold text-[#1C1917]">Est. {trip.budget}</span>
                        <button 
                          onClick={() => {
                            setFormData({...formData, destination: trip.destination});
                            handleGenerateTrip();
                          }}
                          className="px-4 py-2 rounded-xl bg-[#0F766E] text-white text-xs font-medium hover:bg-[#0d655e] transition-colors"
                        >
                          View Itinerary →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#E7E5E4] px-6 lg:px-12 py-8 mt-16 text-center text-xs text-[#78716C] space-y-2">
        <p className="font-medium text-[#44403C]">Weekend Escapes — AI Travel Tech Product</p>
        <p>© {new Date().getFullYear()} Weekend Escapes Inc. Designed for effortless short breaks.</p>
      </footer>

    </div>
  );
}