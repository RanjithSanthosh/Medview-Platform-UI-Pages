import React from 'react';
import {
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';
import { WelcomeMessage } from './WelcomeMessage';

export const ChatWindow = () => {
  return (
    // KEY FIX:
    // 1. `flex-1`: Makes this component take up all remaining horizontal space.
    // 2. `flex flex-col`: Stacks children (Header, MessageList, Input) vertically.
    // 3. `overflow-hidden`: Prevents any weird scrollbars on this container itself.
    <div className="flex-1 flex flex-col overflow-hidden min-h-80 max-w-7xl">
      <Channel EmptyStateIndicator={WelcomeMessage}>
        {/* The Stream `Window` component is smart. When its parent has a defined height 
          (which our flex container now provides), it automatically makes the 
          MessageList scrollable, pinning the Header and Input.
        */}
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </div>
  );
};
