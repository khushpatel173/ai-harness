
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // pwd
console.log(__filename);

const __dirname = path.dirname(__filename); 
console.log(__dirname);

dotenv.config({
    path: path.join(__dirname, ".env")
});