import { Layout } from './Layout';

export const Chat = () => {
  return (
    <Layout>
      <div className="flex flex-col h-full">
        {/* 聊天记录区域 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        
        {/* 输入区域 */}
        <div className="border-t p-4">
          <div className="flex space-x-4">
            <input 
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2"
              placeholder="输入消息..."
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              发送
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}; 