module.exports = (mongoose) => {
  const Tdmeetingname = mongoose.model(
    "Tdmeetingname",
    mongoose.Schema(
      {
        meetingname: String,
      },
      { timestamps: true }
    )
  );
  return Tdmeetingname;
};
