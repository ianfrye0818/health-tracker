import React, { useState } from 'react';

function generateSessionId(): string {
  return crypto.randomUUID();
}

type SessionContextType = {
  sessionId: string;
};

const SessionContext = React.createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessionId] = useState(() => generateSessionId());

  return <SessionContext value={{ sessionId }}>{children}</SessionContext>;
}

export const useSession = () => {
  const context = React.useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
