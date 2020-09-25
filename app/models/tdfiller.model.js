module.exports = (mongoose) => {
    const Tdfiller = mongoose.model(
      "Tdfiller",
      mongoose.Schema(
        {
          filler: String,
          howcommon: Number,
        },
        { timestamps: true }
      )
    );
    return Tdfiller;
  };
  