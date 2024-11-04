const calcTime = (timestamp) => {
  const curTime = new Date().getTime();
  const timeDiff = curTime - timestamp; // 현재 시간과의 차이를 밀리초 단위로 계산
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  if (days > 0) return `${days}일 전`;
  else if (hours > 0) return `${hours}시간 전`;
  else if (minutes > 0) return `${minutes}분 전`;
  else if (seconds > 0) return `${seconds}초 전`;
  else return "방금 전";
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
