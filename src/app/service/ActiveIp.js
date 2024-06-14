const { spawn } = require('child_process');

function isUp(ip) {
  return new Promise((resolve, reject) => {
    const pingProcess = spawn('ping', ['-c', '1', ip]);

    pingProcess.stdout.on('data', (data) => {
      console.log(data.toString()); // Optional: Log ping output
      resolve(true); // Assuming successful ping (you might need to parse output for errors)
    });

    pingProcess.stderr.on('data', (data) => {
      console.error(data.toString());
      reject(new Error('Ping failed'));
    });

    pingProcess.on('close', (code) => {
      if (code !== 0) {
        reject(new Error('Ping failed with code:', code));
      }
    });
  });
}

isUp('8.8.8.8')
  .then(() => console.log('IP is up'))
  .catch((error) => console.error('IP is down:', error));
