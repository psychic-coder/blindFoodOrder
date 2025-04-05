'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { restaurants } from '@/data/restaurants';
import { SpeakText } from './SpeakText';
import { playSound } from './PlaySound';

export default function VoiceInput() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognitionRef.current = recognition;

    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        toggleListening();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const toggleListening = () => {
    const recognition = recognitionRef.current;

    if (!recognition) {
      console.error("Speech recognition not initialized");
      return;
    }

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript.toLowerCase();
      setTranscript(result);
      console.log('Voice input:', result);

     
      if (result.includes('show me the restaurants available')) {
        if (pathname === '/') {
          console.log("Navigating to /restaurants...");
          router.push('/restaurants');
        }
      }

      
      if (result.includes('tell me the list of restaurants available')) {
        if (pathname === '/restaurants') {
          const hotelNames = restaurants.map((r) => r.name).join(', ');
          const message = `Here are the hotels available: ${hotelNames}`;
          SpeakText(message);
        }
      }

      
      if (result.includes('show me the menu of')) {
        const matched = result.match(/show me the menu of (.+)/);
        console.log(matched)
        if (matched && matched[1]) {
          const spokenName = matched[1].trim().toLowerCase();
          const hotel = restaurants.find(
            (r) => r.name.toLowerCase() === spokenName
          );

          if (hotel) {
            const encodedName = encodeURIComponent(hotel.name);
            router.push(`/restaurant-card?name=${encodedName}`);
          } else {
            SpeakText(`Sorry, I couldn't find a hotel named ${spokenName}`);
          }
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
    };

    if (isListening) {
      recognition.stop();
      playSound("/sounds/stop.mp3");
    } else {
      recognition.start();
      playSound("/sounds/start.mp3");
    }

    setIsListening((prev) => !prev);
  };

  return (
    <div className="p-4 rounded shadow-lg max-w-md mx-auto bg-white text-black mt-10 text-center">
      <p className="text-lg font-semibold">
        Press <span className="text-blue-600">Spacebar</span> to{' '}
        {isListening ? 'stop' : 'start'} listening 🎤
      </p>
      <p className="mt-4 font-medium">
        Transcript:{' '}
        <span className="text-gray-800">
          {transcript || 'Waiting for input...'}
        </span>
      </p>
    </div>
  );
}
