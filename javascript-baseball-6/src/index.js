import App from './App.js';
import Printer from './Printer.js';

const app = new App();
try {
  await app.play();
} catch (error) {
  Printer.print(error.message);
}
