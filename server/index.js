const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const app = express();
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_ORIGIN,
    credentials: true
  }
});

/**
 * rooms: Map<roomName, Map<socketId, username>>
 */
const rooms = new Map();

function getRoomUsers(room) {
  const map = rooms.get(room);
  if (!map) return [];
  return Array.from(map.entries()).map(([id, username]) => ({ id, username }));
}

function setUserInRoom(room, socketId, username) {
  if (!rooms.has(room)) rooms.set(room, new Map());
  rooms.get(room).set(socketId, username);
}

function removeUserFromRoom(room, socketId) {
  const map = rooms.get(room);
  if (!map) return;
  map.delete(socketId);
  if (map.size === 0) rooms.delete(room);
}

function systemMessage(text, room) {
  return {
    id: `sys_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    type: 'system',
    room,
    text,
    ts: Date.now()
  };
}

function chatMessage({ room, username, text }) {
  return {
    id: `msg_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    type: 'chat',
    room,
    username,
    text,
    ts: Date.now()
  };
}

io.on('connection', (socket) => {
  socket.data.username = null;
  socket.data.room = null;

  socket.on('room:join', ({ username, room }) => {
    const cleanUsername = String(username || '').trim().slice(0, 40);
    const cleanRoom = String(room || '').trim().slice(0, 40);

    if (!cleanUsername || !cleanRoom) {
      socket.emit('chat:message', systemMessage('Join failed: username and room are required.', cleanRoom || ''));
      return;
    }

    // Leave any previous room
    if (socket.data.room) {
      const prevRoom = socket.data.room;
      socket.leave(prevRoom);
      removeUserFromRoom(prevRoom, socket.id);
      io.to(prevRoom).emit('room:users', { room: prevRoom, users: getRoomUsers(prevRoom) });
      io.to(prevRoom).emit('chat:message', systemMessage(`${socket.data.username} left the room.`, prevRoom));
    }

    socket.data.username = cleanUsername;
    socket.data.room = cleanRoom;

    socket.join(cleanRoom);
    setUserInRoom(cleanRoom, socket.id, cleanUsername);

    socket.emit('chat:message', systemMessage(`Welcome, ${cleanUsername}!`, cleanRoom));
    socket.to(cleanRoom).emit('chat:message', systemMessage(`${cleanUsername} joined the room.`, cleanRoom));

    io.to(cleanRoom).emit('room:users', { room: cleanRoom, users: getRoomUsers(cleanRoom) });
  });

  socket.on('chat:message', ({ text }) => {
    const room = socket.data.room;
    const username = socket.data.username;

    if (!room || !username) {
      socket.emit('chat:message', systemMessage('You must join a room before sending messages.', room || ''));
      return;
    }

    const cleanText = String(text || '').trim().slice(0, 2000);
    if (!cleanText) return;

    io.to(room).emit('chat:message', chatMessage({ room, username, text: cleanText }));
  });

  socket.on('disconnect', () => {
    const room = socket.data.room;
    const username = socket.data.username;

    if (room && username) {
      removeUserFromRoom(room, socket.id);
      io.to(room).emit('room:users', { room, users: getRoomUsers(room) });
      io.to(room).emit('chat:message', systemMessage(`${username} disconnected.`, room));
    }
  });
});

httpServer.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Chat server listening on http://localhost:${PORT}`);
  console.log(`Allowing client origin: ${CLIENT_ORIGIN}`);
});
