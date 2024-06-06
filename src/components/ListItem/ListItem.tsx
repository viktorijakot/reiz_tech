import { Country } from "../../hooks/useCountriesData";
import styles from "./listItem.module.css";

interface ListItemProps {
  item: Country;
}

export default function ListItem({ item }: ListItemProps) {
  const { name, region, area, independent } = item;

  return (
    <div className={styles.container}>
      <span>{name}</span>
      <span>{region}</span>
      <span>{area}</span>
      <span>{independent}</span>
    </div>
  );
}
