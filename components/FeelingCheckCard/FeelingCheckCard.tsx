import Link from "next/link";
import css from "./FeelingCheckCard.module.css";

const FeelingCheckCard = () => {
  return (
    <div className={css.card}>
      <h2>Як ви себе почуваєте?</h2>
      <h3>Рекомендація на сьогодні:</h3>
      <p> Занотуйте незвичні відчуття у тілі.</p>
      <Link href={"/diary"} className={css.btn}>
        Зробити запис у щоденник
      </Link>
    </div>
  );
};

export default FeelingCheckCard;
