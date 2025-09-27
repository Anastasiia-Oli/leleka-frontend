import ClipLoader from "react-spinners/ClipLoader";
import css from "./ClipLoader.module.css";

export default function LoaderScreen() {
  return (
    <div className={css.loaderWrapper}>
      <ClipLoader size={80} color="#36d7b7" />
    </div>
  );
}
