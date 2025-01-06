import { model, models, Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  userQuantity: Number,
});

const Category = models.Category || model("Category", categorySchema);

export default Category;
