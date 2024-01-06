// ローディングアニメーション
const keyName = "loadingviewed";
const keyValue = true;
if (!sessionStorage.getItem(keyName)) {
  sessionStorage.setItem(keyName, keyValue);
  // 初回閲覧時
  window.onload = function () {
    const popup = document.getElementById("firstTimeModal");
    if (!popup) return;
    popup.classList.add("is-show"); // モーダルにis-showのclassを付与
  };
  const loadinglogo = document.getElementById("loadingLogo"); //
  window.addEventListener("DOMContentLoaded", () => {
    //ロード完了後イベント開始
    loadinglogo.className = "show";
    setTimeout(function () {
      loadinglogo.className = loadinglogo.className.replace("show", "");
    }, 4500); // 2.5秒後非表示
  });
} else {
  // 2回目以降の処理内容
}

// オープニングアニメーション
const body = document.querySelector(".js-body");
function openingAnime() {
  body.classList.toggle("is-loaded");
  gsap
    .timeline(function () {})
    .from(body, {
      autoAlpha: 0,
      duration: 2,
      delay: 1,
    })
    .from(".top-kv_copy", {
      duration: 2.5,
      // delay: 1,
      autoAlpha: 0,
      y: 100,
    });
}

function webStorage() {
  if (sessionStorage.getItem("access")) {
     body.classList.toggle("is-loaded");
  } else {
    sessionStorage.setItem("access", 0);
    openingAnime();
  }
}
webStorage();

// kvスライドショー
function kvSwiper() {
  setTimeout(function () {
    const slider01 = new Swiper(".top-kv-swiper", {
      effect: "fade", // フェードモードにする（デフォルトは 'slide'）
      fadeEffect: {
        crossFade: true, // クロスフェードを有効にする（フェードモードの場合 true 推奨）
      },

      loop: true,
      autoplay: true,
      speed: 3000,
      slidesPerView: 1,
    });
  }, 2000);
}

kvSwiper();

// ハンバーガーメニュー
const nav = document.querySelector("#js-nav");
const pageLink = document.querySelector("#entry-kengaku-link");
const ham = document.querySelector("#js-hamburger");
ham.addEventListener("click", function () {
  ham.classList.toggle("is-active");
  nav.classList.toggle("is-active");
  body.classList.toggle("is-loaded");
  pageLink.addEventListener("click", function () {
    nav.classList.remove("is-active");
  });
});

// ヘッダーお問い合わせボタンの切り替え
document.addEventListener("DOMContentLoaded", function () {
  const windowWidth = window.innerWidth;

  window.addEventListener("resize", function () {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 640) {
      document.getElementById("tel-btn").href = "index.html#cta";
    } else {
      document.getElementById("tel-btn").href = "tel:000-000-0000";
    }
  });

  if (windowWidth >= 640) {
    document.getElementById("tel-btn").href = "index.html#cta";
  }

  // ページ内リンクがクリックされたときの処理
  document
    .getElementById("tel-btn")
    .addEventListener("click", function (event) {
      // ページ内リンクなのでデフォルトの動作をキャンセル
      event.preventDefault();

      // 直接指定のURLに遷移
      window.location.href = this.getAttribute("href");
    });
});

// ふわっと登場
const scrollAreas = document.querySelectorAll(".js-scroll-trigger");
// console.log(scrollAreas);

function e(scrollFuwatto) {
  gsap.fromTo(
    scrollFuwatto,
    {
      // 初期状態
      autoAlpha: 0, // 非表示
      y: 80, // transform: translateY(80px)と同じ
    },
    {
      // アニメーション終了時の状態
      autoAlpha: 1, // 表示
      y: 0, // transform: translateY(0)と同じ
      duration: 1.8, // 2秒かけて表示
      scrollTrigger: {
        // scrollTriggerで、スクロール中はそれぞれのエリアを監視する
        trigger: scrollFuwatto,
        start: "top 80%",
        end: "bottom 20%",
        // markers: true, // 目印を表示
      },
    }
  );
}

scrollAreas.forEach(function (scrollArea) {
  e(scrollArea);
});

// page-top
//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
  let scroll = $(window).scrollTop(); //スクロール値を取得
  if (scroll >= 800) {
    //800pxスクロールしたら
    $(".page-top").removeClass("DownMove"); // DownMoveというクラス名を除去して
    $(".page-top").addClass("UpMove"); // UpMoveというクラス名を追加して出現
  } else {
    //それ以外は
    if ($(".page-top").hasClass("UpMove")) {
      //UpMoveというクラス名が既に付与されていたら
      $(".page-top").removeClass("UpMove"); //  UpMoveというクラス名を除去し
      $(".page-top").addClass("DownMove"); // DownMoveというクラス名を追加して非表示
    }
  }

  let wH = window.innerHeight; //画面の高さを取得
  let footerPos = $(".l_footer").offset().top; //footerの位置を取得
  if (scroll + wH >= footerPos + 10) {
    let pos = scroll + wH - footerPos + 10; //スクロールの値＋画面の高さからfooterの位置＋10pxを引いた場所を取得し
    $(".page-top").css("bottom", pos); //.page-topに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
  } else {
    //それ以外は
    if ($(".page-top").hasClass("UpMove")) {
      //UpMoveというクラス名がついていたら
      $(".page-top").css("bottom", "24px"); // 下から10pxの位置にページリンクを指定
    }
  }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on("load", function () {
  PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
});

// .page-topをクリックした際の設定
$(".page-top").click(function () {
  $("body,html").animate(
    {
      scrollTop: 0, //ページトップまでスクロール
    },
    1000
  ); //ページトップスクロールの速さ。数字が大きいほど遅くなる
  return false; //リンク自体の無効化
});

// top-kvにフィルターをかける
const topKvImages = document.querySelectorAll(
  ".top-kv .swiper_area .top-kv-swiper .swiper-slide img"
);

console.log(topKvImages);

// 例: フィルターを追加する
topKvImages.forEach(function (img) {
  img.style.filter = "rgba(217, 217, 217, 0.8)"; // ここで適用するスタイルを変更できます
});
