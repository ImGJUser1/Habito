import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}

const LanguageSelector: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [isOpen, setIsOpen] = useState(false);

  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', region: 'Global' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', region: 'North India' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', region: 'Tamil Nadu' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', region: 'Andhra Pradesh' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', region: 'West Bengal' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', region: 'Maharashtra' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', region: 'Gujarat' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', region: 'Karnataka' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', region: 'Kerala' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', region: 'Punjab' }
  ];

  const selectedLang = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setIsOpen(false);
    // Here you would integrate with i18next or your translation system
    console.log(`Language changed to: ${languageCode}`);
  };

  const getGreeting = (langCode: string) => {
    const greetings: { [key: string]: string } = {
      'en': 'Welcome to Habito!',
      'hi': 'हैबिटो में आपका स्वागत है!',
      'ta': 'ஹாபிட்டோவில் உங்களை வரவேற்கிறோம்!',
      'te': 'హాబిటోకు స్వాగతం!',
      'bn': 'হ্যাবিটোতে আপনাকে স্বাগতম!',
      'mr': 'हॅबिटोमध्ये आपले स्वागत आहे!',
      'gu': 'હેબિટોમાં આપનું સ્વાગત છે!',
      'kn': 'ಹ್ಯಾಬಿಟೊಗೆ ಸುಸ್ವಾಗತ!',
      'ml': 'ഹാബിറ്റോയിലേക്ക് സ്വാഗതം!',
      'pa': 'ਹੈਬਿਟੋ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ!'
    };
    return greetings[langCode] || greetings['en'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-black bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Language Settings
        </h1>
        <p className="text-xl text-gray-300">Choose your preferred language for the best experience</p>
      </div>

      {/* Live Preview */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 rounded-3xl text-center">
        <div className="text-6xl mb-4">{selectedLang.flag}</div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
          {getGreeting(selectedLanguage)}
        </h2>
        <p className="text-gray-300">
          Currently selected: <span className="text-white font-semibold">{selectedLang.nativeName}</span>
        </p>
      </Card>

      {/* Current Selection */}
      <div className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl hover:border-white/40 transition-all duration-300 text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-3xl">{selectedLang.flag}</span>
              <div>
                <div className="text-white font-bold text-lg">{selectedLang.nativeName}</div>
                <div className="text-gray-400 text-sm">{selectedLang.name} • {selectedLang.region}</div>
              </div>
            </div>
            <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              <span className="text-cyan-400 text-xl">⌄</span>
            </div>
          </div>
        </Button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden z-50 shadow-2xl">
            <div className="max-h-96 overflow-y-auto">
              {languages.map((language, index) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full p-4 text-left hover:bg-white/10 transition-all duration-300 flex items-center space-x-4 ${
                    selectedLanguage === language.code ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-l-4 border-cyan-400' : ''
                  }`}
                  style={{
                    animationDelay: `${index * 0.05}s`
                  }}
                >
                  <span className="text-2xl">{language.flag}</span>
                  <div className="flex-1">
                    <div className={`font-medium ${selectedLanguage === language.code ? 'text-cyan-300' : 'text-white'}`}>
                      {language.nativeName}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {language.name} • {language.region}
                    </div>
                  </div>
                  {selectedLanguage === language.code && (
                    <span className="text-cyan-400 text-lg">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Language Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-center hover:scale-105 transition-transform duration-300">
          <div className="text-4xl mb-4">🌍</div>
          <h3 className="text-xl font-bold text-white mb-2">Global Reach</h3>
          <p className="text-gray-400 text-sm">Support for 10+ Indian languages and growing</p>
        </Card>

        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-center hover:scale-105 transition-transform duration-300">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-xl font-bold text-white mb-2">AI Translation</h3>
          <p className="text-gray-400 text-sm">Real-time translation powered by advanced AI</p>
        </Card>

        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-center hover:scale-105 transition-transform duration-300">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-bold text-white mb-2">Cultural Context</h3>
          <p className="text-gray-400 text-sm">Habits and insights adapted to your culture</p>
        </Card>
      </div>

      {/* Apply Button */}
      <div className="text-center">
        <Button
          onClick={() => console.log('Language settings applied')}
          className="px-12 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white font-bold rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
        >
          <span className="flex items-center space-x-3">
            <span>Apply Language Settings</span>
            <span>🚀</span>
          </span>
        </Button>
      </div>
    </div>
  );
};

export default LanguageSelector;