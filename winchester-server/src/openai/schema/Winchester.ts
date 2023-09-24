export interface Character {
  first_name: string;
  last_name: string;
  age: number;
  occupation: string;
  description: string;
}

export interface CharacterList {
  characters: Character[];
}

export interface Message {
  sender: string;
  content: string;
  receiver: string;
}

export interface ChatConversation {
  messages: Message[];
}
