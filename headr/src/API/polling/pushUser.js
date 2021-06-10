import axios from "axios";

/**
 * long-polling
 *
 * @module pushUser
 * @return {object} Promise
 */

export default (data) =>
  //disable mocking userData for prerender
  process.env.NODE_ENV === "development"
    ? new Promise((res) => {
        // эмуляция апи
        setTimeout(
          () =>
            res({
              data:
                // Вам пишут сообщение...
                // {
                //   id: 4,
                //   channel: "push-user-4292155",
                //   text:
                //     "=%7B%22callback%22%3A%22_writeToMe%22%2C%22order_id%22%3A%228941929%22%7D",
                //   tag: "1",
                //   time: "Mon, 16 Dec 2019 06:58:14 GMT",
                //   eventid: "",
                // },

              // Заявка на бронь аннулирована
              {
                "id": 3,
                "channel": "push-user-4292155",
                "text": "=%7B%22token%22%3A%22cron_orderautorejectunreadowner%22%2C%22seven_id%22%3A8941929%7D",
                "tag": "1",
                "time": "Mon, 16 Dec 2019 06:55:15 GMT",
                "eventid": ""
              }

              // Клиент отменил заявку
              // {
              //   "id": 7,
              //   "channel": "push-user-4292155",
              //   "text": "=%7B%22token%22%3A%22orderscancelbyclient%22%2C%22seven_id%22%3A8941936%7D",
              //   "tag": "1",
              //   "time": "Mon, 16 Dec 2019 07:07:34 GMT",
              //   "eventid": ""
              // }

              // Новое сообщение по бронированию
              // {
              //   "id": 7,
              //   "channel": "push-user-4292155",
              //   "text": "=%7B%22token%22%3A%22ordersnewmessage%22%2C%22seven_id%22%3A8941922%7D",
              //   "tag": "1",
              //   "time": "Mon, 16 Dec 2019 07:07:34 GMT",
              //   "eventid": ""
              // }
            }),
          3000
        );
      })
    : axios.get(`/sub/push-user-${data.userId}`, {
        params: {
          callfunc: "actionPolling",
          v: new Date().getTime(),
        },
        cache: false,
      });
