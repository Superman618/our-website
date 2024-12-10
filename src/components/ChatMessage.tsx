import { ImageGrid } from './ImageGrid';

interface ChatMessageProps {
  message: {
    content: string;
    images?: string[];
    isUser: boolean;
  };
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[70%] space-y-2">
        {message.content && (
          <div className={`rounded-lg p-3 ${
            message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'
          }`}>
            {message.content}
          </div>
        )}
        
        {message.images && message.images.length > 0 && (
          <div className="max-w-sm">
            <ImageGrid images={message.images} />
          </div>
        )}
      </div>
    </div>
  );
}; 