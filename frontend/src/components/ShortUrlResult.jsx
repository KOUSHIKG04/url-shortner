import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Link as LinkIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const ShortUrlResult = ({ shortUrl }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      toast.success("Copied!", {
        // message: "The shortened URL has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error("Failed to copy the URL. Please try again.");
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-10 shadow-md  border-2">
      <CardHeader className="flex flex-col items-center gap-2">
        <CardTitle className="text-center text-lg flex items-center gap-2">
          <LinkIcon className="h-3 w-3  " />
          Shortened URL
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Your link is ready to be shared!
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-3">
        <div className="w-full flex items-center gap-2">
          <Input
            readOnly
            value={shortUrl}
            className="cursor-default text-sm rounded-lg"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={copyToClipboard}
            aria-label="Copy to clipboard"
            className={"cursor-pointer"}
          >
            {copied ? (
              <Check className="w-6 h-6 font-bold text-green-700" />
            ) : (
              <Copy className="w-4 h-4 " />
            )}
          </Button>
        </div>

        {/* {copied && (
          <span className="text-green-600 font-medium text-sm animate-pulse border-2 p-2 px-4 rounded-xl">
            Copied to clipboard!
          </span>
        )} */}

        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          Open in new tab ↗
        </a>
      </CardContent>
    </Card>
  );
};

export default ShortUrlResult;
