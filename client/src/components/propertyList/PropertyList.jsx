import useFetch from "../../hooks/useFetch";
import "./PropertyList.css";

const PropertyList = () => {
  const { data, error, loading } = useFetch("/hotels/countByType");
  return (
    <div className="pList">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data?.map((card, i) => {
            return (
              <div className="pListItem" key={i}>
                <img src={card?.img} alt="" className="pListImg" />
                <div className="pListTitles">
                  <h1>{card?.label}</h1>
                  <h2>{`${card?.count} ${card?.type}`}</h2>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default PropertyList;
