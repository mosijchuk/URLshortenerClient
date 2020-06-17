import React, {useState, useContext, useCallback, useEffect, FC} from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "../components/Loader";
import { LinkList } from "../components/LinkList";
import { PageContent } from "../components/PageContent";
import {LinkType} from "../types/types";

export const LinksPage:FC = () => {
  const [links, setLinks] = useState<LinkType[]>([]);
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();

  const getLinks = useCallback(async () => {
    try {
      const fetchedLinks:LinkType[] = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(fetchedLinks);
    } catch (error) {}
  }, [token, request]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      {!loading && links && (
        <PageContent pageText="My links" params={{ align: "alignTop" }}>
          <LinkList links={links} />
        </PageContent>
      )}
    </>
  );
};
