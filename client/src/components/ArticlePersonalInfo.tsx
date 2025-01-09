interface ArticlePersonalInfoProps {
  test: string[];
}

export default function ArticlePersonalInfo({
  test,
}: ArticlePersonalInfoProps) {
  return (
    <article className="name-container">
      {test.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </article>
  );
}
