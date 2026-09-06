import React, { useState, useEffect } from 'react';

// --- MOCK DATA (PRD Section 14) ---
const DESTINATIONS = [
  {
    id: 'seabrook',
    name: 'Seabrook Coast',
    countryOrRegion: 'Pacific Northwest',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Coastal walks, dramatic sea cliffs, and small local seafood cafés.',
    travelTime: '2h 10m',
    travelMinutes: 130,
    budgetLevel: 'Medium',
    budgetNumeric: 180,
    bestFor: 'Food',
    tags: ['Coastal', 'Food-focused', 'Relaxing'],
    highlights: [
      'Morning tide-pooling along secluded rocky shores.',
      'Fresh catch-of-the-day lunch at the harbor market.',
      'Evening walks wrapped in coastal mist and quiet.'
    ],
    weekendRhythm: {
      friday: 'Arrive just before sunset, check into a cedar cabin, and walk down to the shore.',
      saturday: 'Explore the local seafood shacks, hike the cliffside trail, and read by the fire.',
      sunday: 'Slow coffee at a village bakery, a final beach stroll, and an easy drive home.'
    },
    practicalNotes: {
      gettingThere: 'An easy 2-hour coastal drive via Highway 101.',
      idealpace: 'Slow and restorative',
      whatToBring: 'Windbreaker, comfortable walking shoes, and a good book.'
    },
    accentColor: '#C86D51', // Terracotta
    mood: ['Slow escape', 'Food weekend']
  },
  {
    id: 'pineglass',
    name: 'Pineglass Lake',
    countryOrRegion: 'Highland Ridge',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Quiet alpine trails, glass-like water reflections, and timber cabins.',
    travelTime: '3h 00m',
    travelMinutes: 180,
    budgetLevel: 'Low',
    budgetNumeric: 120,
    bestFor: 'Nature',
    tags: ['Nature', 'Hiking', 'Cabin'],
    highlights: [
      'Paddling across mirror-calm alpine waters at dawn.',
      'Unmarked pine forest trails with panoramic valley overlooks.',
      'Evenings spent stargazing away from city light pollution.'
    ],
    weekendRhythm: {
      friday: 'Drive up through the winding mountain pass, kindle a wood fire, and unpack.',
      saturday: 'Full day hiking the ridge trail with a packed picnic lunch by the glacial stream.',
      sunday: 'Quiet morning paddle, brunch on the cabin deck, and departure.'
    },
    practicalNotes: {
      gettingThere: 'Accessible via sedan; AWD recommended during early spring.',
      idealpace: 'Balanced and active',
      whatToBring: 'Layered fleece, hiking boots, and instant coffee or tea.'
    },
    accentColor: '#4A7C59', // Forest Green
    mood: ['Nature reset']
  },
  {
    id: 'oldharbor',
    name: 'Old Harbor City',
    countryOrRegion: 'Maritime District',
    heroImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Historic brick galleries, bustling weekend markets, and vibrant nightlife.',
    travelTime: '1h 45m',
    travelMinutes: 105,
    budgetLevel: 'Medium',
    budgetNumeric: 210,
    bestFor: 'Culture',
    tags: ['Culture', 'Nightlife', 'Architecture'],
    highlights: [
      'Browsing century-old brick bookshops and modern art spaces.',
      'Sampling artisanal street food at the Saturday warehouse market.',
      'Sipping natural wine in hidden courtyard jazz bars.'
    ],
    weekendRhythm: {
      friday: 'Check into a boutique downtown loft and head out for late-night tapas.',
      saturday: 'Gallery hopping in the morning, market food crawl at noon, live music at night.',
      sunday: 'Slow breakfast at a French bistro, antique shopping, and heading back.'
    },
    practicalNotes: {
      gettingThere: 'Direct regional train or 1h 45m highway commute.',
      idealpace: 'Lively and engaging',
      whatToBring: 'Comfortable city sneakers and a tote bag for market finds.'
    },
    accentColor: '#D39E41', // Citrus/Gold
    mood: ['Culture hit', 'Food weekend', 'Social energy']
  },
  {
    id: 'sunvale',
    name: 'Sunvale Hills',
    countryOrRegion: 'Valley Vineyards',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Scenic vineyard viewpoints, rolling green hills, and intimate dining.',
    travelTime: '2h 30m',
    travelMinutes: 150,
    budgetLevel: 'High',
    budgetNumeric: 320,
    bestFor: 'Romance',
    tags: ['Scenic', 'Romantic', 'Wine'],
    highlights: [
      'Private tastings at family-owned hillside wine estates.',
      'Breathtaking golden-hour viewpoints over the sprawling valley.',
      'Farm-to-table candlelit dinners under olive arbors.'
    ],
    weekendRhythm: {
      friday: 'Arrive for a sunset vineyard tour and a welcome glass of local reserve.',
      saturday: 'Lazy morning sleep-in, bicycle ride between estate farms, long leisurely lunch.',
      sunday: 'Artisanal bakery visit, scenic overlook photo stop, and relaxed drive home.'
    },
    practicalNotes: {
      gettingThere: 'Smooth interstate drive followed by scenic country lanes.',
      idealpace: 'Slow and restorative',
      whatToBring: 'Smart-casual layers and sunglasses.'
    },
    accentColor: '#B85D61', // Soft Rose/Terracotta
    mood: ['Romantic break', 'Slow escape']
  },
  {
    id: 'mossmeadow',
    name: 'Moss & Meadow',
    countryOrRegion: 'The Woodlands',
    heroImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Holistic wellness stays, forest bathing paths, and woodland activities.',
    travelTime: '2h 40m',
    travelMinutes: 160,
    budgetLevel: 'Medium',
    budgetNumeric: 200,
    bestFor: 'Wellness',
    tags: ['Wellness', 'Spa', 'Forest'],
    highlights: [
      'Guided morning meditation among towering cedar trees.',
      'Wood-fired outdoor saunas and natural cold plunge pools.',
      'Herb-infused organic dinners sourced from onsite gardens.'
    ],
    weekendRhythm: {
      friday: 'Check-in, digital detox hand-off, evening herbal tea ceremony.',
      saturday: 'Morning yoga, woodland foraging walk, afternoon spa recovery treatments.',
      sunday: 'Sound bath session, wholesome brunch, and peaceful return journey.'
    },
    practicalNotes: {
      gettingThere: '2h 40m drive north into the protected forest park.',
      idealpace: 'Deeply relaxed',
      whatToBring: 'Loungewear, slip-on shoes, and an open mind.'
    },
    accentColor: '#3F6D59',
    mood: ['Nature reset', 'Slow escape']
  }
];

