import mongoose, { Document, Schema, Model } from "mongoose";

interface IProductImage {
  name: string;
  originalName: string;
  buffer: Buffer;
  contentType: string;
}

interface IProduct extends Document {
  sku: string;
  productName: string;
  price: number;
  images?: IProductImage[]; // Define the type as an array of objects
  created_by: string;
  created_name: string;
  updated_by?: string;
  updated_name?: string;
  created_at: Date;
  updated_at: Date;
}

const ProductImageSchema: Schema<IProductImage> = new Schema<IProductImage>({
  name: {
    type: String,
  },
  originalName: {
    type: String,
  },
  buffer: {
    type: Buffer,
  },
  contentType: {
    type: String,
  },
});

const ProductSchema: Schema<IProduct> = new Schema<IProduct>(
  {
    sku: {
      type: String,
    },
    productName: {
      type: String,
      unique: true,
      required: true,
    },
    price: {
      type: Number,
    },
    images: {
      type: [ProductImageSchema], // Reference the Image schema
    },
    created_by: {
      type: String,
    },
    created_name: {
      type: String,
    },
    updated_by: {
      type: String,
    },
    updated_name: {
      type: String,
    },
    created_at: {
      type: Date,
    },
    updated_at: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const ProductModel: Model<IProduct> = mongoose.model<IProduct>(
  "product",
  ProductSchema,
  "product"
);

export { ProductModel, IProductImage, IProduct };
