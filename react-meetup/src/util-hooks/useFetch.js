import { useState, useEffect } from "react";

const API_URL = "http://localhost:3030";

export const useFetch = ({ url }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getMeetups()
  }, []);

  /**
   * Function that get all meetups
   */
  const getMeetups = () => {
    fetch(API_URL + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }

  /**
   * Function that update a meetup by id
   * @param {string} id 
   * @param {object} content 
   */
  const updateMeetup = (id, content) => {
    fetch(API_URL + url + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(content)
    })
      .then((response) => response.json())
      .then((json) => {
        const newData = data.map(d => {
          if (d.id === id) {
            return json;
          }
          return d;
        });

        setData(newData);
      });
  }

  /**
   * Function that create a new meetup
   * @param {object} content 
   */
  const createMeetup = (content) => {
    fetch(API_URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(content)
    })
      .then((response) => response.json())
      .then((json) => {
        const newData = [...data];
        newData.push(json);

        setData(newData);
      });
  }

  return {
    getMeetups,
    updateMeetup,
    createMeetup,
    data,
  };
};
