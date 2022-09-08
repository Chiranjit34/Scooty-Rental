import axios from 'axios'
import { toast } from "react-toastify";

export const getAllBikes = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get("http://localhost:8080/api/bikes/getall");
    dispatch({ type: "GET_ALL_BIKES", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const rentBike = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("http://localhost:8080/api/rent/rentbike", reqObj);
    toast.success("You have successfully reserved your bike!");
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    toast.error("Error. Please try later!");
  }
};