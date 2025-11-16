$(function () {
  const hands = ["✊", "✌️", "🖐"];
  const directions = ["👆", "👇", "👈", "👉"];
  let winner = null; // じゃんけん勝者（"user" or "pc"）

  // --- じゃんけん ---
  $(".janken-btn").on("click", function () {
    // ボタン押した時、四角の中の文字は変更したい、しかしボタンの文字は変更したくないため、ボタン押した時の定義は作るけどtext内は空白にすることでボタンのみ時は変更されない
    const userHand = $(this).text();
    const pcHand = hands[Math.floor(Math.random() * 3)];
    // 四角の中の絵文字部分だけ指定して、さっき作った定義を採用する
    $("#user-hand .emoji").text(userHand);
    $("#pc-hand .emoji").text(pcHand);

    // 結果は変わるから変数で定義して、あとでtextに推しはめる
    let result = "";
    // resultClassを定義する理由は、勝敗ごとの色分けのため。resultのtextを半角英数字にするなら(例：win)それをCSSでclassとして扱えるため、困らないが日本語表記にしたい、またはあっちむいてほい側でも勝った場合の色を統一するなら予め定義しておけばいい
    let resultClass = "";

    if (userHand === pcHand) {
      result = "あいこで～";
      resultClass = "draw";
      // あいこの時にあっち向いてほいに進まないようにif (!winner) return;が機能するように必要
      winner = null;
    } else if (
      (userHand === "✊" && pcHand === "✌️") ||
      (userHand === "✌️" && pcHand === "🖐") ||
      (userHand === "🖐" && pcHand === "✊")
    ) {
      result = "あなたの勝ち！";
      resultClass = "win";
      winner = "user";
    } else {
      result = "あなたの負け…";
      resultClass = "lose";
      winner = "pc";
    }

    $("#janken-result")
      // まずremoveClassで前回の勝敗の文字の色を消す
      // reset-btnを押さないままやり直しても、勝敗の色変更が効くようにするためにこの段階でもremoveClassを入れる
      // removeClassがなくても、addClassがあれば色が上書きされるように感じるが、addClassは上書きではなく追加の位置付け
      // 上書き順はCSSの書いてる順に影響される
      .removeClass("win lose draw")
      .text(result)
      // addClassで今回の勝敗の色を追加する。
      .addClass(resultClass);
  });

  // --- あっち向いてホイ ---
  $(".direction").on("click", function () {
    if (!winner) return; // じゃんけん勝敗がつかない場合は何もしない

    const userDir = $(this).text(); // 例: ⬆
    const pcDir = directions[Math.floor(Math.random() * 4)];

    $("#user-atti .emoji").text(userDir);
    $("#pc-atti .emoji").text(pcDir);

    let message = "";
    let resultClass = "";
    
    if (
      (userDir === pcDir) &&
      (winner === "user")
    ) {
      message = "あなたの勝ち！" ;
      resultClass = "win";
    } else if (
      (userDir === pcDir) &&
      (winner === "pc")
    ) {
      message = "残念、あなたの負け…" ;
      resultClass = "lose";
    } else if (
      (userDir !== pcDir) &&
      (winner === "user")
    ) {
      message = "惜しい！" ;
      resultClass = "draw";
    } else {
      message = "セーフ！" ;
      resultClass = "draw";
    }

    $("#final-result")
    .text(message)
    .removeClass("win lose draw")
    .addClass(resultClass);
  });

  // --- リセットボタン ---
  $("#reset-btn").on("click", function () {
    // .emojiを空欄に
    $(".emoji").text("");
    // .resultのtextを消す。色は念の為
    $(".result").text("").removeClass("win lose draw");
    // 安全装置。なくてもlet winnerで更新されるため影響はない
    winner = null;
  });
});
