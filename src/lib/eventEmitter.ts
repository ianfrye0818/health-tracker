import EventEmitter from 'events';

export const serverEvents = new EventEmitter();

export interface ServerEvent {
  type: string;
  userId: string;
  sessionId?: string;
  payload: Record<string, any>;
}
