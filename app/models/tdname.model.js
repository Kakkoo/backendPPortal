module.exports = (mongoose) => {
  const Tdname = mongoose.model(
    "Tdname",
    mongoose.Schema(
      {
        name: String,
        age: Number,
      },
      { timestamps: true }
    )
  );
  return Tdname;
};
