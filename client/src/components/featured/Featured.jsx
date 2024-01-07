import useFetch from "../../hooks/useFetch";
import "./Featured.css";

const Featured = () => {
  const { data, error, loading } = useFetch(
    "/hotels/countByCity?cities=londan,madrid,Kolkata"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src={`https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`}
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitle">
              <h1>Londan</h1>
              <h2>{data?.[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src={`https://media.istockphoto.com/photos/luxury-resort-picture-id104731717?k=20&m=104731717&s=612x612&w=0&h=40INtJRzhmU1O4Rj24zdY8vj4aGsWpPaEfojaVQ8xBo=`}
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitle">
              <h1>Madrid</h1>
              <h2>{data?.[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm-JK3QAr47ijaITXuhiY6qSAqHF9pSI3ODw&usqp=CAU`}
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitle">
              <h1>Kolkata</h1>
              <h2>{data?.[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
