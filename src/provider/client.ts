"use client";

import { feathers as Feathers } from "@feathersjs/feathers";
import FeathersAuth from "@feathersjs/authentication-client";
import rest from "@feathersjs/rest-client";
import axios from "axios";
import { CONSTANTS } from "../components/constants";

export const host = new URL(CONSTANTS.SERVER_URL);

export const feathers = Feathers();
const restClient = rest(host.origin);

export const axiosInstance = axios.create({
  headers: {
    "X-App-Client": "web-browser",
  },
});

feathers.configure(restClient.axios(axiosInstance));
feathers.configure(
  FeathersAuth({
    storage: window.localStorage,
    storageKey: "undangon_client",
  })
);
