import app from "./app.js";
import { PORT } from "./config.js";
import "./Data/dbContection.js"

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});