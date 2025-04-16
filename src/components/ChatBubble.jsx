import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Iframe */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 bg-white rounded-lg shadow-2xl w-[380px] h-[600px] overflow-hidden">
          <div className="flex justify-between items-center p-3 bg-blue-600 text-white">
            <h3 className="font-semibold">Customer Support</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 p-1 rounded"
            >
              <X size={20} />
            </button>
          </div>
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/QDIRz13_VRaGAd-MdsGB1"
            width="100%"
            height="550px"
            frameBorder="0"
          />
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
};

export default ChatBubble; 