const MOODS = [
  { id: 'all', label: 'All Escapes' },
  { id: 'Slow escape', label: 'Slow Escape' },
  { id: 'Food weekend', label: 'Food Weekend' },
  { id: 'Nature reset', label: 'Nature Reset' },
  { id: 'Culture hit', label: 'Culture Hit' },
  { id: 'Social energy', label: 'Social Energy' },
  { id: 'Romantic break', label: 'Romantic Break' }
];

export default function WeekendDiscoveryApp() {
  // --- STATE MANAGEMENT (PRD Sections 46, 113, 114) ---
  const [currentView, setCurrentView] = useState('home'); // home, discover, detail, compare, selected
  const [selectedMood, setSelectedMood] = useState('all');
  const [activeDestination, setActiveDestination] = useState(null);
  
  // Saved destinations with localStorage persistence
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('weekend_saved_destinations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Comparison tray
  const [compareIds, setCompareIds] = useState([]);
  
  // Final selected destination confirmation state
  const [finalChoice, setFinalChoice] = useState(null);

  // Filter inputs
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [maxTravelTime, setMaxTravelTime] = useState(240); // in minutes

  useEffect(() => {
    try {
      localStorage.setItem('weekend_saved_destinations', JSON.stringify(savedIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedIds]);

  // Handlers
  const toggleSave = (id, e) => {
    e?.stopPropagation();
    setSavedIds(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('weekend_saved_destinations', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  const toggleCompare = (id, e) => {
    e?.stopPropagation();
    setCompareIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 destinations at a time.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleSelectDestination = (dest) => {
    setFinalChoice(dest);
    setCurrentView('selected');
  };

  // Filter logic
  const filteredDestinations = DESTINATIONS.filter(dest => {
    const matchesMood = selectedMood === 'all' || dest.mood.includes(selectedMood);
    const matchesBudget = selectedBudget === 'all' || dest.budgetLevel.toLowerCase() === selectedBudget.toLowerCase();
    const matchesTime = dest.travelMinutes <= maxTravelTime;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dest.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dest.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesMood && matchesBudget && matchesTime && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#222222] font-sans selection:bg-[#C86D51] selection:text-white">
      {/* NAVIGATION BAR (PRD Section 47) */}
      <header className="sticky top-0 z-50 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#EAE3D9] px-6 py-4 flex items-center justify-between">
        <div 
          onClick={() => setCurrentView('home')} 
          className="cursor-pointer font-serif text-xl tracking-tight font-medium flex items-center gap-2"
        >
          <span className="w-3 h-3 rounded-full bg-[#C86D51]"></span>
          Weekend Escapes
        </div>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <button 
            onClick={() => setCurrentView('discover')} 
            className={`transition-colors hover:text-[#C86D51] ${currentView === 'discover' ? 'text-[#C86D51] underline underline-offset-8' : 'text-[#666666]'}`}
          >
            Discover
          </button>
          
          <button 
            onClick={() => setCurrentView('compare')} 
            className={`transition-colors hover:text-[#C86D51] relative ${currentView === 'compare' ? 'text-[#C86D51] underline underline-offset-8' : 'text-[#666666]'}`}
          >
            Compare 
            {compareIds.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-[#C86D51] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {compareIds.length}
              </span>
            )}
          </button>

          <button 
            onClick={() => setCurrentView('discover')} 
            className={`transition-colors hover:text-[#C86D51] relative ${currentView === 'discover' && savedIds.length > 0 ? 'text-[#C86D51]' : 'text-[#666666]'}`}
          >
            Saved ({savedIds.length})
          </button>
        </nav>
      </header>

      {/* VIEW ROUTER */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* --- 1. HOME VIEW (PRD Section 8.1) --- */}
        {currentView === 'home' && (
          <div className="space-y-16 animate-fadeIn">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-[#2D2A26] text-[#FBF9F5] min-h-[550px] flex flex-col justify-end p-8 md:p-16 shadow-2xl">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80" 
                  alt="Weekend Hero" 
                  className="w-full h-full object-cover opacity-40 scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816] via-[#1A1816]/40 to-transparent"></div>
              </div>

              <div className="relative z-10 max-w-2xl space-y-6">
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs tracking-wider uppercase text-[#EAE3D9]">
                  Curated Weekend Discovery
                </span>
                <h1 className="font-serif text-4xl md:text-6xl font-normal leading-tight">
                  Your next weekend is closer than you think.
                </h1>
                <p className="text-lg text-[#D0CBC2] font-light">
                  Skip the endless directory searches. Find hand-picked, inspiring escapes matched to your exact mood and travel radius.
                </p>
                <div className="pt-4 flex flex-wrap gap-4">
                  <button 
                    onClick={() => setCurrentView('discover')}
                    className="px-8 py-4 rounded-full bg-[#C86D51] text-white font-medium hover:bg-[#b05b41] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Find my weekend escape
                  </button>
                  <button 
                    onClick={() => { setSelectedMood('Slow escape'); setCurrentView('discover'); }}
                    className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-medium transition-all border border-white/20"
                  >
                    Browse Slow Escapes
                  </button>
                </div>
              </div>
            </div>

            {/* Mood Picker Strip (PRD Section 8.2) */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="font-serif text-2xl">Begin with a mood</h2>
                  <p className="text-sm text-[#666666]">Select what your mind and body need most right now.</p>
                </div>
                <button 
                  onClick={() => { setSelectedMood('all'); setCurrentView('discover'); }}
                  className="text-sm font-medium text-[#C86D51] hover:underline"
                >
                  View all destinations →
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {MOODS.filter(m => m.id !== 'all').map(mood => (
                  <div 
                    key={mood.id}
                    onClick={() => { setSelectedMood(mood.id); setCurrentView('discover'); }}
                    className="group cursor-pointer bg-white p-6 rounded-2xl border border-[#EAE3D9] hover:border-[#C86D51] transition-all text-center space-y-3 shadow-sm hover:shadow-md"
                  >
                    <div className="w-10 h-10 mx-auto rounded-full bg-[#F5F1EA] flex items-center justify-center text-[#C86D51] group-hover:bg-[#C86D51] group-hover:text-white transition-colors">
                      ✦
                    </div>
                    <span className="block font-medium text-sm">{mood.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Horizontal Strip */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl">Handpicked Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {DESTINATIONS.slice(0, 3).map(dest => (
                  <div 
                    key={dest.id}
                    onClick={() => { setActiveDestination(dest); setCurrentView('detail'); }}
                    className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-[#EAE3D9] shadow-sm hover:shadow-xl transition-all"
                  >
                    <div className="h-60 overflow-hidden relative">
                      <img src={dest.heroImage} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">
                        {dest.travelTime} away
                      </span>
                    </div>
                    <div className="p-6 space-y-2">
                      <div className="text-xs tracking-wider uppercase text-[#C86D51] font-semibold">{dest.countryOrRegion}</div>
                      <h3 className="font-serif text-xl">{dest.name}</h3>
                      <p className="text-sm text-[#666666] line-clamp-2">{dest.shortDescription}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- 2. DISCOVER & FILTER VIEW (PRD Sections 8.3, 8.4) --- */}
        {currentView === 'discover' && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl">Discover Your Weekend</h1>
              <p className="text-[#666666] text-sm mt-1">Filter through curated escapes designed for seamless short trips.</p>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-6 rounded-2xl border border-[#EAE3D9] space-y-6 shadow-sm">
              {/* Mood selector chips */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#888888] mr-2">Mood:</span>
                {MOODS.map(mood => (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${selectedMood === mood.id ? 'bg-[#C86D51] text-white shadow-sm' : 'bg-[#F5F1EA] text-[#444444] hover:bg-[#EAE3D9]'}`}
                  >
                    {mood.label}
                  </button>
                ))}
              </div>

              <hr className="border-[#EAE3D9]" />

              {/* Secondary filters: Budget, Search, Travel Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#888888] mb-1">Search Keywords</label>
                  <input 
                    type="text" 
                    placeholder="Search cafes, nature, architecture..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-[#F5F1EA] border border-transparent focus:border-[#C86D51] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#888888] mb-1">Budget Level</label>
                  <select 
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-[#F5F1EA] border border-transparent focus:border-[#C86D51] outline-none text-sm cursor-pointer"
                  >
                    <option value="all">Any Budget</option>
                    <option value="Low">Low ($)</option>
                    <option value="Medium">Medium ($$)</option>
                    <option value="High">High ($$$)</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-[#888888] mb-1">
                    <span>Max Travel Time</span>
                    <span className="text-[#C86D51]">{Math.floor(maxTravelTime / 60)}h {maxTravelTime % 60}m</span>
                  </div>
                  <input 
                    type="range" 
                    min="60" 
                    max="300" 
                    step="30"
                    value={maxTravelTime}
                    onChange={(e) => setMaxTravelTime(Number(e.target.value))}
                    className="w-full accent-[#C86D51] cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-[#666666]">Showing {filteredDestinations.length} matching destinations</span>
                {(selectedMood !== 'all' || selectedBudget !== 'all' || searchQuery !== '' || maxTravelTime < 300) && (
                  <button 
                    onClick={() => { setSelectedMood('all'); setSelectedBudget('all'); setSearchQuery(''); setMaxTravelTime(300); }}
                    className="text-xs font-medium text-[#C86D51] hover:underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </div>

            {/* Destination Grid (PRD Section 8.3) */}
            {filteredDestinations.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-[#EAE3D9] space-y-4">
                <p className="font-serif text-xl text-[#666666]">No destinations match your exact criteria.</p>
                <button 
                  onClick={() => { setSelectedMood('all'); setSelectedBudget('all'); setSearchQuery(''); setMaxTravelTime(300); }}
                  className="px-6 py-2 rounded-full bg-[#C86D51] text-white text-sm font-medium"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDestinations.map(dest => {
                  const isSaved = savedIds.includes(dest.id);
                  const isCompared = compareIds.includes(dest.id);
                  return (
                    <div 
                      key={dest.id}
                      onClick={() => { setActiveDestination(dest); setCurrentView('detail'); }}
                      className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-[#EAE3D9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={dest.heroImage} 
                          alt={dest.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button 
                            onClick={(e) => toggleCompare(dest.id, e)}
                            title="Add to compare"
                            className={`p-2 rounded-full backdrop-blur-md transition-colors ${isCompared ? 'bg-[#C86D51] text-white' : 'bg-black/40 text-white hover:bg-black/60'}`}
                          >
                            ⚖️
                          </button>
                          <button 
                            onClick={(e) => toggleSave(dest.id, e)}
                            title="Save destination"
                            className={`p-2 rounded-full backdrop-blur-md transition-colors ${isSaved ? 'bg-[#C86D51] text-white' : 'bg-black/40 text-white hover:bg-black/60'}`}
                          >
                            ♥
                          </button>
                        </div>
                        <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-[#222] font-medium text-xs px-3 py-1 rounded-full shadow-sm">
                          {dest.travelTime} away • From ${dest.budgetNumeric}
                        </span>
                      </div>

                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex gap-2 flex-wrap">
                            {dest.tags.map((tag, idx) => (
                              <span key={idx} className="text-[10px] tracking-wider uppercase font-semibold text-[#C86D51] bg-[#F5F1EA] px-2.5 py-1 rounded-md">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h3 className="font-serif text-2xl">{dest.name}</h3>
                          <p className="text-sm text-[#666666] leading-relaxed">{dest.shortDescription}</p>
                        </div>

                        <div className="pt-4 border-t border-[#F5F1EA] flex justify-between items-center text-xs font-medium text-[#444444]">
                          <span>Best for: {dest.bestFor}</span>
                          <span className="group-hover:translate-x-1 transition-transform text-[#C86D51]">Explore view →</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* --- 3. DESTINATION DETAIL VIEW (PRD Section 8.5) --- */}
        {currentView === 'detail' && activeDestination && (
          <div className="max-w-4xl mx-auto space-y-12 animate-fadeIn pb-16">
            <button 
              onClick={() => setCurrentView('discover')}
              className="text-sm font-medium text-[#666666] hover:text-[#C86D51] flex items-center gap-2"
            >
              ← Back to Discovery Grid
            </button>

            {/* Hero Detail Header */}
            <div className="space-y-6">
              <div className="relative rounded-3xl overflow-hidden h-[450px] shadow-xl">
                <img src={activeDestination.heroImage} alt={activeDestination.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white space-y-3">
                  <div className="text-xs uppercase tracking-widest text-[#EAE3D9] font-semibold">
                    {activeDestination.countryOrRegion} • {activeDestination.travelTime} away
                  </div>
                  <h1 className="font-serif text-4xl md:text-5xl">{activeDestination.name}</h1>
                  <p className="text-lg text-[#EAE3D9] max-w-2xl font-light">{activeDestination.shortDescription}</p>
                </div>
              </div>

              {/* Quick Facts Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-[#EAE3D9] shadow-sm">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#888888]">Travel Time</span>
                  <span className="font-serif text-lg font-medium">{activeDestination.travelTime}</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#888888]">Est. Weekend Cost</span>
                  <span className="font-serif text-lg font-medium">${activeDestination.budgetNumeric} ({activeDestination.budgetLevel})</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#888888]">Best For</span>
                  <span className="font-serif text-lg font-medium">{activeDestination.bestFor}</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#888888]">Ideal Trip Length</span>
                  <span className="font-serif text-lg font-medium">2 Nights / 3 Days</span>
                </div>
              </div>
            </div>

            {/* Why Go / Highlights */}
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#EAE3D9] space-y-6 shadow-sm">
              <h2 className="font-serif text-2xl">Why Go</h2>
              <div className="space-y-4">
                {activeDestination.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-[#F5F1EA]">
                    <span className="w-6 h-6 rounded-full bg-[#C86D51] text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-sm text-[#444444] leading-relaxed">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekend Rhythm */}
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#EAE3D9] space-y-6 shadow-sm">
              <h2 className="font-serif text-2xl">Suggested Weekend Rhythm</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#F5F1EA] space-y-2">
                  <span className="text-xs uppercase tracking-widest text-[#C86D51] font-semibold">Friday Evening</span>
                  <p className="text-sm text-[#444444] leading-relaxed">{activeDestination.weekendRhythm.friday}</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#F5F1EA] space-y-2">
                  <span className="text-xs uppercase tracking-widest text-[#C86D51] font-semibold">Saturday</span>
                  <p className="text-sm text-[#444444] leading-relaxed">{activeDestination.weekendRhythm.saturday}</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#F5F1EA] space-y-2">
                  <span className="text-xs uppercase tracking-widest text-[#C86D51] font-semibold">Sunday</span>
                  <p className="text-sm text-[#444444] leading-relaxed">{activeDestination.weekendRhythm.sunday}</p>
                </div>
              </div>
            </div>

            {/* Practical Notes */}
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#EAE3D9] space-y-6 shadow-sm">
              <h2 className="font-serif text-2xl">Practical Notes</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <span className="block font-semibold text-[#222] mb-1">Getting There</span>
                  <p className="text-[#666666]">{activeDestination.practicalNotes.gettingThere}</p>
                </div>
                <div>
                  <span className="block font-semibold text-[#222] mb-1">Recommended Pace</span>
                  <p className="text-[#666666]">{activeDestination.practicalNotes.idealpace}</p>
                </div>
                <div>
                  <span className="block font-semibold text-[#222] mb-1">What to Bring</span>
                  <p className="text-[#666666]">{activeDestination.practicalNotes.whatToBring}</p>
                </div>
              </div>
            </div>

            {/* Decision Action CTA Bar */}
            <div className="sticky bottom-6 bg-[#2D2A26] text-white p-6 rounded-2xl shadow-2xl flex flex-wrap items-center justify-between gap-4 z-40">
              <div>
                <h3 className="font-serif text-lg">Ready for this weekend?</h3>
                <p className="text-xs text-[#A8A29E]">Select this destination to lock in your weekend plan.</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={(e) => toggleSave(activeDestination.id, e)}
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors"
                >
                  {savedIds.includes(activeDestination.id) ? '♥ Saved' : '♡ Save for later'}
                </button>
                <button 
                  onClick={() => handleSelectDestination(activeDestination)}
                  className="px-6 py-3 rounded-full bg-[#C86D51] hover:bg-[#b05b41] text-sm font-medium transition-colors shadow-md"
                >
                  Select this destination
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- 4. COMPARE VIEW (PRD Section 8.6) --- */}
        {currentView === 'compare' && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl">Destination Comparison</h1>
              <p className="text-[#666666] text-sm mt-1">Side-by-side evaluation of your shortlisted weekend options.</p>
            </div>

            {compareIds.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-[#EAE3D9] space-y-4 shadow-sm">
                <p className="font-serif text-xl text-[#666666]">No destinations selected for comparison yet.</p>
                <p className="text-xs text-[#888888]">Click the balance scale icon (⚖️) on any destination card to compare up to 3 places.</p>
                <button 
                  onClick={() => setCurrentView('discover')}
                  className="px-6 py-3 rounded-full bg-[#C86D51] text-white text-sm font-medium"
                >
                  Browse Destinations
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="grid grid-cols-4 gap-4 min-w-[700px]">
                  {/* Label Column */}
                  <div className="space-y-6 pt-48 font-semibold text-xs uppercase tracking-wider text-[#888888]">
                    <div className="h-12 flex items-center">Travel Time</div>
                    <div className="h-12 flex items-center">Estimated Budget</div>
                    <div className="h-12 flex items-center">Atmosphere</div>
                    <div className="h-12 flex items-center">Best For</div>
                    <div className="h-12 flex items-center">Standout Feature</div>
                    <div className="h-16"></div>
                  </div>

                  {/* Destination Columns */}
                  {compareIds.map(id => {
                    const dest = DESTINATIONS.find(d => d.id === id);
                    if (!dest) return null;
                    return (
                      <div key={dest.id} className="bg-white p-6 rounded-3xl border border-[#EAE3D9] space-y-6 shadow-sm flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="relative h-36 rounded-2xl overflow-hidden">
                            <img src={dest.heroImage} alt={dest.name} className="w-full h-full object-cover" />
                            <button 
                              onClick={() => toggleCompare(dest.id)}
                              className="absolute top-2 right-2 bg-black/60 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center hover:bg-black"
                            >
                              ✕
                            </button>
                          </div>
                          <h3 className="font-serif text-xl">{dest.name}</h3>
                        </div>

                        <div className="space-y-6 text-sm text-[#444444]">
                          <div className="h-12 flex items-center border-t border-[#F5F1EA] font-medium">{dest.travelTime}</div>
                          <div className="h-12 flex items-center border-t border-[#F5F1EA] font-medium">${dest.budgetNumeric} ({dest.budgetLevel})</div>
                          <div className="h-12 flex items-center border-t border-[#F5F1EA]">{dest.tags.join(', ')}</div>
                          <div className="h-12 flex items-center border-t border-[#F5F1EA]">{dest.bestFor}</div>
                          <div className="h-12 flex items-center border-t border-[#F5F1EA] text-xs text-[#666666] line-clamp-2">{dest.shortDescription}</div>
                          
                          <div className="h-16 pt-2 border-t border-[#F5F1EA]">
                            <button 
                              onClick={() => handleSelectDestination(dest)}
                              className="w-full py-2.5 rounded-xl bg-[#C86D51] text-white text-xs font-medium hover:bg-[#b05b41] transition-colors"
                            >
                              Choose This
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- 5. SELECTED DESTINATION CONFIRMATION VIEW (PRD Section 8.7) --- */}
        {currentView === 'selected' && finalChoice && (
          <div className="max-w-2xl mx-auto text-center space-y-8 py-12 animate-fadeIn">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#C86D51]/10 text-[#C86D51] flex items-center justify-center text-3xl shadow-inner">
              ✦
            </div>

            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C86D51]">Destination Confirmed</span>
              <h1 className="font-serif text-4xl md:text-5xl">Your weekend is set for {finalChoice.name}.</h1>
              <p className="text-[#666666] text-sm max-w-md mx-auto">
                Pack your bags, get ready for {finalChoice.bestFor.toLowerCase()} highlights, and enjoy your {finalChoice.travelTime} escape.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#EAE3D9] text-left space-y-4 shadow-sm">
              <div className="flex items-center gap-4">
                <img src={finalChoice.heroImage} alt={finalChoice.name} className="w-20 h-20 rounded-2xl object-cover" />
                <div>
                  <div className="text-xs text-[#C86D51] font-semibold">{finalChoice.countryOrRegion}</div>
                  <h3 className="font-serif text-xl">{finalChoice.name}</h3>
                  <p className="text-xs text-[#666666] mt-1">{finalChoice.travelTime} away • Est. ${finalChoice.budgetNumeric}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: finalChoice.name, text: `Check out my weekend escape to ${finalChoice.name}!` }).catch(() => {});
                  } else {
                    alert('Link copied to clipboard!');
                  }
                }}
                className="px-6 py-3 rounded-full bg-white border border-[#EAE3D9] text-sm font-medium hover:bg-[#F5F1EA] transition-colors"
              >
                Share this idea
              </button>
              <button 
                onClick={() => setCurrentView('discover')}
                className="px-6 py-3 rounded-full bg-[#C86D51] text-white text-sm font-medium hover:bg-[#b05b41] transition-colors"
              >
                Explore More Escapes
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}