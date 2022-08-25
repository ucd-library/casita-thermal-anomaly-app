// register event listeners for client to respond to service worker events
self.addEventListener('push', event => {
    const data = event.data.json();

    self.registration.showNotification(data.title, {
      body: 'Fire Event!',
    });
});

self.addEventListener('notificationclick', event => {
  console.log('in notificationclick')
  const clickedNotification = event.notification;
  clickedNotification.close();

  const pageUrl = 'http://localhost:3333/eventDetail'
  const promiseChain = clients.openWindow(pageUrl);
  event.waitUntil(promiseChain);
});