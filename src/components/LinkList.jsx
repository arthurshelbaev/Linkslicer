import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gql, useQuery, useSubscription } from "@apollo/client";

const GET_LINKS = gql`
  query GetLinks {
    short_urls {
      id
      url
      short_url
      clicks
      created_at
      updated_at
    }
  }
`;

const SUBSCRIBE_LINKS = gql`
  subscription SubscribeLinks {
    linkUpdated {
      id
      clicks
    }
  }
`;

const LinkList = () => {
  const dispatch = useDispatch();
  const { data } = useQuery(GET_LINKS);
  const links = useSelector((state) => state.links);

  useSubscription(SUBSCRIBE_LINKS, {
    onSubscriptionData: (data) => {
      // Обновить состояние приложения с обновленным количеством переходов
      const updatedLink = data.subscriptionData.data.linkUpdated;
      dispatch(updateLink(updatedLink.id, updatedLink.clicks));
    },
  });

  useEffect(() => {
    if (data) {
      // Обновить состояние приложения со списком ссылок
      dispatch(setLinks(data.short_urls));
    }
  }, [data, dispatch]);

  return (
    <ul>
      {links.map((link) => (
        <li key={link.id}>
          <div>{link.url}</div>
          <div>Короткая ссылка: {link.short_url}</div>
          <div>Количество переходов: {link.clicks}</div>
        </li>
      ))}
    </ul>
  );
};

export default LinkList;