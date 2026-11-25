document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Year
  document.getElementById("year").textContent = new Date().getFullYear();

  // 2. Theme Toggle with localStorage
  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const sunIcon = document.getElementById("sunIcon");
  const moonIcon = document.getElementById("moonIcon");

  const applyTheme = (theme) => {
    htmlEl.setAttribute("data-theme", theme);
    localStorage.setItem("sihkta-theme", theme);
    if (theme === "light") {
      sunIcon.classList.remove("hidden");
      moonIcon.classList.add("hidden");
    } else {
      sunIcon.classList.add("hidden");
      moonIcon.classList.remove("hidden");
    }
  };

  const savedTheme = localStorage.getItem("sihkta-theme") || "dark";
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const current = htmlEl.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });

  // 3. Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  // 4. Typing Effect
  const roles = [
    "Software Engineering Student (D4 TRPL)",
    "Web & Relational Database Developer",
    "Vector & T-Shirt Typography Designer"
  ];
  const typedEl = document.getElementById("typedText");
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentRole = roles[roleIdx];
    if (isDeleting) {
      typedEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? 40 : 75;

    if (!isDeleting && charIdx === currentRole.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 350;
    }

    setTimeout(typeLoop, delay);
  }
  typeLoop();

  // 5. Project Category Filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      projectCards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // 6. Project Detail Modal
  const projectDetails = {
    banyu: {
      tag: "// SISTEM INFORMASI & ANALISIS",
      title: "Sistem Ticketing Wisata Banyu Lemon",
      desc: "Sistem manajemen tiket terpadu berbasis perangkat mobile dan tablet untuk operasional destinasi wisata Banyu Lemon.",
      points: [
        "Integrasi tiket masuk utama, wahana perahu kayuh, area camping, dan parkir kendaraan.",
        "Alur transaksi cepat dengan dukungan cetak bukti pembayaran menggunakan mini printer thermal.",
        "Struktur basis data relasional untuk rekapitulasi laporan harian pengelola."
      ]
    },
    scam: {
      tag: "// NATURAL LANGUAGE PROCESSING",
      title: "SMS & Chat Scam Detector",
      desc: "Sistem klasifikasi pesan berbasis NLP untuk mendeteksi indikasi penipuan pada pesan singkat dan percakapan digital.",
      points: [
        "Analisis multi-faktor terhadap pola urgensi palsu, tautan mencurigakan, dan rekayasa sosial.",
        "Pra-pemrosesan teks Bahasa Indonesia untuk meningkatkan akurasi deteksi.",
        "Antarmuka pengujian pesan yang mudah dipahami pengguna akhir."
      ]
    },
    rbw: {
      tag: "// BRAND IDENTITY & VECTOR GRAPHICS",
      title: "Sihkta.rbw Apparel & PDH TRPL",
      desc: "Pengembangan identitas visual merek pakaian streetwear dan seragam kerja lapangan mahasiswa rekayasa perangkat lunak.",
      points: [
        "Palet warna kontras tinggi (Merah, Hitam, Putih) dengan gaya ilustrasi vektor solid block di Inkscape.",
        "Tipografi teknis menggunakan font monospace dan sans-serif geometris.",
        "Desain kemeja PDH navy blue untuk angkatan Teknologi Rekayasa Perangkat Lunak."
      ]
    }
  };

  const modal = document.getElementById("projectModal");
  const closeModal = document.getElementById("closeModal");

  document.querySelectorAll(".open-modal").forEach((btn) => {
    btn.addEventListener("click", () => {
      const data = projectDetails[btn.dataset.project];
      if (!data) return;
      document.getElementById("modalTag").textContent = data.tag;
      document.getElementById("modalTitle").textContent = data.title;
      document.getElementById("modalDesc").textContent = data.desc;

      const listEl = document.getElementById("modalList");
      listEl.innerHTML = data.points.map((item) => `<li>${item}</li>`).join("");

      modal.classList.remove("hidden");
    });
  });

  closeModal.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.classList.add("hidden");
  });

  // 7. Contact Form Validation & Toast
  const contactForm = document.getElementById("contactForm");
  const toastEl = document.getElementById("toast");

  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add("show");
    setTimeout(() => toastEl.classList.remove("show"), 3500);
  }

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("messageError").textContent = "";

    if (name.length < 2) {
      document.getElementById("nameError").textContent = "Nama minimal 2 karakter.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById("emailError").textContent = "Masukkan alamat email yang valid.";
      isValid = false;
    }

    if (message.length < 10) {
      document.getElementById("messageError").textContent = "Pesan minimal 10 karakter.";
      isValid = false;
    }

    if (isValid) {
      showToast(`Terima kasih, ${name}! Pesan Anda telah tercatat.`);
      contactForm.reset();
    }
  });

  // 8. Active Nav Highlight & Scroll Reveal
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});