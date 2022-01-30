import React from "react";
import Head from "next/head";
import { withRouter } from "next/router";
import type { Router } from "next/router";
import { Header, Text, Banner, Footer } from "pinus-ui-library";
import { navLinks } from "./links";
import { columns } from "./columns";
import Image from "next/image";
import Link from "next/link";

import { ContentfulImage } from "src/utils/contentful/types";
import { getImages } from "src/utils/contentful/images";
import { Entry } from "contentful";

interface OwnProps {
  title: string;
  description: string;
  bgImage?: string;
  subBanner?: boolean;
  renderSubcontent?: () => React.ReactNode;
  children: React.ReactNode;
  router: Router;
  renderBanner?: boolean;
  renderNavbar?: boolean;
}

const Page: React.FC<OwnProps> = ({
  title,
  description,
  bgImage,
  renderSubcontent,
  children,
  router,
  renderBanner = true,
  renderNavbar = true,
}) => {
  const contactFooter = (
    <div className={`w-48 lg:w-content`}>
      <p className={`font-bold lg:text-base mb-5`}>Contact Us</p>
      <p className={`text-xs lg:text-sm mb-10 lg:mb-5`}>
        Feel free to drop us a message. We would love to hear from you!
      </p>
      <div className={`flex flex-row w-14 justify-between`}>
        <Link
          href="https://www.facebook.com/PerhimpunanIndonesiaNUS/"
          key="facebook-icon"
        >
          <a target="_blank">
            <Image
              alt="Facebook profile"
              src="/assets/icons/fb.png"
              height={20}
              width={20}
            />
          </a>
        </Link>
        <Link href="https://www.instagram.com/pinusonline" key="instagram-icon">
          <a target="_blank">
            <Image
              alt="Instagram profile"
              src="/assets/icons/ig.png"
              height={20}
              width={20}
            />
          </a>
        </Link>
      </div>
    </div>
  );

  React.useEffect(() => {
    async function getData() {
      const base = await getImages();
      setData(base);
    }
    getData();
  }, []);

  const [data, setData] = React.useState<Array<Entry<ContentfulImage>>>();
  if (!data) {
    return <div />;
  }

  //mapping from background-title to the image url (from contentful)
  const urlMap = new Map(
    data.map((image) => [image.fields.title, image.fields.file.url])
  );

  const bgImageMapping = {
    home: urlMap.get("home-background"),
    about: urlMap.get("about-background"),
    admissions: urlMap.get("admissions-background"),
    events: urlMap.get("events-background"),
    contact: urlMap.get("contact-background"),
    aksaraBox: "/assets/backgrounds/aksaraBox.png",
  };

  bgImage = bgImageMapping[bgImage];

  const headers = navLinks.map((entry) => {
    return {
      label: <Text color="white"> {entry.title} </Text>,
      url: "/" + entry.slug,
    };
  });
  const homeLink = "/";
  return (
    <div className={`flex flex-col items-center overflow-hidden`}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />

        <meta property="og:url" content={router.pathname} key="ogurl" />
        <meta
          property="og:image"
          content={"/assets/icons/pinus.png"}
          key="ogimage"
        />
        <meta
          property="og:site_name"
          content="Perhimpunan Indonesia NUS"
          key="ogsitename"
        />
        <meta property="og:title" content={`${title} | PINUS`} key="ogtitle" />
        <meta
          property="og:description"
          content={description}
          key="ogdescription"
        />
        <title>{`${title} | PINUS`}</title>
      </Head>
      <div className="absolute w-full flex flex-col items-center max-w-7xl bg-transparent">
        {renderNavbar && (
          <Header
            headerTitle={
              <Text fontSize="2xl" fontWeight="bold" color="white">
                PINUS
              </Text>
            }
            headers={headers}
            homeLink={homeLink}
            isLoginSupported={false}
          />
        )}
      </div>
      {renderBanner ? (
        <Banner
          title={
            <Text fontSize="5xl" fontWeight="bold" color="white">
              {title}
            </Text>
          }
          bgImage={bgImage}
          subHeader={
            renderSubcontent ? (
              renderSubcontent()
            ) : description ? (
              <Text fontSize="xl">{description}</Text>
            ) : (
              <div />
            )
          }
        />
      ) : null}
      <div className={`min-h-screen w-full`}>{children}</div>
      <Footer links={columns} rightSide={contactFooter} />
    </div>
  );
};

export default withRouter(Page);
