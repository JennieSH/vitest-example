import { Fragment } from "react";
import Counter from "./components/Counter";

export const metadata = {
  title: "App Router"
};

export default function Page() {
  return (
    <Fragment>
      <h1>App Router</h1>
      <Counter />
    </Fragment>
  );
}
