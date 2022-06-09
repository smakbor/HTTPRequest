const get_btn = document.querySelector(".get-btn");
const send_btn = document.querySelector(".send-btn");

const sendRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onerror = () => {
      reject("something is error");
    };

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.send(data);
  });
  return promise;
};

function getData() {
  sendRequest("GET", "https://jsonplaceholder.typicode.com/posts/1")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

function sendData() {
  sendRequest(
    "POST",
    "https://jsonplaceholder.typicode.com/posts",
    JSON.stringify({
      title: "foo",
      body: "bar",
      userId: 1,
    })
  ).then((res) => {
    console.log(res);
  });
}

get_btn.addEventListener("click", getData);
send_btn.addEventListener("click", sendData);
