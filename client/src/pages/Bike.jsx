import React, { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { DatePicker } from "antd";
import moment from "moment";
import { rentBike } from "../redux/actions";
import { useDispatch } from "react-redux";

const Bike = () => {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [bike, setBike] = useState([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalDays, setTotalDays] = useState(0);
  const [driver, setDriver] = useState(false);
  const [total, setTotal] = useState(0);

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const params = useParams();
  const { bikeId } = params;

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      navigate("/login");
    }

    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:8080/api/bikes/bike/${bikeId}`
        );
        console.log(result.data);
        setBike(result.data);
      } catch (err) {
        console.log("Error!");
      }
    };
    fetchData();

    setTotal(totalDays * bike.payPerDay);
    if (driver) {
      setTotal(total + 40 * totalDays);
    }
  }, [bikeId, navigate, driver, total, totalDays, bike.payPerDay]);

  const selectTime = (values) => {
    setFrom(moment(values[0]).format("MMM:DD:yyy HH:mm"));
    setTo(moment(values[1]).format("MMM:DD:yyy HH:mm"));

    setTotalDays(values[1].diff(values[0], "Days"));
  };

  const rentNow = () => {
    const reqObj = {
      user: userInfo._id,
      bike: bike._id,
      totalDays,
      total,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(rentBike(reqObj));
    navigate("/");
  };

  return (
    <Layout>
      <div className="car-container">
        <h3 className="car-rentTitle">Rent a Bike</h3>
        <div className="car-row">
          <div className="car-col">
            <div className="car-groups">
              <div className="car-group">
                <h2 className="car-subtitle">Bike Info</h2>
                <div className="car-info">
                  <span>{bike.name}</span>
                  <span>${bike.payPerDay?.toFixed(2)} Pay Per Day</span>
                </div>
              </div>
              <div className="car-group">
                <h2 className="car-subtitle">Rent A Bike</h2>
                <div className="car-info">
                  <RangePicker
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm:ss"
                    onChange={selectTime}
                  />
                  {from && to && (
                    <>
                      <span>Total Days: {totalDays}</span>
                      <span>Pay Per Day: ${bike.payPerDay?.toFixed(2)}</span>
                      <div className="total">
                        <h1 className="totalTitle">
                          Total Amount: ${total.toFixed(2)}
                        </h1>
                      </div>
                      <button className="rent-now" onClick={rentNow}>
                        Rent Now
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="car-col">
            <div className="car-image">
              <img src={bike.image} className="car-img" alt={bike.name} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Bike;
