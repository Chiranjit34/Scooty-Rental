import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import { getAllBikes } from "../redux/actions";
import { DatePicker } from "antd";
import axios from "axios";

const Home = () => {
  const { RangePicker } = DatePicker;
  const navigate = useNavigate();

  const { bikes } = useSelector((state) => state.reducer);
  const { loading } = useSelector((state) => state.loading);
  const [totalBike, setTotalBike] = useState([]);
  const [category, setCategory] = useState([]);
  const [query, setQuery] = useState("");

  console.log(bikes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBikes());
  }, [dispatch]);

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      navigate("/login");
    }

    setTotalBike(bikes);
  }, [bikes, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8080/api/category");
      console.log(result.data);
      setCategory(result.data);
    };
    fetchData();
  }, []);

  const setFilter = () => {
    let temp = [];

    for (let bike of bikes) {
      if (bike.bookedTimeSlots.length === 0) {
        temp.push(bike);
      }
    }

    setTotalBike(temp);
  };

  const filterResult = (catItem) => {
    const catResult = totalBike.filter((curCat) => {
      return curCat.type === catItem;
    });
    setTotalBike(catResult);
  };

  const keys = ["type"];

  const search = () => {
    return totalBike.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  return (
    <Layout>
      <div className="slider">
        <div className="left">
          <h1 className="title">Bikes For Rent</h1>
        </div>
        <div className="right">
          <img src="./images/slider/peugeot.png" alt="" />
        </div>
      </div>
      <div className="content">
        <div className="content-row">
          <h1 className="big-title">Top Bikes for Rent</h1>
        </div>
        <div className="content-flex">
          <div className="content-row flex-1">
            <div className="div-filter">
              <h2 className="car-subtitle">Filter by Search</h2>
              <input
                type="search"
                placeholder="Search..."
                onChange={(e) => setQuery(e.target.value)}
                className="search"
              />
            </div>
            <div className="div-filter">
              <h2 className="car-subtitle">Filter for Availability</h2>
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm:ss"
                onChange={setFilter}
              />
            </div>
            <div className="div-filter">
              <h2 className="car-subtitle">Filter by Type</h2>
              <div className="filter-btns">
                <button
                  onClick={() => setTotalBike(bikes)}
                  className="btn-type"
                >
                  All
                </button>
                {category.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => filterResult(cat.type)}
                    className="btn-type"
                  >
                    {cat.type}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="content-row flex-2">
            {loading ? (
              <Loading />
            ) : (
              <div className="content-groups">
                {search(totalBike).map((bike) => (
                  <div className="card" key={bike._id}>
                    <div className="card-body">
                      <img
                        src={bike.image}
                        className="img-cars"
                        alt={bike.name}
                      />
                    </div>
                    <div className="card-footer">
                      <div className="card-footer-top">
                        <h3 className="car-title">{bike.name}</h3>
                        <p className="per-day">
                          Per Day:{" "}
                          <span className="bold-price">
                            ${bike.payPerDay.toFixed(2)}
                          </span>
                        </p>
                      </div>
                      <div className="card-footer-bottom">
                        <button className="rent-now">
                          <Link to={`/car/${bike._id}`} className="rent-link">
                            Rent Now
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
