// window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

// function saveBeforeInstallPromptEvent(evt) {
//   deferredInstallPrompt = evt;
//   installButton.removeAttribute('hidden');
//   deferredInstallPrompt.prompt();
//   evt.srcElement.setAttribute('hidden', true);
//   deferredInstallPrompt.userChoice
//     .then((choice) => {
//       if (choice.outcome === 'accepted') {
//         console.log('User accepted the A2HS prompt', choice);
//       } else {
//         console.log('User dismissed the A2HS prompt', choice);
//       }
//       deferredInstallPrompt = null;
//     });
//   window.addEventListener('appinstalled', logAppInstalled);
// }

// function logAppInstalled(evt) {
//   console.log('du-scales App was installed.', evt);
// }

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can add to home screen
  showInstallPromotion();
});