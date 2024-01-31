import axios from "axios";
import { getAuthToken } from "../util/auth";
const token = getAuthToken();
console.log(token);
const header = {
  Authorization: "Bearer " + token,
};
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
const urlEvents = "http://127.0.0.1:8000/api/events/";
const getEvents = () => {
  // const promise = axios.get("http://localhost:3001/submit/");
  const promise = axios.get(urlEvents);
  return promise.then((res) => res.data).catch((error) => error);
};
const fetchEvent = (id) => {
  const urlEachEvent = urlEvents + id;
  const promise = axios.get(urlEachEvent, { headers: header });
  return promise.then((res) => res).catch((error) => error);
};
const submitEvent = (body) => {
  const urlSubmitEvent = urlEvents;
  // const urlSubmitEvent = "http://localhost:3001/submit/";
  const promise = axios.post(urlSubmitEvent, body);
  return promise.then((res) => res).catch((error) => error);
};
const urlEvents2 = "http://127.0.0.1:8000/api/events/self/";
const userSpecificEvent = () => {
  // const urlFetchEvent = "http://localhost:3001/submit/";
  const urlFetchEvent = urlEvents2;

  const promise = axios.get(urlFetchEvent, { headers: header });
  return promise.then((res) => res).catch((error) => error);
};
const fetchParticularEvent = (id) => {
  // const urlFetchParticularEvent = `http://localhost:3001/submit/${id}`;
  const urlFetchParticularEvent = urlEvents + id;
  const promise = axios.get(urlFetchParticularEvent, { headers: header });
  return promise.then((res) => res.data).catch((error) => error);
};
const editParticularEvent = (id, data) => {
  // const urleditParticularEvent = `http://localhost:3001/submit/${id}`;
  const urleditParticularEvent = urlEvents + id + "/";

  const promise = axios.put(urleditParticularEvent, data, { headers: header });
  return promise.then((res) => res.data).catch((error) => error);
};
const getEventMessages = (eventId) => {
  const url = `http://127.0.0.1:8000/api/messages/${eventId}`;
  // const url = `http://localhost:3001/messages?eventId=${eventId}`;
  return axios.get(url);
};

const deleteParticularEvent = (id) => {
  // const urldeleteParticularEvent= `http://localhost:3001/submit/${id}`;
  const urldeleteParticularEvent = urlEvents + id;
  const promise = axios.delete(urldeleteParticularEvent, { headers: header });
  return promise.then((res) => res).catch((error) => error);
};

const createEventMessage = (eventId, message) => {
  const url = `http://127.0.0.1:8000/api/announcements/`;

  const body = {
    content: message,
    broadcast: parseInt(eventId),
  };
  return axios.post(url, body);
};
const urserAccountUrl = "http://localhost:8000/api/user-data/";

const userAccountDatails = () => {
  return axios.get(urserAccountUrl, { headers: header });
};
const editAccountDetails = (name) => {
  const body = {
    name: name,
  };
  return axios.post(urserAccountUrl, body, { headers: header });
};
const handleDeleteMessage = (eventId) => {
  const url = `http://localhost:3001/messages?eventId=${eventId}`;
  return axios.delete(url);
};
const buyTicketUrl = (body) => {
  const url = "http://localhost:8000/api/tickets/";
  return axios.post(url, body);
};
const userChannel = (uid) => {
  const url = `http://localhost:8000/api/self-channels/${uid}`;
  return axios.get(url);
};
const fetchTickets = (id) => {
  const url = `http://localhost:8000/api/tickets/user/${id}`;
  return axios.get(url);
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
  handleDeleteMessage,
  userAccountDatails,
  editAccountDetails,
  buyTicketUrl,
  fetchTickets,
  userChannel,
};
