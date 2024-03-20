import create from 'zustand';
import { Session } from '@operation-stacked/shared-services';

interface SessionState {
  activeSession: Session | null;
  setActiveSession: (session: Session | null) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  activeSession: null,
  setActiveSession: (session: Session | null) => set({ activeSession: session }),
}));
