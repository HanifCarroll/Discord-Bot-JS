const linuxRant = require('./config').LINUX_RANT;

let lastTymenTime = 0;
let lastLinuxTime = 0;
const tymenTimeout = 30;
const linuxTimeout = 60;

module.exports.sendHeheTymen = (message, content) => {
  if (content !== 'hehe') {
    return;
  }

  const currentTime = Math.floor(Date.now() / 1000)

  if (currentTime - lastTymenTime < tymenTimeout) {
    return;
  }

  if (Math.random() < 0.8) {
    message.channel.send('tymen');
  } else {
    message.channel.send('notymen');
  }

  lastTymenTime = currentTime;
}

module.exports.sendLinuxRant = (message, content) => {
  if (!(content.includes('linux') && !content.includes('gnu'))) {
    return;
  }

  const currentTime = Math.floor(Date.now() / 1000)

  if (currentTime - lastLinuxTime >= linuxTimeout) {
    message.channel.send(linuxRant);
    lastLinuxTime = currentTime;
  }
}
