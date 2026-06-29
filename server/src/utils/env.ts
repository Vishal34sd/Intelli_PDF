import 'dotenv/config';
import {z} from 'zod';


const envSchema = z.object({
    PORT : z.string().default("5000").transform((val)=> Number(val)),
    GEMINI_API_KEY : z.string().min(1, "GEMINI_API_KEY is required"),
    MONGODB_ATLAS_URI : z.string().min(1, "MONGODB_ATLAS_URI is required"),
    MONGODB_NAME : z.string().min(1," MONGODB_NAME is required")
})

const parsed = envSchema.safeParse(process.env)

if(!parsed.success){
    console.log("Invalid environment variables");
    process.exit(1);
}

export const env = Object.freeze(parsed.data);