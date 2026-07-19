// src/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ZodiacSign, ElementType } from '../data/zodiacData';
import type { ChineseZodiacSign } from '../data/chineseZodiac';

const STORAGE_KEY = 'zodiac_profile';
const HISTORY_KEY = 'zodiac_history';

export interface UserProfile {
  name: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  westernSign: ZodiacSign;
  chineseSign: ChineseZodiacSign;
  savedAt: number;
}

export interface HistoryEntry {
  id: string;
  profile: UserProfile;
}

interface UserContextValue {
  profile: UserProfile | null;
  history: HistoryEntry[];
  setProfile: (p: UserProfile) => void;
  clearProfile: () => void;
  removeHistoryEntry: (id: string) => void;
  loadFromHistory: (entry: HistoryEntry) => void;
  currentElement: ElementType | null;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Apply element theme to <html> root (Bonus A)
  useEffect(() => {
    if (profile?.westernSign?.element) {
      document.documentElement.setAttribute('data-element', profile.westernSign.element);
    } else {
      document.documentElement.removeAttribute('data-element');
    }
  }, [profile]);

  const setProfile = useCallback((p: UserProfile) => {
    const saved = { ...p, savedAt: Date.now() };
    setProfileState(saved);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));

    // Bonus C: add to history (max 10 entries, no duplicate names)
    setHistory(prev => {
      const filtered = prev.filter(e => e.profile.name !== p.name);
      const newEntry: HistoryEntry = { id: `${Date.now()}`, profile: saved };
      const next = [newEntry, ...filtered].slice(0, 10);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearProfile = useCallback(() => {
    setProfileState(null);
    localStorage.removeItem(STORAGE_KEY);
    document.documentElement.removeAttribute('data-element');
  }, []);

  const removeHistoryEntry = useCallback((id: string) => {
    setHistory(prev => {
      const next = prev.filter(e => e.id !== id);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const loadFromHistory = useCallback((entry: HistoryEntry) => {
    setProfileState(entry.profile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entry.profile));
    if (entry.profile.westernSign?.element) {
      document.documentElement.setAttribute('data-element', entry.profile.westernSign.element);
    }
  }, []);

  const currentElement: ElementType | null = profile?.westernSign?.element ?? null;

  return (
    <UserContext.Provider value={{
      profile, history, setProfile, clearProfile,
      removeHistoryEntry, loadFromHistory, currentElement,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
