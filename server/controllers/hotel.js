import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updatedHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const allHotels = await Hotel.find({
      ...others,
      cheapestPrice: {
        $gt: min ?? 1,
        $lt: max ?? 999,
      },
    }).limit(req.query.limit);
    res.status(200).json(allHotels);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => Room.findById(room))
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const getHotelById = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  const images = [
    `https://media.istockphoto.com/photos/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab-picture-id472899538?k=20&m=472899538&s=612x612&w=0&h=ZuEBl5Pq1_cn9pUsG_jAGQmiT0UgL1jyl7TZY6w-K0g=`,
    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4ZZd4FMVe9XZVkUzCHYtBbfSq2UiHczohqg&usqp=CAU`,
    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaErAB6DjJdFGw_B51zcoOd2xfS2IhKkR04w&usqp=CAU`,
    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTxvvL3XbD8ULCt8bKGCEI0XXuch8juDKnnQ&usqp=CAU`,
    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs2Kz9GKIXWfnGzLmiATij_xyc1SQNVYm0TQ&usqp=CAU`,
  ];
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotels", count: hotelCount, img: images[0], label: "Hotels" },
      {
        type: "apartments",
        count: apartmentCount,
        img: images[1],
        label: "Apartments",
      },
      { type: "resorts", count: resortCount, img: images[2], label: "Resorts" },
      { type: "villas", count: villaCount, img: images[3], label: "Villas" },
      { type: "cabins", count: cabinCount, img: images[4], label: "Cabins" },
    ]);
  } catch (err) {
    next(err);
  }
};
