import { Schema, model } from "mongoose";

// TODO: add createdAt or timestamps to display date

const journalSchema = new Schema({
  notes: {
    type: String,
    required: [true, "Comment field is missing"],
    minlength: 5,
    maxlength: 150,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipeId: {
    type: String,
    required: true,
  },
  recipeName: {
    type: String,
    required: true,
  },
});

export const Journal = model("Journal", journalSchema);
