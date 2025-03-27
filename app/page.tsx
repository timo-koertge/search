"use client";

import { useEffect, useState } from "react";
import { bangs } from "@/bang";
import "./globals.css";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

function NoSearchDefaultPage() {
  const url = 'https://search.tke.gg?q=%s';

  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-row items-center justify-center select-none">
      <div className="w-fit h-fit flex flex-col items-center gap-2">
        <div className="text-2xl font-bold text-center">Search</div>
        <div className="text-center text-sm text-muted-foreground">
          You can use <Link href="https://duckduckgo.com/bang.html" target="_blank" className="underline underline-offset-2 hover:text-accent-foreground transition duration-200">all of DuckDuckGo's bangs.</Link><br />
          Start by adding the following URL as a custom search engine to your browser.
        </div>
        <div className="relative w-[13.7rem]">
          <Input
            disabled={true}
            defaultValue={url}
          />
          <Button
            onClick={handleCopy}
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 -mr-2 cursor-pointer"
          >
            {copied ? <Check /> : <Copy />}
          </Button>
        </div>
      </div>
    </div>
  );
}

function getBangRedirectUrl(query: string) {
  const LS_DEFAULT_BANG = localStorage.getItem("default-bang") ?? "g";
  const defaultBang = bangs.find((b) => b.t === LS_DEFAULT_BANG);

  const match = query.match(/!(\S+)/i);
  const bangCandidate = match?.[1]?.toLowerCase();
  const selectedBang = bangs.find((b) => b.t === bangCandidate) ?? defaultBang;

  const cleanQuery = query.replace(/!\S+\s*/i, "").trim();
  const searchUrl = selectedBang?.u.replace(
    "{{{s}}}",
    encodeURIComponent(cleanQuery).replace(/%2F/g, "/")
  );

  return searchUrl || null;
}

export default function Page() {
  const [query, setQuery] = useState<string | null>(null);

  useEffect(() => {
    const queryParam = new URLSearchParams(window.location.search).get("q")?.trim() ?? "";
    setQuery(queryParam);

    if (queryParam) {
      const searchUrl = getBangRedirectUrl(queryParam);
      if (searchUrl) {
        window.location.replace(searchUrl);
      }
    }
  }, []);

  if (!query) {
    return <NoSearchDefaultPage />;
  }

  return null;
}

