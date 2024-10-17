"use client"
import { Provider } from "react-redux";
import { store } from "@/store";
import Todo from "./components/Todo";

export default function Home() {
  return (
    <div>
      <Provider store={store}>
        <Todo />
      </Provider>
    </div>
  );
}
