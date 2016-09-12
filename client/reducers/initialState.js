/* eslint-disable no-console */
import { loadState } from "./localStorage";
const initialState = loadState();

export default {
    user: {},
    items: !!initialState && initialState.items
        ? initialState.items
        : []
};