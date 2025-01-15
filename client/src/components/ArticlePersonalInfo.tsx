import "../styles/ArticlePersonalInfo.css";

interface ArticlePersonalInfoProps {
  infos: string[];
}

export default function ArticlePersonalInfo({
  infos,
}: ArticlePersonalInfoProps) {
  return (
    <article className="name-container">
      {infos.map((info) => (
        <p key={info}>{info}</p>
      ))}
    </article>
  );
}
