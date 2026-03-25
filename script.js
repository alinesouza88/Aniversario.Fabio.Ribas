/* =========================
   NAVEGAÇÃO ENTRE TELAS
========================= */
function proximaTela(atual) {
  const telas = document.querySelectorAll(".tela");

  telas.forEach(tela => {
    tela.classList.remove("ativa");

    // pausa vídeos
    const videos = tela.querySelectorAll("video");
    videos.forEach(video => {
      video.pause();
      video.currentTime = 0;
    });
  });

  const proxima = document.getElementById("tela" + (atual + 1));

  if (proxima) {
    proxima.classList.add("ativa");
    window.scrollTo(0, 0);

    // autoplay do vídeo da nova tela
    const video = proxima.querySelector("video");
    if (video) {
      video.play().catch(() => {});
    }
  }

  // efeito especial na tela 6
  if (atual + 1 === 6) {
    explosaoFinal();
  }
}

/* =========================
   TEXTO DIGITANDO
========================= */
const texto = "Hoje é um dia muito especial... 🎂❤️";
let i = 0;

function digitar() {
  const el = document.getElementById("textoDigitando");
  if (!el) return;

  if (i < texto.length) {
    el.innerHTML += texto.charAt(i);
    i++;
    setTimeout(digitar, 60);
  }
}

/* =========================
   INICIALIZAÇÃO
========================= */
document.addEventListener("DOMContentLoaded", () => {
  digitar();

  const video1 = document.getElementById("video1");
  const video2 = document.getElementById("video2");

  // 🎬 vídeo 1 → tela 7
  if (video1) {
    video1.onended = () => {
      proximaTela(6);
    };
  }

  // 🎬 vídeo 2 → tela 8
  if (video2) {
    video2.onended = () => {
      proximaTela(7);
    };
  }
});

/* =========================
   CORAÇÕES
========================= */
setInterval(() => {
  const container = document.querySelector(".coracoes");
  if (!container) return;

  const coracao = document.createElement("span");

  coracao.style.left = Math.random() * 100 + "vw";
  const tamanho = (8 + Math.random() * 12) + "px";
  coracao.style.width = tamanho;
  coracao.style.height = tamanho;

  container.appendChild(coracao);

  setTimeout(() => coracao.remove(), 8000);
}, 500);

/* =========================
   EXPLOSÃO FINAL
========================= */
function explosaoFinal() {
  for (let i = 0; i < 60; i++) {
    const el = document.createElement("span");

    el.style.position = "fixed";
    el.style.left = "50%";
    el.style.top = "50%";
    el.style.width = "10px";
    el.style.height = "10px";
    el.style.background = "#ff4d6d";
    el.style.borderRadius = "50%";

    document.body.appendChild(el);

    const x = (Math.random() - 0.5) * 600;
    const y = (Math.random() - 0.5) * 600;

    setTimeout(() => {
      el.style.transform = `translate(${x}px, ${y}px)`;
      el.style.opacity = "0";
    }, 50);

    setTimeout(() => el.remove(), 1500);
  }
}