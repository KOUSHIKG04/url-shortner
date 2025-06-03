import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createShortUrl } from "@/config/api";

const UrlForm = ({ onUrlShortened }) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /*

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["shortUrl"],
    queryFn: handleSubmit,
  });

  const mutation = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shortUrl"],
      });
    },
  });

  */

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      setIsLoading(true);

      const shortUrl = await createShortUrl(url);

      if (onUrlShortened) {
        onUrlShortened(shortUrl);
      }
    } catch (err) {
      setError(
        err.customMessage || "An error occurred while shortening the URL"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="space-y-2">
          <label htmlFor="url" className="text-sm font-medium">
            ENTER YOUR URL BELOW
          </label>
          <Input
            id="url"
            type="text"
            placeholder="https://example.com/very/long/url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full mt-2 py-5 rounded-xl"
          />
          {error && (
            <p className="mt-4 mb-2 text-destructive text-sm font-normal p-4">
              {error}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full mt-2 py-5 cursor-pointer rounded-xl"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex-col gap-4 w-full flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                <div className="w-2 h-2 border-2 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
              </div>
            </div>
          ) : (
            "SHORTEN URL"
          )}
        </Button>
      </form>
    </>
  );
};

export default UrlForm;
