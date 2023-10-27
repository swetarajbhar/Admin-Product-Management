import mongoose, { Document, Schema, Model } from "mongoose";

interface IAdminUser extends Document {
  fullName: string;
  email: string;
  password: string;
  isActive: boolean;
  xAccessToken: string;
  created_at: Date;
  updated_at: Date;
}

const AdminUserSchema: Schema<IAdminUser> = new Schema<IAdminUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    xAccessToken: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const AdminUserModel: Model<IAdminUser> = mongoose.model<IAdminUser>(
  "adminUser",
  AdminUserSchema,
  "adminUser"
);

export { AdminUserModel };
