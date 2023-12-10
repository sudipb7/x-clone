import Head from "next/head";

interface MetaProps {
  title: string;
  description?: string;
  keywords?: string;
}

const Meta: React.FC<MetaProps> = ({ title, description, keywords }) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <title>{title}</title>
      <link rel="shortcut icon" href="/logo.svg" type="image/svg" />
    </Head>
  );
};

Meta.defaultProps = {
  title: "X | It's whats happening",
  description:
    "Connect with your friends — and other fascinating people. Get in-the-moment updates on the things that interest you.",
  keywords:
    "twitter, X, Social Media, Web development, technology, connect, blog, influencer, business, contact.",
};

export default Meta;
