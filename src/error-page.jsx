import {useRouteError} from "react-router-dom";

export default function ErrorPage() {

  const error = useRouteError();
  console.error(error);

  return (
    <>
      <div>
        Oops!
      </div>
      <div>
        Sorry, an unexpected error has occurred.
      </div>
      <div>
        <i>{error.statusText || error.message}</i>
      </div>
    </>
  );
}