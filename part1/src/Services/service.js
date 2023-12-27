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
  const promise = axios.get("http://localhost:3001/submit/");
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
const userSpecificEvent = () => {
  const urlFetchEvent = "http://localhost:3001/submit/";
  const promise = axios.get(urlFetchEvent);
  return promise.then((res) => res).catch((error) => error);
};
const fetchParticularEvent = (id) => {
  const urlFetchParticularEvent = `http://localhost:3001/submit/${id}`;
  const promise = axios.get(urlFetchParticularEvent);
  return promise.then((res) => res.data).catch((error) => error);
};
const editParticularEvent = (id, data) => {
  const urleditParticularEvent = `http://localhost:3001/submit/${id}`;
  const promise = axios.put(urleditParticularEvent, data);
  return promise.then((res) => res.data).catch((error) => error);
};
const deleteParticularEvent =(id) =>{
  const urldeleteParticularEvent= `http://localhost:3001/submit/${id}`;
  const promise = axios.delete(urldeleteParticularEvent);
  return promise.then((res) => res).catch((error) => error);
}
const getEventMessages = (eventId) => {
  const url = `http://localhost:3001/messages?eventId=${eventId}`;
  return axios.get(url);
};
const createEventMessage = (eventId, message) => {
  const url = `http://localhost:3001/messages`;
  const body = {
    message: message,
    eventId: eventId,
    userId: 1,
  };
  return axios.post(url, body);
};
export default {
  signin: signin,
  getEvents: getEvents,
  signUp: signUp,
  fetchEvent: fetchEvent,
  submitEvent: submitEvent,
  userSpecificEvent: userSpecificEvent,
  fetchParticularEvent: fetchParticularEvent,
  editParticularEvent,
  getEventMessages,
  createEventMessage,
  deleteParticularEvent,
};
