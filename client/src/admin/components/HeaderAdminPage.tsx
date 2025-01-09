interface HeaderAdminPageProps {
  title: string;
}

export default function HeaderAdminPage({ title }: HeaderAdminPageProps) {
  return (
    <header>
      <img src="" alt="logo" />
      <div className="title">
        <h1>{title}</h1>
      </div>
    </header>
  );
}
