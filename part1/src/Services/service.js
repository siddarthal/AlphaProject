import axios from "axios";
const urlSignin = "api/login/";
const signin = (body) => {
  const promise = axios.post(urlSignin, body);
  return promise.then((res) => res.data).catch((error) => error);
};
const urlSignup = "api/signup/";
const signUp = (body) => {
  const promise = axios.post(urlSignup, body);
  return promise.then((res) => res.data).catch((error) => error);
};
const urlEvents = "api/events/";
const getEvents = () => {
  const promise = axios.get(urlEvents);
  return promise.then((res) => res.data).catch((error) => error);
};
const fetchEvent = (id) => {
  const urlEachEvent = `http://localhost:3001/profile/`;
  const promise = axios.get(urlEachEvent);
  return promise.then((res) => res).catch((error) => error);
};
const submitEvent = (body) => {
  const urlSubmitEvent = "http://localhost:3001/submit/";
  const promise = axios.post(urlSubmitEvent, body);
  return promise.then((res) => res).catch((error) => error);
};
export default {
  signin: signin,
  getEvents: getEvents,
  signUp: signUp,
  fetchEvent: fetchEvent,
  submitEvent:submitEvent,
};
