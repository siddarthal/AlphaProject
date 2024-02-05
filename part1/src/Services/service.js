import axios from "axios";

const backendURL =
  import.meta.env.VITE_REACT_APP_BACKEND_URL || "http://localhost:8000";
console.log(backendURL, "backendURL");

const urlSignin = backendURL + "/api/login/";
const signin = (body) => {
  const promise = axios.post(urlSignin, body);
  return promise.then((res) => res.data).catch((error) => error);
};
const urlSignup = backendURL + "/api/signup/";
const signUp = (body) => {
  const promise = axios.post(urlSignup, body);
  return promise.then((res) => res.data).catch((error) => error);
};
const urlEvents = backendURL + "/api/events/";
const getEvents = () => {
  const promise = axios.get(urlEvents);
  return promise.then((res) => res.data).catch((error) => error);
};
const getEventsOne = () => {
  const promise = axios.get(urlEvents);
  return promise.then((res) => res).catch((error) => error);
};
const fetchEvent = (id) => {
  const urlEachEvent = urlEvents + id + "/";
  const promise = axios.get(urlEachEvent);
  return promise.then((res) => res).catch((error) => error);
};
const submitEvent = (body, tokens) => {
  const headerS = {
    Authorization: "Bearer " + tokens,
  };
  const urlSubmitEvent = urlEvents;
  console.log(body, "body");
  const promise = axios.post(urlSubmitEvent, body, { headers: headerS });
  return promise.then((res) => res).catch((error) => error);
};
const urlEvents2 = backendURL + "/api/events/self/";
const userSpecificEvent = (tokens) => {
  const headerS = {
    Authorization: "Bearer " + tokens,
  };
  const urlFetchEvent = urlEvents2;

  const promise = axios.get(urlFetchEvent, { headers: headerS });
  return promise.then((res) => res).catch((error) => error);
};
const fetchParticularEvent = (id, tokens) => {
  const headerS = {
    Authorization: "Bearer " + tokens,
  };
  const urlFetchParticularEvent = urlEvents + id;
  const promise = axios.get(urlFetchParticularEvent, { headers: headerS });
  return promise.then((res) => res.data).catch((error) => error);
};
const editParticularEvent = (id, data, tokens) => {
  const headerS = {
    Authorization: "Bearer " + tokens,
  };
  const urleditParticularEvent = urlEvents + id + "/";

  const promise = axios.put(urleditParticularEvent, data, { headers: headerS });
  return promise.then((res) => res.data).catch((error) => error);
};
const getEventMessages = (eventId, tokens) => {
  const url = backendURL + `/api/messages/${eventId}`;
  const headerS = {
    Authorization: "Bearer " + tokens,
  };

  return axios.get(url, { headers: headerS });
};

const deleteParticularEvent = (id, tokens) => {
  const headerS = {
    Authorization: "Bearer " + tokens,
  };
  const urldeleteParticularEvent = urlEvents + id;
  const promise = axios.delete(urldeleteParticularEvent, { headers: headerS });
  return promise.then((res) => res).catch((error) => error);
};

const createEventMessage = (eventId, message, tokens) => {
  const url = backendURL + `/api/announcements/`;
  const headerS = {
    Authorization: "Bearer " + tokens,
  };
  const body = {
    content: message,
    broadcast: parseInt(eventId),
  };
  return axios.post(url, body, { headers: headerS });
};
const urserAccountUrl = backendURL + "/api/user-data/";

const userAccountDatails = (token1) => {
  const header1 = {
    Authorization: "Bearer " + token1,
  };

  return axios.get(urserAccountUrl, { headers: header1 });
};
const editAccountDetails = (name) => {
  const body = {
    name: name,
  };
  return axios.post(urserAccountUrl, body, { headers: header });
};
const handleDeleteMessage = (AID, token1) => {
  const header1 = {
    Authorization: "Bearer " + token1,
  };
  const url = backendURL + `/api/announcements/${AID}`;
  return axios.delete(url, { headers: header1 });
};
const buyTicketUrl = (body) => {
  const url = backendURL + "/api/tickets/";
  return axios.post(url, body);
};
const userChannel = (uid, token1) => {
  const header1 = {
    Authorization: "Bearer " + token1,
  };
  const url = backendURL + `/api/self-channels/${uid}`;
  return axios.get(url, { headers: header1 });
};
const fetchTickets = (id, token) => {
  const url = backendURL + `/api/tickets/user/${id}`;
  const header1 = {
    Authorization: "Bearer " + token,
  };
  return axios.get(url, { headers: header1 });
};

const handleChannelSubscribe = (user, id, token) => {
  const url = backendURL + `/api/volunteers/`;
  const header1 = {
    Authorization: "Bearer " + token,
  };
  const data = {
    user: user,
    event: id,
  };
  return axios.post(url, data, { headers: header1 });
};

const postTicketDetails = (body, token) => {
  const url = backendURL + "/api/tickets/";
  const header1 = {
    Authorization: "Bearer " + token,
  };
  return axios.post(url, body, { headers: header1 });
};
const postPaymentDetails = (body, token) => {
  const url = backendURL + "/api/payments/";
  const header1 = {
    Authorization: "Bearer " + token,
  };
  return axios.post(url, body, { headers: header1 });
};
const getTicketDetails = (id, token) => {
  const url = backendURL + `/api/tickets/${id}/`;
  const header1 = {
    Authorization: "Bearer " + token,
  };
  return axios.get(url, { headers: header1 });
};
const putTicketDetails = (id, body, token) => {
  const url = backendURL + `/api/tickets/${id}/`;
  const header1 = {
    Authorization: "Bearer " + token,
  };
  return axios.put(url, body, { headers: header1 });
};
const resetPassword = (body) => {
  const url = backendURL + "/api/password-reset/";
  return axios.post(url, body);
};
const postUpdatePassword = (body,id, token) => {
  const url = backendURL + `/api/password-update/${id}/${token}/`;
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
  handleDeleteMessage,
  userAccountDatails,
  editAccountDetails,
  buyTicketUrl,
  fetchTickets,
  userChannel,
  getEventsOne,
  handleChannelSubscribe,
  postTicketDetails,
  postPaymentDetails,
  getTicketDetails,
  putTicketDetails,
  resetPassword,
  postUpdatePassword,
};
