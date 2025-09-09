// // import React from 'react';
// // import { ChannelList } from 'stream-chat-react';

// // const sort = { last_message_at: -1 };

// // // Custom preview component to better control Tailwind styling
// // const CustomChannelPreview = (props) => {
// //     const { channel, setActiveChannel } = props;
// //     return (
// //         <div
// //             onClick={() => setActiveChannel(channel)}
// //             className="p-3 mx-2 my-1 rounded-lg cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-100"
// //         >
// //             <div className="flex items-center">
// //                 {/* You can add avatars here if you want */}
// //                 <div className="flex-grow">
// //                     <p className="font-semibold text-sm text-gray-800">
// //                         {channel.data.name || channel.data.id || 'Unnamed Channel'}
// //                     </p>
// //                     <p className="text-xs text-gray-500 truncate">
// //                         {channel.state.messages[channel.state.messages.length - 1]?.text ?? 'No messages yet'}
// //                     </p>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }


// // export const ChatSidebar = ({ userId }) => {
// //   const filters = {
// //     type: 'messaging',
// //     members: { $in: [userId] },
// //   };

// //   return (
// //     // We add a wrapper div to control the outer styling
// //     <div className="w-full md:w-80 h-full bg-white border-r border-gray-200 flex flex-col">
// //       <div className="p-4 border-b border-gray-200">
// //         <h2 className="text-xl font-bold text-gray-800">Messages</h2>
// //       </div>
// //       <div className="flex-grow overflow-y-auto">
// //         <ChannelList
// //             filters={filters}
// //             sort={sort}
// //             // Use our custom preview component for better styling control
// //             // Note: For full control, you might use your own component instead of the default Preview
// //             // For simplicity here, we rely on the global CSS override for the 'active' state.
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatSidebar;



// import React from 'react';
// import { ChannelList } from 'stream-chat-react';
// import { UsersIcon } from '@heroicons/react/24/solid';

// const sort = { last_message_at: -1 };

// export const ChatSidebar = ({ userId }) => {
//   const filters = {
//     type: 'messaging',
//     members: { $in: [userId] },
//   };

//   return (
//     // CHANGE: Set a fixed width and a minimum width. It will not resize.
//     <div className="w-64 min-w-[256px] bg-white border-r border-gray-200 flex flex-col">
//       {/* Header */}
//       <div className="p-4 border-b border-gray-200 flex items-center space-x-3 flex-shrink-0">
//         <UsersIcon className="w-6 h-6 text-blue-600"/>
//         <h2 className="text-xl font-bold">Conversations</h2>
//       </div>

//       {/* Channel List - this part will scroll if channels overflow */}
//       <div className="flex-grow overflow-y-auto">
//         <ChannelList
//             filters={filters}
//             sort={sort}
//         />
//       </div>
//     </div>
//   );
// };


import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import { UsersIcon, PlusCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';

const sort = { last_message_at: -1 };

// This is the view for the standard channel list
const ChannelListContainer = () => (
    <div className="flex-grow overflow-y-auto">
        <ChannelList filters={{ type: 'messaging' }} sort={sort} />
    </div>
);

// This is the new view for selecting a user to chat with
const UserListContainer = ({ users, createChannel }) => (
    <div className="flex-grow overflow-y-auto px-2">
        <p className="text-sm text-gray-500 p-2 font-semibold">Start a new chat</p>
        <ul>
            {users.map((user, i) => (
                <li
                    key={user.id}
                    onClick={() => createChannel(user.id)}
                    className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                >
                    {/* You can add user avatars here if you have them */}
                    <span className="font-semibold text-gray-700">{user.name || user.id}</span>
                </li>
            ))}
        </ul>
    </div>
);

export const ChatSidebar = () => {
    const { client, setActiveChannel } = useChatContext();
    const [isCreating, setIsCreating] = useState(false);
    const [users, setUsers] = useState([]);

    const filters = {
        type: 'messaging',
        members: { $in: [client.userID] },
    };

    const fetchUsers = async () => {
        try {
            // Query all users in the app, excluding the current user
            const response = await client.queryUsers({ id: { $ne: client.userID } }, { id: 1 });
            if (response.users.length) {
                setUsers(response.users);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const createChannel = async (targetUserID) => {
        // Create a new channel. The ID is automatically generated by Stream for 1-on-1 chats
        // based on the members' IDs to prevent duplicates.
        const channel = client.channel('messaging', {
            members: [client.userID, targetUserID],
        });

        // .watch() creates the channel if it doesn't exist and subscribes to its events.
        await channel.watch();

        // Set the new channel as the active one
        setActiveChannel(channel);
        setIsCreating(false); // Switch back to the channel list view
    };

    const onCreate = () => {
        fetchUsers();
        setIsCreating(true);
    };

    return (
        <div className="w-64 min-w-[256px] bg-white border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-3">
                    {isCreating ? (
                        <button onClick={() => setIsCreating(false)} className="text-gray-600 hover:text-black">
                            <ArrowLeftIcon className="w-6 h-6" />
                        </button>
                    ) : (
                        <UsersIcon className="w-6 h-6 text-blue-600" />
                    )}
                    <h2 className="text-xl font-bold">{isCreating ? 'New Chat' : 'Conversations'}</h2>
                </div>
                {!isCreating && (
                    <button onClick={onCreate} className="text-gray-600 hover:text-blue-600">
                        <PlusCircleIcon className="w-7 h-7" />
                    </button>
                )}
            </div>

            {/* Conditional Rendering: Show user list or channel list */}
            {isCreating ? (
                <UserListContainer users={users} createChannel={createChannel} />
            ) : (
                <ChannelList filters={filters} sort={sort} />
            )}
        </div>
    );
};

