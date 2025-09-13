import './App.css';
import React, { useState, useRef } from 'react';
import { 
  MapPin, Bus, Phone, MessageSquare, Leaf, AlertTriangle, 
  Star, Volume2, VolumeX, Users, Navigation, Wifi, WifiOff, 
  Trophy, Package, Shield, Award, Target, Home, X, Search
} from 'lucide-react';

const TransportApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isOnline, setIsOnline] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [language, setLanguage] = useState('english');
  const [userPoints, setUserPoints] = useState(450);
  const [userLevel, setUserLevel] = useState(3);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState('Route 1');
  const [chatOpen, setChatOpen] = useState(false);
  const speechSynthesisRef = useRef(null);

  const languages = {
    english: { name: 'English', code: 'en' },
    hindi: { name: 'हिंदी', code: 'hi' },
    telugu: { name: 'తెలుగు', code: 'te' },
    tamil: { name: 'தமிழ்', code: 'ta' }
  };

  const routes = [
    { id: 1, name: 'Route 12', from: 'City Center', to: 'Airport', buses: 3, nextBus: '5 min' },
    { id: 2, name: 'Route 8', from: 'Railway Station', to: 'University', buses: 2, nextBus: '8 min' },
    { id: 3, name: 'Route 3', from: 'Hospital', to: 'Mall', buses: 4, nextBus: '3 min' }
  ];

  const buses = [
    { id: 'B001', route: 'Route 12', passengers: 25, capacity: 40 },
    { id: 'B002', route: 'Route 8', passengers: 30, capacity: 40 },
    { id: 'B003', route: 'Route 3', passengers: 15, capacity: 35 }
  ];

  const lostItems = [
    { id: 1, item: 'Blue Backpack', location: 'Bus Stop 5', date: '2025-09-12', status: 'found' },
    { id: 2, item: 'Mobile Phone', location: 'Route 2 Bus', date: '2025-09-11', status: 'claimed' },
    { id: 3, item: 'Umbrella', location: 'Central Station', date: '2025-09-10', status: 'found' }
  ];

  const recentTrips = [
    { id: 1, route: 'Route 12', destination: 'Airport', points: 15 },
    { id: 2, route: 'Route 8', destination: 'University', points: 12 }
  ];

  const speakText = (text) => {
    if (voiceEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languages[language].code;
      window.speechSynthesis.speak(utterance);
    }
  };

  const triggerSOS = () => {
    setEmergencyMode(true);
    speakText("Emergency SOS activated. Authorities have been notified.");
    setTimeout(() => setEmergencyMode(false), 5000);
  };

  const addUserPoints = (points) => {
    setUserPoints(prev => prev + points);
    speakText(`You earned ${points} points!`);
  };

  // ------------------- SCREENS -------------------

  const HomeScreen = () => (
    <div className="space-y-4">
      {/* Status Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm font-medium text-gray-700">{isOnline ? 'Online' : 'Offline'}</span>
        </div>
        <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
          <Trophy size={16} className="text-yellow-600" />
          <span className="text-sm font-medium text-yellow-800">{userPoints} points</span>
        </div>
      </div>

      {/* Main Action Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button 
          onClick={() => { setActiveTab('livemap'); speakText('Live buses selected'); }}
          className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <MapPin size={32} className="mx-auto mb-2" />
          <div className="text-lg font-semibold">Live Buses</div>
        </button>

        <button 
          onClick={() => { setActiveTab('routes'); speakText('Routes selected'); }}
          className="bg-green-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Bus size={32} className="mx-auto mb-2" />
          <div className="text-lg font-semibold">Routes</div>
        </button>
      </div>

      {/* Recent Trips */}
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Trips</h3>
        <div className="space-y-3">
          {recentTrips.map(trip => (
            <div key={trip.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <div className="font-medium text-gray-800">{trip.route} → {trip.destination}</div>
              </div>
              <div className="text-green-600 font-medium">+{trip.points} points</div>
            </div>
          ))}
        </div>
      </div>

      {/* SOS Button */}
      <button
        onClick={triggerSOS}
        className="w-full bg-red-600 text-white p-4 rounded-2xl font-semibold text-lg shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
      >
        <Shield size={24} />
        EMERGENCY SOS
      </button>
    </div>
  );

  const LiveMapView = () => (
    <div className="space-y-4">
      <div className="relative h-64 bg-blue-100 rounded-2xl flex items-center justify-center">
        <p className="text-gray-700">Map Placeholder</p>
      </div>
    </div>
  );

  const RoutesView = () => (
    <div className="space-y-4">
      {routes.map(route => (
        <div key={route.id} className="bg-white rounded-2xl p-4 shadow-md border-l-4 border-blue-500">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-gray-800 text-lg">{route.name}</h3>
            <span className="text-green-600 font-bold bg-green-100 px-3 py-1 rounded-full text-sm">
              {route.nextBus}
            </span>
          </div>
          <div className="text-gray-600 mb-3">{route.from} → {route.to}</div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bus size={16} className="text-blue-600" />
              <span className="text-sm text-gray-700">{route.buses} buses active</span>
            </div>
            <button 
              onClick={() => { setSelectedRoute(route.name); setActiveTab('livemap'); }}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 transition-colors"
            >
              Track Live
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const GreenDashboard = () => (
    <div className="space-y-4">
      <div className="bg-green-500 text-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold">Green Impact</h2>
        <p>{userPoints} points saved</p>
      </div>
    </div>
  );

  const LostAndFound = () => (
    <div className="space-y-4">
      {lostItems.map(item => (
        <div key={item.id} className="bg-white p-4 rounded-2xl shadow-md flex justify-between items-center">
          <div>
            <div className="font-medium text-gray-800">{item.item}</div>
            <div className="text-gray-500 text-sm">{item.location} | {item.date}</div>
          </div>
          <div className={`text-sm font-semibold ${item.status === 'found' ? 'text-green-600' : 'text-blue-600'}`}>
            {item.status.toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  );

  const FeedbackView = () => (
    <div className="space-y-4">
      <textarea 
        className="w-full p-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        placeholder="Give your feedback..."
      ></textarea>
      <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-blue-700 transition-colors">
        Submit Feedback
      </button>
    </div>
  );

  const Chatbot = () => (
    chatOpen && (
      <div className="fixed bottom-4 right-4 w-80 bg-white rounded-2xl shadow-lg p-4 z-50">
        <div className="flex justify-between items-center mb-3">
          <div className="font-semibold text-gray-800">SmartBot</div>
          <button onClick={() => setChatOpen(false)}><X size={20} /></button>
        </div>
        <div className="h-40 overflow-y-auto bg-gray-50 p-2 rounded-xl mb-3">
          <p className="text-gray-700 text-sm">Hello! How can I help you?</p>
        </div>
        <input 
          className="w-full p-2 border border-gray-300 rounded-xl text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
          placeholder="Type your message..."
        />
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {emergencyMode && (
        <div className="fixed inset-0 bg-red-600 bg-opacity-95 z-50 flex items-center justify-center">
          <div className="text-center text-white">
            <AlertTriangle size={64} className="mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold mb-2">EMERGENCY SOS ACTIVATED</h2>
            <p className="text-lg">Authorities have been notified. Help is on the way.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold">SmartTransit</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setVoiceEnabled(!voiceEnabled)} className={`p-2 rounded-lg ${voiceEnabled ? 'bg-green-500' : 'bg-gray-500'}`}>
            {voiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <button onClick={() => setIsOnline(!isOnline)} className={`p-2 rounded-lg ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}>
            {isOnline ? <Wifi size={20} /> : <WifiOff size={20} />}
          </button>
          <button onClick={() => setChatOpen(true)} className="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">
            <MessageSquare size={20} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-4 pb-20">
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'livemap' && <LiveMapView />}
        {activeTab === 'routes' && <RoutesView />}
        {activeTab === 'green' && <GreenDashboard />}
        {activeTab === 'lostfound' && <LostAndFound />}
        {activeTab === 'feedback' && <FeedbackView />}
      </div>

      <Chatbot />
    </div>
  );
};

export default TransportApp;


