


import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

import { ChatSidebar } from './ChatSidebar';
import { ChatWindow } from './ChatWindow';

// --- Your API keys and user info ---
// IMPORTANT: You may need to generate a new userToken from your Stream dashboard.
const apiKey = 'sy6qy383nk5s';
const userId = '1422028';
const userName = 'solitary-shadow-3';
// --- PASTE YOUR NEW TOKEN HERE ---
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTQyMjAyOCJ9.N270U1tiZJW6leTqOsMJY6hD2Z8UVy4sxDpab6vJye0';

const user = {
  id: userId,
  name: userName,
  image: `https://getstream.io/random_png/?name=${userName}`,
};

// Initialize the client
const client = StreamChat.getInstance(apiKey);

const App = () => {
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    // This function handles the connection
    const setupClient = async () => {
      try {
        // The connectUser function will connect the user and authenticate the client.
        // It's asynchronous, so we use await.
        await client.connectUser(user, userToken);
        setIsClientReady(true);
      } catch (error)
      {
        console.error('An error occurred while connecting the user:', error);
      }
    };

    // Only connect if the client isn't already connected
    if (!client.userID) {
      setupClient();
    }

    // It's a good practice to disconnect the user when the component unmounts.
    // This is especially important in a larger app to prevent memory leaks.
    return () => {
      if (client) {
        client.disconnectUser();
        setIsClientReady(false);
      }
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount

  // Show a loading indicator while the client is connecting
  if (!isClientReady) {
    return <div className="flex h-screen items-center justify-center">Connecting chat...</div>;
  }

  return (
    <Chat client={client} theme="str-chat__theme-light ">
      {/* Centered chat container, max width, sidebar fixed, chat window flexes but constrained */}
  <div className="flex h-[80vh] w-full overflow-hidden bg-gray-50 font-sans text-gray-800">
        <ChatSidebar userId={userId} />
        <ChatWindow />
      </div>
    </Chat>
  );
};

export default App;

