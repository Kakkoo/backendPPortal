module.exports = (mongoose) => {
  const namepasswordDB = mongoose.model(
    "namepasswordDB",
    mongoose.Schema(
      {
        name: String,
        password: Number
      },
      { timestamps: true }
    )
  );
  return namepasswordDB;
};
