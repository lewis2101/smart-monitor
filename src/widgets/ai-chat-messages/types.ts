export type MessageType = "message" | "image";
export type MessageRole = "user" | "other";

export type Message = {
  type: MessageType;
  role: MessageRole;
  text: string;
  date: string | Date;
};

export type MessageGroup = {
  date: string | Date;
  messages: Message[];
};

export type AiChatMessagesProps = {
  content: MessageGroup[];
  isWriting?: boolean;
  hint?: string;
};
