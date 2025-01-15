import { useEffect, useState } from "react";
import "../styles/ContentAdmin.css";
import type { StationItemType } from "../types/itemType";
import ContentAdminItem from "./ContentAdminItem";

interface ContentAdminProps {
  titles: string[];
  path: string;
}

export default function ContentAdmin({ titles, path }: ContentAdminProps) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/${path}`,
      );
      const data = await response.json();
      setItems(data);

      console.info(data);
    })();
  }, [path]);

  return (
    <div className="content-admin-container">
      <input
        type="search"
        id="content-admin-search-bar"
        placeholder="Rechercher"
      />
      <section>
        <div className="content-admin-titles-container">
          <h2>{titles[0]}</h2>
          <h2>{titles[1]}</h2>
        </div>
        <div className="content-admin-items-container">
          {items.map((item: StationItemType) => (
            <ContentAdminItem key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
