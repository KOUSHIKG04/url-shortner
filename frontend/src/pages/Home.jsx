import ShortUrlResult from "@/components/ShortUrlResult";
import UrlForm from "@/components/UrlForm";
import { Link } from "lucide-react";
import React, { useState } from "react";

const Home = () => {
  const [shortUrl, setShortUrl] = useState("");

  const handleUrlShortened = (url) => {
    setShortUrl(url);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
            <Link className="h-5 w-5" />
            URL Shortener
          </h1>
          <p className="text-muted-foreground">
            Enter a long URL and get a shorter version to share easily.
          </p>
        </div>

        <UrlForm onUrlShortened={handleUrlShortened} />

        {shortUrl && <ShortUrlResult shortUrl={shortUrl} />}
      </div>
    </div>
  );
};

export default Home;
