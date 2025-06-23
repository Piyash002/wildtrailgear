import mongoose, { Schema } from "mongoose";

export interface Tcategory{
    categoryName : string;
    image?: string; // Optional field for category image
}

const categorySchema: Schema<Tcategory> = new Schema<Tcategory>({
    categoryName: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: false,
        trim: true,
    }
}, {
    timestamps: true,
});

export const Category = (mongoose.models.Category as mongoose.Model<Tcategory>) || mongoose.model<Tcategory>('Category', categorySchema);
