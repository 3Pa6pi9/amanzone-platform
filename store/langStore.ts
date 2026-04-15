import { create } from 'zustand';

interface LangState {
  lang: 'en' | 'am';
  toggleLang: () => void;
}

export const useLangStore = create<LangState>((set) => ({
  lang: 'en',
  toggleLang: () => set((state) => ({ 
    lang: state.lang === 'en' ? 'am' : 'en' 
  })),
}));