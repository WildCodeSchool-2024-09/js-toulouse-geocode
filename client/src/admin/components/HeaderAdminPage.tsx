import geocodeLogo from "/images/geocode-logo.svg";

interface HeaderAdminPageProps {
  title: string;
}

export default function HeaderAdminPage({ title }: HeaderAdminPageProps) {
  return (
    <header>
      <img src={geocodeLogo} alt="logo" />
      <div className="header-admin-title">
        <h1>{title}</h1>
      </div>
    </header>
  );
}
