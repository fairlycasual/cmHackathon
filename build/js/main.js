/* application server key obtained from google */
const applicationServerPublicKey = 'BMGUCdgCLy0DLJ2FMfe4vfnL_BbuHa9MMNajPEyGrlr0IOYgOiPnUmjbbyIodIZo6gylfPLb-eBjuDMmfqorLJc';
const pushButton = document.getElementById('push');
let subscription;

/* on page load, test if service workers are supported. If so, register sw.js */
if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push are supported');
  
  navigator.serviceWorker.register('/sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);
    if (Notification.permission == 'default') {            
      // Here we will ask for permission to send notifications
    }
    swRegistration = swReg;
    
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}

const initializeUI = () => {
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    console.log('initial subscription', subscription);

    if (subscription) {
      console.log('User IS subscribed.');
      
    } else {
      console.log('User is NOT subscribed.');
      
    }

    updateBtn(subscription);
  });
}

const updateBtn = (bool) => {
  console.log('updateBtn, subscription = ', bool);
  if (bool === null) {
    console.log('initialRender, push button: ', pushButton);
    subscription = false;
    pushButton.disabled = false;
    pushButton.textContent = 'Enable Push Messaging';
  } else if (bool) {
    console.log('disabling push');
    subscription = !(bool)
    pushButton.textContent = 'Enable Push Messaging';
    pushButton.disabled = false;
  } else {
    console.log('enabling push');
    pushButton.textContent = 'Disable Push Messaging';
    // turn on subscription button if not
   subscription = !(bool === null);
    console.log('line 50, expect(subscription to be true: ', subscription);
    askPermission();
  }
}

const enablePush = () => {
  console.log('enable push invoked,subscription: ', subscription);
  updateBtn(subscription);
  const urlB64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  const updateSubscriptionOnServer = (subscription) => {
    // TODO: Send subscription to application server
  
    const subscriptionJson = document.querySelector('.js-subscription-json');
    const subscriptionDetails = document.querySelector('.js-subscription-details');
  
    if (subscription) {
      subscriptionJson.textContent = JSON.stringify(subscription);
      subscriptionDetails.classList.remove('is-invisible');
    } else {
      subscriptionDetails.classList.add('is-invisible');
    }

  
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);

  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
    .then(function(subscription) {
      console.log('User is subscribed.');
      updateSubscriptionOnServer(subscription);
      subscription = true;
      // turn off the button
      updateBtn();
    })
    .catch(function(err) {
      console.log('Failed to subscribe the user: ', err);
      updateBtn();
  });

  } 
}

askPermission = () => {
  console.log('ask permission invoked');
  return new Promise(function(resolve, reject) {
    const permissionResult = Notification.requestPermission().then(function(result) {    
      console.log('in request callback');    
      resolve(result);
      if (permissionResult === 'granted') {
        enablePush();
      }
      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
      }).then(function(permissionResult) {
        if (permissionResult !== 'granted') {
        throw new Error('We weren\'t granted permission.');
      }
    });
  })
}

