let data = [];

axios
  .get(
    `https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json`
  )
  .then((res) => {
    data = res.data.data;

    renderCards(data);
    getRegionOptions();
    renderSearchRegion();
    getTotalNum(data);
  })
  .catch((err) => {
    console.log(err);
  });

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

// 取得地區選項
let ticketRegionList = [];
function getRegionOptions() {
  data.forEach((item) => {
    if (!ticketRegionList.includes(item.area)) {
      ticketRegionList.push(item.area);
    }
  });
}

// 渲染景點地區選項
const ticketRegionSelect = document.querySelector("#ticketRegion");
const selectRegionList = [
  "台北",
  "新北",
  "桃園",
  "台中",
  "台南",
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
  "台東",
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

// 監聽表格內容變化
let ticketName = document.querySelector("#ticketName");
let ticketImgUrl = document.querySelector("#ticketImgUrl");
let ticketRegion = document.querySelector("#ticketRegion");
let ticketPrice = document.querySelector("#ticketPrice");
let ticketNum = document.querySelector("#ticketNum");
let ticketRate = document.querySelector("#ticketRate");
let ticketDes = document.querySelector("#ticketDescription");

let formValue = {};

// 取得欄位元素
const addTicketInputs = document.querySelectorAll(".addTicketInput");

addTicketInputs.forEach(function (addTicketInput) {
  // 監聽欄位元素變化
  addTicketInput.addEventListener("change", function () {
    let formItemId = addTicketInput.id;
    let formItem = formValue[formItemId];
    formItem = addTicketInput.value;
    formValue[formItemId] = addTicketInput.value;

    // 警示訊息判斷
    const alertMessage = document.querySelector(
      `.alert-message > p[data-message=${formItemId}]`
    );

    if (formItem === "") {
      alertMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i>
        <span>必填!</span>`;
    } else if (formItemId == "ticketPrice" && formItem == 0) {
      alertMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i>
        <span>金額不可為 0！</span>`;
    } else if (formItemId == "ticketNum" && formItem == 0) {
      alertMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i>
        <span>組數不可為 0！</span>`;
    } else if (formItemId == "ticketRate" && (formItem < 1 || formItem > 10)) {
      alertMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i>
        <span>星級為 1 ~ 10！</span>`;
    } else {
      alertMessage.innerHTML = "";
    }

    // 新增套票按鈕 disabled 狀態
    if (
      !formValue.ticketName == "" &&
      !formValue.ticketImgUrl == "" &&
      !formValue.ticketRegion == "" &&
      !formValue.ticketPrice == "" &&
      formValue.ticketPrice > 0 &&
      !formValue.ticketNum == "" &&
      formValue.ticketNum > 0 &&
      !formValue.ticketRate == "" &&
      formValue.ticketRate > 0 &&
      formValue.ticketRate < 11 &&
      !formValue.ticketDescription == ""
    ) {
      addTicketBtn.removeAttribute("disabled");
    } else {
      addTicketBtn.setAttribute("disabled", "disabled");
    }
  });
});

// 新增套票
let addTicketBtn = document.querySelector(".addTicket-btn");

addTicketBtn.addEventListener("click", function () {
  const obj = {
    id: formValue.length,
    name: formValue.ticketName,
    imgUrl: formValue.ticketImgUrl,
    area: formValue.ticketRegion,
    description: formValue.ticketDescription,
    group: formValue.ticketNum,
    price: formValue.ticketPrice,
    rate: formValue.ticketRate,
  };
  console.log(obj);

  data.push(obj);
  renderCards(data);
  getRegionOptions();
  renderSearchRegion();
  getTotalNum(data);

  // input的值清空
  ticketName.value = "";
  ticketImgUrl.value = "";
  ticketRegion.value = "";
  ticketPrice.value = "";
  ticketNum.value = "";
  ticketRate.value = "";
  ticketDes.value = "";

  formValue = {};

  addTicketBtn.setAttribute("disabled", "disabled");
});
