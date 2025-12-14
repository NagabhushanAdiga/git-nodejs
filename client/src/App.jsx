import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

function nowTime(ts = Date.now()) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(ts));
  } catch {
    return new Date(ts).toLocaleTimeString();
  }
}

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

export default function App() {
  const [phase, setPhase] = useState('join'); // 'join' | 'chat'
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('general');
  const [error, setError] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (phase !== 'chat') return;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function cleanupSocket() {
    if (socketRef.current) {
      socketRef.current.removeAllListeners();
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setIsConnected(false);
  }

  function joinChat(e) {
    e.preventDefault();
    setError('');

    const u = username.trim();
    const r = room.trim();
    if (!u) return setError('Please enter a username.');
    if (!r) return setError('Please enter a room name.');

    cleanupSocket();

    const s = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 8
    });

    socketRef.current = s;

    s.on('connect', () => {
      setIsConnected(true);
      s.emit('room:join', { username: u, room: r });
    });

    s.on('disconnect', () => {
      setIsConnected(false);
    });

    s.on('room:users', (payload) => {
      setUsers(payload?.users || []);
    });

    s.on('chat:message', (msg) => {
      if (!msg) return;
      setMessages((prev) => prev.concat(msg));
    });

    s.on('connect_error', (err) => {
      setError(err?.message ? `Socket error: ${err.message}` : 'Socket connection error');
    });

    setMessages([]);
    setUsers([]);
    setPhase('chat');
  }

  function leaveChat() {
    cleanupSocket();
    setPhase('join');
    setMessages([]);
    setUsers([]);
    setDraft('');
  }

  function sendMessage(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;

    const s = socketRef.current;
    if (!s || !s.connected) {
      setError('Not connected to server yet.');
      return;
    }

    s.emit('chat:message', { text });
    setDraft('');
  }

  if (phase === 'join') {
    return (
      <div className="container">
        <div className="card">
          <div className="header">
            <h1>Real-time Chat</h1>
            <div className="badge">Socket.IO + React</div>
          </div>
          <form className="form" onSubmit={joinChat}>
            {error ? <div className="error">{error}</div> : null}

            <div className="formRow">
              <div className="label">Username</div>
              <input
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. alex"
                autoFocus
              />
            </div>

            <div className="formRow">
              <div className="label">Room</div>
              <input
                className="input"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="e.g. general"
              />
            </div>

            <button className="button" type="submit">
              Join room
            </button>
            <div className="badge">
              Server: <span style={{ color: 'var(--text)' }}>{SOCKET_URL}</span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const connectedBadge =
    phase !== 'chat' ? 'Not connected' : isConnected ? 'Connected' : 'Reconnecting…';

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1>
            Room: <span style={{ color: 'var(--text)' }}>{room.trim()}</span>
          </h1>
          <div className="badge">
            {connectedBadge} ·{' '}
            <button className="button" onClick={leaveChat}>
              Leave
            </button>
          </div>
        </div>

        <div className="layout">
          <aside className="sidebar">
            <p className="sidebarTitle">You</p>
            <div className="pill">
              <span className="dot" />
              <span>{username.trim()}</span>
            </div>

            <p className="sidebarTitle" style={{ marginTop: 16 }}>
              People in room ({users.length})
            </p>
            <ul className="userList">
              {users.map((u) => (
                <li className="userItem" key={u.id}>
                  <span>{u.username}</span>
                  <span className="dot" />
                </li>
              ))}
            </ul>

            <p className="sidebarTitle" style={{ marginTop: 16 }}>
              Tips
            </p>
            <div className="badge">
              Open a second tab and join the same room to test real-time messaging.
            </div>
          </aside>

          <main className="main">
            <div className="messages">
              {messages.map((m) => {
                if (m.type === 'system') {
                  return (
                    <div key={m.id} className="system">
                      {m.text}
                    </div>
                  );
                }

                const mine = m.username === username.trim();
                return (
                  <div key={m.id} className={`row ${mine ? 'me' : ''}`}>
                    <div className={`bubble ${mine ? 'me' : ''}`}>
                      <div className="meta">
                        <span>{mine ? 'You' : m.username}</span>
                        <span>{nowTime(m.ts)}</span>
                      </div>
                      <div className="text">{m.text}</div>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            <form className="composer" onSubmit={sendMessage}>
              <input
                className="input"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message…"
              />
              <button className="button" type="submit" disabled={!draft.trim()}>
                Send
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
