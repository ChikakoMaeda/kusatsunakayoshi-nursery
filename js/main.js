// ローディングアニメーション
const keyName = "loadingviewed";
const keyValue = true;
if (!sessionStorage.getItem(keyName)) {
  sessionStorage.setItem(keyName, keyValue);
  // 初回閲覧時
  window.onload = function () {
    var popup = document.getElementById("firstTimeModal");
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
const body = document.querySelector("#js-body");
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

// openingAnime();

function webStorage() {
  if (sessionStorage.getItem("access")) {
    body.classList.add("is-loaded");
  } else {
    sessionStorage.setItem("access", 0);
    openingAnime();
  }
}
webStorage();

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

const slider02 = new Swiper(".about-feature_swiper", {
  // ページネーションが必要なら追加
  pagination: {
    el: ".swiper-pagination",
  },

  loop: true,
  autoplay: true,
  speed: 3000,

  slidesPerView: 1,
  spaceBetween: 32,
  breakpoints: {
    // 768px以上の場合
    768: {
      slidesPerView: 2,
      spaceBetween: 32,
    },
    // 768px以上の場合
    1024: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
  },
});

// ハンバーガーメニュー
const nav = document.querySelector("#js-nav");
const pageLink = document.querySelectorAll(".entry-kengaku-link");
const ham = document.querySelector("#js-hamburger");
// console.log(nav);
ham.addEventListener("click", function () {
  // console.log('ok');
  ham.classList.toggle("is-active");
  nav.classList.toggle("is-active");
  body.classList.toggle("is_hidden");
  pageLink.addEventListener("click", function () {
    nav.classList.remove("is-active");
  });
});

// let windowWidth = $(window).width();
// let windowSm = 640;
// if (windowWidth <= windowSm) {
//   //横幅640px以下（スマホ）に適用させるJavaScriptを記述

// } else {
//   //横幅640px以上（PC、タブレット）に適用させるJavaScriptを記述
// }
// //a要素を取得する
// let telBtn = document.querySelector("#tel-btn");
// //a要素のhref属性の値を取得する
// let oldHref = telBtn.getAttribute("href");
// //replaceでhref属性の一部（jquery）を新しい値（javascript）に置き換える
// let newHref = oldHref.replace("tel:000-000-0000", "#m_cta");
// //置き換えた値をa要素のhref属性に設定する
// telBtn.setAttribute("href", newHref);


//アコーディオンをクリックした時の動作
$(".question_ttl").on("click", function () {
  //タイトル要素をクリックしたら
  var findElm = $(this).next(".answer_box"); //直後のアコーディオンを行うエリアを取得し
  $(findElm).slideToggle(); //アコーディオンの上下動作

  if ($(this).hasClass("close")) {
    //タイトル要素にクラス名closeがあれば
    $(this).removeClass("close"); //クラス名を除去し
  } else {
    //それ以外は
    $(this).addClass("close"); //クラス名closeを付与
  }
});

//ページが読み込まれた際にopenクラスをつけ、openがついていたら開く動作※不必要なら下記全て削除
$(window).on("load", function () {
  $(".accordion_list li:first-of-type section").addClass("open"); //accordion-areaのはじめのliにあるsectionにopenクラスを追加
  $(".open").each(function (index, element) {
    //openクラスを取得
    var Title = $(element).children(".question_ttl"); //openクラスの子要素のtitleクラスを取得
    $(Title).addClass("close"); //タイトルにクラス名closeを付与し
    var Box = $(element).children(".answer_box"); //openクラスの子要素boxクラスを取得
    $(Box).slideDown(500); //アコーディオンを開く
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
