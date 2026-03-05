document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".header-burger");
  const lines = burger?.querySelectorAll(".header-burger__line");
  const drawer = document.querySelector(".header-drawer");
  const overlay = document.querySelector(".header-drawer__overlay");
  const closeBtn = document.querySelector(".header-drawer__close");

  const BREAKPOINT = 1280;

  if (!burger || !drawer || !overlay) return;

  const hideLines = () => lines?.forEach((l) => (l.style.opacity = "0"));
  const showLines = () => lines?.forEach((l) => (l.style.opacity = "1"));

  const openMenu = () => {
    drawer.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    drawer.setAttribute("aria-hidden", "false");
    hideLines(); // ← 三本線だけ消す（ボタンは残す）
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    drawer.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
    showLines(); // ← 三本線復活
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    if (drawer.classList.contains("is-open")) closeMenu();
    else openMenu();
  };

  // 三本ボタンで開閉（開いた後も押せる）
  burger.addEventListener("click", toggleMenu);

  // 背景クリックで閉じる
  overlay.addEventListener("click", closeMenu);

  // ×があるならそれでも閉じる
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  // ESCで閉じる
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // 画面幅が広がったら復帰（閉じて三本復活）
  const mq = window.matchMedia(`(min-width:${BREAKPOINT + 1}px)`);
  const handleMq = () => {
    if (mq.matches) closeMenu();
  };
  mq.addEventListener?.("change", handleMq);
  handleMq();
});