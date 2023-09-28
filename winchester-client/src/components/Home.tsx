import { Link } from "react-router-dom";

export default () => (
  <div className="flex flex-col justify-center items-center">
    <h1 className="m-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
      Winchester Project
    </h1>
    <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
      Welcome to the winchester project please register
    </p>
    <button className="btn btn-blue">
      <Link to={"register"}>Register Here</Link>
    </button>
  </div>
);
