import { users, type User, type InsertUser, type Search, type InsertSearch } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveSearch(search: InsertSearch): Promise<Search>;
  getRecentSearches(limit: number): Promise<Search[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private searches: Map<number, Search>;
  private userCurrentId: number;
  private searchCurrentId: number;

  constructor() {
    this.users = new Map();
    this.searches = new Map();
    this.userCurrentId = 1;
    this.searchCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveSearch(insertSearch: InsertSearch): Promise<Search> {
    const id = this.searchCurrentId++;
    const timestamp = new Date();
    const search: Search = { ...insertSearch, id, timestamp };
    this.searches.set(id, search);
    return search;
  }

  async getRecentSearches(limit: number): Promise<Search[]> {
    return Array.from(this.searches.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
