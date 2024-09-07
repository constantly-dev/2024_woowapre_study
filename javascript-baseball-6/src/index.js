import App from './controller/App.js';
import Printer from './view/utils/Printer.js';

const app = new App();
try {
  await app.play();
} catch (error) {
  Printer.print(error.message);
}
