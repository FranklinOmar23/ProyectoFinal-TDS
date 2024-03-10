import server from "./app.js"; // Importa server en lugar de app
import { PORT } from "./config.js";
import "./Data/dbContection.js";

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
