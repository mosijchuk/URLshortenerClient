import React, {useState, useContext, useCallback, useEffect, FC} from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "../components/Loader";
import { LinkCard } from "../components/LinkCard";
import { PageContent } from "../components/PageContent";
import {LinkType} from "../types/types";

export const DetailPage:FC = () => {
  const [link, setLink] = useState<LinkType>();
  const {linkId}:{linkId:string} = useParams();
  const { token } = useContext(AuthContext);
  const { loading, request } = useHttp();

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLink(fetched);
    } catch (error) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      {!loading && link && (
        <PageContent pageText="Short link">
          <LinkCard link={link} />
        </PageContent>
      )}
    </>
  );
};
