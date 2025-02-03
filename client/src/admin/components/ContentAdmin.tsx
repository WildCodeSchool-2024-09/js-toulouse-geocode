import { useCallback, useEffect, useState } from "react";
import "../styles/ContentAdmin.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { useShowNav } from "../contexts/ShowNavProvider";
import type { BaseItemType } from "../types/itemType";
import ContentAdminItem from "./ContentAdminItem";

interface ContentAdminProps {
  titles: string[];
  path: string;
}

export default function ContentAdmin({ titles, path }: ContentAdminProps) {
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [maxElem, seMaxElem] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 10;
  const { auth } = useAuth();
  const { setNavVisible } = useShowNav();
  const navigate = useNavigate();

  const handleClickNext = () => {
    setOffset(offset + limit);
  };

  const handleClickPrevious = () => {
    setOffset(offset - limit);
  };

  const handleChangeSearch = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearch(event.target.value);
    setOffset(0);
  };

  const fetchItems = useCallback(async () => {
    let response: Response;
    if (search === "") {
      response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/${path}?limit=${limit}&offset=${offset}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
    } else {
      response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/${path}?limit=${limit}&offset=${offset}&search=${search}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
    }
    const responseMaxElem = await fetch(
      `${import.meta.env.VITE_API_URL}/api/${path}?search=${search}`,
      {
        method: "GET",
        credentials: "include",
      },
    );
    const dataMaxElem = await responseMaxElem.json();
    const data = await response.json();
    setItems(data);
    seMaxElem(dataMaxElem.length);
  }, [offset, path, search]);

  useEffect(() => {
    if (!auth) {
      console.info("Not authentified");
      navigate("/admin");
    } else {
      setNavVisible(true);
      fetchItems();
    }
  }, [fetchItems, auth, navigate, setNavVisible]);

  return (
    <div className="content-admin-container">
      <input
        type="search"
        id="content-admin-search-bar"
        placeholder="Rechercher"
        onChange={handleChangeSearch}
      />
      <section>
        <div className="content-admin-titles-container">
          <h2>{titles[0]}</h2>
          <h2>{titles[1]}</h2>
        </div>
        <div className="content-admin-items-container">
          {items.map((item: BaseItemType) => (
            <ContentAdminItem key={item.id} item={item} itemType={path} />
          ))}
          <div
            className={`content-admin-pagination ${offset <= 0 ? "start" : offset > maxElem - limit ? "end" : ""}`}
          >
            {offset > 0 && (
              <button
                type="button"
                onClick={handleClickPrevious}
                className="content-admin-pagination-button"
              >
                Page precédente
              </button>
            )}
            {offset < maxElem - limit && (
              <button
                type="button"
                onClick={handleClickNext}
                className="content-admin-pagination-button"
              >
                Page suivante
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
