import { model, models, Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  userQuantity: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

categorySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Category = models.Category || model("Category", categorySchema);

export default Category;
