import "./List.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { SearchContext } from "../../context/SearchContext";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location?.state?.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [options, setOptions] = useState(location?.state?.options);
  const { data, error, loading, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
    );
    console.log(data);
  const { dispatch } = useContext(SearchContext);
  const handleClick = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { city: destination, options, date },
    });
    reFetch();
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                type="text"
                placeholder={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in-Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0]?.startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0]?.endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  minDate={new Date()}
                  className="date"
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Min Price / <small>per night</small>
                </span>
                <input
                  type="number"
                  className="lsOptionInput"
                  placeholder={0}
                  onChange={(e) => setMin(e.target.value)}
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Max Price / <small>per night</small>
                </span>
                <input
                  type="number"
                  className="lsOptionInput"
                  placeholder={0}
                  onChange={(e) => setMax(e.target.value)}
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Adult</span>
                <input
                  type="number"
                  className="lsOptionInput"
                  placeholder={options.adult}
                  min={1}
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Children</span>
                <input
                  type="number"
                  className="lsOptionInput"
                  placeholder={options.children}
                  min={0}
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Room </span>
                <input
                  type="number"
                  className="lsOptionInput"
                  placeholder={options.room}
                  min={1}
                />
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "Loading"
            ) : (
              <>
                {data?.map((item, i) => {
                  return <SearchItem item={item} key={item._id} />;
                })}
              </>
            )}
            {!data.length && !loading && <h1>No Hotels Available, Please look for alternatives</h1>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
