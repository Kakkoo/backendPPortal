module.exports = (mongoose) => {
  const Tdata = mongoose.model(
    "Tdata",
    mongoose.Schema(
      {
        name: String,
        word: String,
        count: Number,
        meetingId: String,
      },
      { timestamps: true }
    )
  );
  return Tdata;
};
