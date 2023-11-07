let data = [
  {
    id: 0,
    name: "肥宅心碎賞櫻3日",
    imgUrl:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    area: "高雄",
    description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    group: 87,
    price: 1400,
    rate: 10,
  },
  {
    id: 1,
    name: "貓空纜車雙程票",
    imgUrl:
      "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台北",
    description:
      "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    group: 99,
    price: 240,
    rate: 2,
  },
  {
    id: 2,
    name: "台中谷關溫泉會1日",
    imgUrl:
      "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台中",
    description:
      "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    group: 20,
    price: 1765,
    rate: 7,
  },
];

// 渲染畫面
function renderCards(data) {
  const ticketCardArea = document.querySelector(".ticketCard-area");

  let ticketCards = "";
  data.forEach((item) => {
    ticketCards += `<li class="ticketCard">
    <div class="ticketCard-img">
      <a href="#">
        <img
          src="${item.imgUrl}"
          alt=""
        />
      </a>
      <div class="ticketCard-region">${item.area}</div>
      <div class="ticketCard-rank">${item.rate}</div>
    </div>
    <div class="ticketCard-content">
      <div>
        <h3>
          <a href="#" class="ticketCard-name">${item.name}</a>
        </h3>
        <p class="ticketCard-description">
          ${item.description}
        </p>
      </div>
      <div class="ticketCard-info">
        <p class="ticketCard-num">
          <span><i class="fas fa-exclamation-circle"></i></span>
          剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
        </p>
        <p class="ticketCard-price">
          TWD <span id="ticketCard-price">$${item.price}</span>
        </p>
      </div>
    </div>
  </li>`;
  });

  ticketCardArea.innerHTML = ticketCards;
}
renderCards(data);

// 取得地區選項
let ticketRegionList = [];
function getRegionOptions() {
  data.forEach((item) => {
    if (!ticketRegionList.includes(item.area)) {
      ticketRegionList.push(item.area);
    }
  });
}
getRegionOptions();

// 渲染景點地區選項
const ticketRegionSelect = document.querySelector("#ticketRegion");
const selectRegionList = [
  "臺北",
  "新北",
  "桃園",
  "臺中",
  "臺南",
  "高雄",
  "新竹",
  "苗栗",
  "彰化",
  "南投",
  "雲林",
  "嘉義",
  "屏東",
  "宜蘭",
  "花蓮",
  "臺東",
  "澎湖",
  "金門",
  "連江",
  "基隆",
];

ticketRegionOptions = `<option value="" disabled selected hidden>請選擇景點地區</option>`;

selectRegionList.forEach((item) => {
  ticketRegionOptions += `<option value="${item}">${item}</option>`;
});

ticketRegionSelect.innerHTML = ticketRegionOptions;

// 渲染地區搜尋選項
function renderSearchRegion() {
  const regionSearchSelect = document.querySelector(".regionSearch");

  regionSearchOptions = `<option value="地區搜尋" disabled selected hidden>地區搜尋</option>
  <option value="">全部地區</option>`;

  ticketRegionList.forEach((item) => {
    regionSearchOptions += `<option value="${item}">${item}</option>`;
  });

  regionSearchSelect.innerHTML = regionSearchOptions;
}

renderSearchRegion();

// 地區篩選功能
const regionSearch = document.querySelector(".regionSearch");
let newData;
regionSearch.addEventListener("change", function () {
  const targetValue = regionSearch.value;

  if (!targetValue == "") {
    newData = data.filter((item) => item.area == targetValue);

    renderCards(newData);
    getTotalNum(newData);
  } else {
    renderCards(data);
    getTotalNum(data);
  }
});

// 取得並渲染資料筆數
function getTotalNum(data) {
  const searchResultText = document.querySelector("#searchResult-text");
  let totalNum = data.length;
  // data;
  searchResultText.textContent = `本次搜尋共 ${totalNum} 筆資料`;
}
getTotalNum(data);

// 新增套票
let addTicketBtn = document.querySelector(".addTicket-btn");
const newTicket = {};

let ticketName = document.querySelector("#ticketName");
let ticketImgUrl = document.querySelector("#ticketImgUrl");
let ticketRegion = document.querySelector("#ticketRegion");
let ticketPrice = document.querySelector("#ticketPrice");
let ticketNum = document.querySelector("#ticketNum");
let ticketRate = document.querySelector("#ticketRate");
let ticketDes = document.querySelector("#ticketDescription");

addTicketBtn.addEventListener("click", function () {
  nameValue = ticketName.value;
  imgUrlValue = ticketImgUrl.value;
  regionValue = ticketRegion.value;
  priceValue = ticketPrice.value;
  numValue = ticketNum.value;
  rateValue = ticketRate.value;
  desValue = ticketDes.value;

  if (
    nameValue &&
    imgUrlValue &&
    regionValue &&
    priceValue &&
    numValue &&
    rateValue &&
    desValue
  ) {
    const obj = {
      id: data.length,
      name: nameValue,
      imgUrl: imgUrlValue,
      area: regionValue,
      description: desValue,
      group: numValue,
      price: priceValue,
      rate: rateValue,
    };
    data.push(obj);
    renderCards(data);
    getRegionOptions();
    renderSearchRegion();

    ticketName.value = "";
    ticketImgUrl.value = "";
    ticketRegion.value = "";
    ticketPrice.value = "";
    ticketNum.value = "";
    ticketRate.value = "";
    ticketDes.value = "";
  } else {
    alert("還有欄位沒填");
  }
});
