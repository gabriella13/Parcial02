
process.env["NTBA_FIX_319"] = 1;
var files = require("fs"); 
const TelegramBot = require('node-telegram-bot-api');

const token = '558053814:AAGgZ8ENqGyhhf6IrppXpkCiQEvBMRcMLMY';


var serialport = require("serialport");
var miSerial = new serialport("COM3", {
  baudRate: 9600,
  autoOpen: true
});

const bot = new TelegramBot(token, {
  polling: true,
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log("El id es " + chatId)
  var respuesta = msg.text;
  if (respuesta == "reiniciar") {
    console.log("Reiniciando...");
    bot.sendMessage(chatId, 'Reiniciando...');
    miSerial.write("R");
  }
});

var idChat = 534322797;
var contenido = fs.readFileSync("contador.json");
var obtenervariables = JSON.parse(contenido);
miSerial.setEncoding('utf8');
miSerial.on('data', function(data) {
  console.log('Data:', data);
  obtenervariables.contador=data;
  bot.sendMessage(idChat, "el valor del contador es:" +  obtenervariables.contador) ;
  
});
