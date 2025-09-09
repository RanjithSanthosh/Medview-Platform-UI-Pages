import React from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'; // npm install @heroicons/react

export const WelcomeMessage = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center p-8 bg-gray-50">
      <div className="mb-4">
        <ChatBubbleLeftRightIcon className="h-16 w-16 text-gray-400" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Welcome to Your Chat
      </h2>
      <p className="text-gray-500">
        Select a conversation from the sidebar to start messaging.
      </p>
    </div>
  );
};