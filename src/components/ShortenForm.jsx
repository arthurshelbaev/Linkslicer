import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { gql, useMutation } from "@apollo/client";

const SHORTEN_URL = gql`
  mutation ShortenURL($url: String!) {
    shorten_url(url: $url) {
      short_url {
        id
        url
        short_url
        clicks
        created_at
        updated_at
      }
      operation_status
    }
  }
`;

const ShortenForm = () => {
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const [shortenUrl] = useMutation(SHORTEN_URL, {
    onCompleted: (data) => {
      // Обновить состояние приложения с новой ссылкой
      dispatch(addLink(data.shorten_url.short_url));
      // Очистить поле ввода
      setUrl("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    shortenUrl({ variables: { url } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Введите URL"
      />
      <button type="submit">Сократить</button>
    </form>
  );
};

export default ShortenForm;