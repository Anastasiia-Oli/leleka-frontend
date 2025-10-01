import Link from "next/link";
import css from "./FeelingCheckCard.module.css";

const FeelingCheckCard = () => {
  return (
    <div className={css.card}>
      <div className={css.textBlock}>
        <h3 className="header-third">Як ви себе почуваєте?</h3>
        <div className={css.advice}>
          <p className="text-bold">Рекомендація на сьогодні:</p>
          <p className="text-primary"> Занотуйте незвичні відчуття у тілі.</p>
        </div>
      </div>
      <Link href={"/diary"} className={`${css.btn} text-medium`}>
        Зробити запис у щоденник
      </Link>
    </div>
  );
};

export default FeelingCheckCard;
