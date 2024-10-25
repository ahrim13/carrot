const calcTime = (timestamp) => {
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  const time = new Date(curTime - timestamp);
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  if (hour > 0) return `${hour}시간 전`;
  else if (minute > 0) return `${minute}분 전`;
  else if (second > 0) return `${second}초 전`;
  else "방금 전";
};

const formatPrice = (price) => {
  return price.toLocaleString("ko-KR");
};

const renderData = (data) => {
  const main = document.querySelector("main");

  data
    .sort((a, b) => b.insertAt - a.insertAt)
    .forEach(async (obj) => {
      const div = document.createElement("div");
      div.className = "item-list";

      const imgDiv = document.createElement("div");
      imgDiv.className = "item-list_img";

      const img = document.createElement("img");
      if (obj.image) {
        img.src = `data:image/png;base64,${obj.image}`;
      } else {
        img.src = "assets/image.svg";
      }

      const InfoDiv = document.createElement("div");
      InfoDiv.className = "item-list_info";

      const InfoTitleDiv = document.createElement("div");
      InfoTitleDiv.className = "item-list_info-title";
      InfoTitleDiv.innerText = obj.title;

      const InfoMetaDiv = document.createElement("div");
      InfoMetaDiv.className = "item-list_info-meta";
      InfoMetaDiv.innerText = obj.place + " " + calcTime(obj.insertAt);

      const InfoPriceDiv = document.createElement("div");
      InfoPriceDiv.className = "item-list_info-price";
      InfoPriceDiv.innerText = formatPrice(obj.price);

      imgDiv.appendChild(img);
      InfoDiv.appendChild(InfoTitleDiv);
      InfoDiv.appendChild(InfoMetaDiv);
      InfoDiv.appendChild(InfoPriceDiv);
      div.appendChild(imgDiv);
      div.appendChild(InfoDiv);
      main.appendChild(div);
    });
};

const fetchList = async () => {
  const res = await fetch("/items");
  const data = await res.json();
  renderData(data);
};

fetchList();
