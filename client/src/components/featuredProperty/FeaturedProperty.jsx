import useFetch from "../../hooks/useFetch";
import "./FeaturedProperty.css";

const FeaturedProperty = () => {
  const { data, error, loading } = useFetch("/hotels?featured=true&limit=4");
  const images = [
    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0vNQPzcQjy4bklipCNyJLqwgBvBXighk3Nw&usqp=CAU`,
    `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/4a/38/da/exterior.jpg?w=1100&h=-1&s=1`,
    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1vCor9RwDfHXcXqlYPnfS2nEzzvjemCvE0g&usqp=CAU`,
    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq3szLul9eX_2ABf3FRE-JirAMRTzDwgR_Wg&usqp=CAU`,
  ];
  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data?.map((featured, i) => {
            return (
              <div className="fpItem" key={featured?._id}>
                <img src={images[i]} alt="" className="pListImg" />
                <span className="fpName">{featured?.name}</span>
                <span className="fpCity">{featured?.city}</span>
                <span className="fpPrice">
                  Starting from ${featured?.cheapestPrice}
                </span>
                {featured?.rating && (
                  <div className="fpRating">
                    <button>{`${featured?.rating} / 5.0`}</button>
                    <span>Excellent</span>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default FeaturedProperty;
