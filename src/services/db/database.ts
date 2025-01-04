import { Memory } from '../../types';
import { DatabaseOptions, DatabaseStorage, IDatabase } from './types';
import { LocalStorage } from './storage';

export class Database implements IDatabase {
  private readonly storage: DatabaseStorage;
  private readonly storageKey: string;
  private memories: Memory[] = [];
  private _isInitialized = false;
  
  constructor(options: DatabaseOptions = {}) {
    this.storage = options.storage || new LocalStorage();
    this.storageKey = options.storageKey || 'symbaiex_memories';
    this._isInitialized = true;

    if (typeof window !== 'undefined') {
      this.loadFromStorage();
    }
  }

  get isInitialized(): boolean {
    return this._isInitialized;
  }

  private loadFromStorage(): void {
    try {
      const stored = this.storage.getItem(this.storageKey);
      this.memories = stored ? JSON.parse(stored) : [];
    } catch {
      this.memories = [];
    }
  }
  
  private saveToStorage(): void {
    if (!this._isInitialized) {
      return;
    }

    try {
      this.storage.setItem(this.storageKey, JSON.stringify(this.memories));
    } catch (error) {
      console.error('Failed to save memories to storage:', error);
    }
  }

  async getMemories(characterId: string, limit?: number): Promise<Memory[]> {
    if (!this._isInitialized && typeof window !== 'undefined') {
      this.loadFromStorage();
    }

    if (characterId === 'all') {
      return this.memories.sort((a, b) => b.timestamp - a.timestamp);
    }
    
    const filtered = this.memories
      .filter(m => m.character_id === characterId)
      .sort((a, b) => b.timestamp - a.timestamp);
      
    return limit ? filtered.slice(0, limit) : filtered;
  }

  async addMemory(memory: Omit<Memory, 'id'>): Promise<void> {
    if (!this._isInitialized && typeof window !== 'undefined') {
      this.loadFromStorage();
    }

    const newMemory = {
      id: this.memories.length + 1,
      ...memory,
      role: memory.role as 'user' | 'assistant'
    };
    
    this.memories.push(newMemory);
    this.saveToStorage();
  }

  async getConversation(conversationId: string): Promise<Memory[]> {
    if (!this._isInitialized && typeof window !== 'undefined') {
      this.loadFromStorage();
    }

    return this.memories
      .filter(m => m.conversation_id === conversationId)
      .sort((a, b) => a.timestamp - b.timestamp);
  }

  async getConversations(): Promise<Memory[][]> {
    if (!this._isInitialized && typeof window !== 'undefined') {
      this.loadFromStorage();
    }

    const conversations = new Map<string, Memory[]>();
    
    this.memories.forEach(memory => {
      const existing = conversations.get(memory.conversation_id) || [];
      conversations.set(memory.conversation_id, [...existing, memory]);
    });

    return Array.from(conversations.values())
      .sort((a, b) => {
        const aTime = Math.max(...a.map(m => m.timestamp));
        const bTime = Math.max(...b.map(m => m.timestamp));
        return bTime - aTime;
      });
  }

  async getCharacterLogs(): Promise<Memory[]> {
    if (!this._isInitialized && typeof window !== 'undefined') {
      this.loadFromStorage();
    }

    return this.memories
      .filter(m => m.character_id === 'character_forge')
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  async addCharacterLog(character: any): Promise<void> {
    if (!this._isInitialized && typeof window !== 'undefined') {
      this.loadFromStorage();
    }

    const newMemory = {
      id: this.memories.length + 1,
      user_id: 'system',
      character_id: 'character_forge',
      conversation_id: 'character_logs',
      message: JSON.stringify(character),
      role: 'assistant',
      timestamp: Date.now()
    };
    
    this.memories.push(newMemory);
    this.saveToStorage();
  }
}