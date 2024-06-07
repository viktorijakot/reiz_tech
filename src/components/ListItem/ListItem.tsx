import { Country } from "../../hooks/useCountriesData";
import styles from "./listItem.module.css";

interface ListItemProps {
  item: Country;
}

export default function ListItem({ item }: ListItemProps) {
  const { name, region, area, independent } = item;

  return (
    <div className={styles.container}>
      <span>Country: {name}</span>
      <span>Region: {region}</span>
      <span>
        Area: {area} m<sup>2</sup>
      </span>
      <span>{independent ? "Independant" : "Not independant"}</span>
    </div>
  );
}
