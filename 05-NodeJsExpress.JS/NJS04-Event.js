

const EventEmitter = require('events');

// Create event emitter instance
const emitter = new EventEmitter();

// ========== 1. Basic Event ==========
emitter.on('start', () => {
  console.log('[1] Basic event triggered: start');
});
emitter.emit('start');

// ========== 2. Event with Arguments ==========
emitter.on('greet', (name, age) => {
  console.log(`[2] Hello ${name}, age ${age}`);
});
emitter.emit('greet', 'Alice', 25);

// ========== 3. Multiple Listeners ==========
emitter.on('multi', () => {
  console.log('[3] Listener 1');
});
emitter.on('multi', () => {
  console.log('[3] Listener 2');
});
emitter.emit('multi');

// ========== 4. Once Listener ==========
emitter.once('login', () => {
  console.log('[4] This will be shown only once');
});
emitter.emit('login');
emitter.emit('login'); // This won't trigger the listener again

// ========== 5. Removing Listeners ==========
function onPing() {
  console.log('[5] Ping received');
}
emitter.on('ping', onPing);
emitter.emit('ping'); // Should print
emitter.removeListener('ping', onPing);
emitter.emit('ping'); // Nothing happens

// ========== 6. Class Inheriting EventEmitter ==========
class MyEmitter extends EventEmitter {
  notify(message) {
    this.emit('notify', message);
  }
}

const my = new MyEmitter();

my.on('notify', (msg) => {
  console.log(`[6] Notification: ${msg}`);
});

my.notify('New message arrived');

// ========== Extra: Get Listener Count ==========
const count = emitter.listenerCount('greet');
console.log(`[Extra] 'greet' has ${count} listener(s)`);

