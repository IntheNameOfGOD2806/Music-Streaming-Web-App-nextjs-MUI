"use client";
import "./page.scss";
import { useSearchParams } from "next/navigation";
import { sendRequest } from "@/utils/api";
import { title } from "process";
import { useEffect } from "react";
import { useState } from "react";
import { Container } from "@mui/material";
import Link from "next/link";
export default function SearchPage() {
  const [searchResult, setSearchResult] = useState<ITrackTop[]>([]);
  const searchParams = useSearchParams();
  const Search_KeyWord = searchParams.get("q");
  const getSearchResults = async () => {
    const res = await sendRequest<any>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tracks/search`,
      method: "POST",
      body: {
        title: Search_KeyWord,
        current: 1,
        pageSize: 100,
      },
    });
    if (res) {
      const data = res.data.result as ITrackTop[];

      setSearchResult(data);
    }
  };
  useEffect(() => {
    getSearchResults();
  }, [Search_KeyWord]);
  return (
    <>
    <Container>
      <div className="liked-section-wrapper">
        <div className="liked-section-title">
          <p>Search Results for key word: <span style={{color:"red"}}>{Search_KeyWord}</span></p>
        </div>
        <hr />
        <div className="liked-section-container">
          {searchResult &&
            searchResult.map((track: ITrackTop) => {
              return (
                <>
                <Link  href={`/track/${track._id}?audio=${track.trackUrl}`}>
                 <div className="liked-section-item">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}images/${track.imgUrl}`}
                      alt=""
                    />
                    <div  className="liked-section-item-title">
                      {track.title}
                    </div>
                  </div>
                
                </Link>
                 
                </>
                /////
              );
            })}
        </div>
      </div>
    </Container>
  </>
  );
}
