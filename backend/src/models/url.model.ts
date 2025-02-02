import mongoose, { Schema, Document } from "mongoose";

export interface IURL extends Document {
    shortCode: string;
    originalUrl: string;
}

const UrlSchema: Schema = new Schema({
    shortCode: { type: String, required: true },
    originalUrl: { type: String, required: true, unique: true },
});

export default mongoose.model<IURL>("URL", UrlSchema);