import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const PORTRAIT = "https://cdn.poehali.dev/projects/ac059f9e-802b-4f7c-8586-eadc1391eb04/files/3f5efa99-343d-4c2f-b9f3-f8d7e2692c7f.jpg";

const NAV_ITEMS = [
  { id: "about", label: "О подходе" },
  { id: "services", label: "Услуги" },
  { id: "contact", label: "Контакты" },
  { id: "faq", label: "Вопросы" },
];

const TASKS = [
  "Стратегические решения",
  "Пересборка роли",
  "Поведенческие паттерны",
  "Ментальные барьеры",
  "Коммуникации",
  "Эмоциональная устойчивость",
];

const RESULTS = [
  "Ясность",
  "Спокойствие",
  "Стратегическое видение",
  "Устойчивость",
  "Внутренняя опора",
];

const FAQ_ITEMS = [
  {
    q: "Как проходит установочная встреча?",
    a: "Установочная встреча длится 30 минут. Это разговор о вашем запросе, контексте и о том, как устроена работа. Формат — очный в Москве или онлайн.",
  },
  {
    q: "Сколько сессий обычно требуется?",
    a: "Количество встреч определяется индивидуально. Чаще всего работа выстраивается как регулярная — раз в одну-две недели. Минимальный эффективный период — 3 месяца.",
  },
  {
    q: "Гарантируете ли вы конфиденциальность?",
    a: "Полностью. Всё, что обсуждается на сессиях, остаётся между нами. Это профессиональный и этический стандарт практики.",
  },
  {
    q: "Работаете ли вы с организациями и командами?",
    a: "Основной формат — индивидуальная работа с первым лицом или ключевым руководителем. Командные форматы рассматриваются отдельно.",
  },
  {
    q: "Как записаться на встречу?",
    a: "Напишите через контактную форму на сайте или в мессенджер. Я отвечаю в течение одного рабочего дня.",
  },
];

function useInView(ref: React.RefObject<Element>, threshold = 0.12) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return inView;
}

function AnimSection({ id, children, className = "", style = {} }: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <section
      id={id}
      ref={ref}
      className={className}
      style={{
        ...style,
        transition: "opacity 0.7s ease, transform 0.7s ease",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
      }}
    >
      {children}
    </section>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ backgroundColor: "var(--cream)", color: "var(--graphite)" }} className="min-h-screen">

      {/* NAV */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.4s ease",
          backgroundColor: scrolled ? "rgba(245,242,238,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          borderBottom: scrolled ? "1px solid var(--rule)" : "none",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 4rem" }} className="h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            style={{ color: "var(--graphite)", letterSpacing: "0.18em", fontFamily: "Cormorant, serif", fontSize: "1.1rem", background: "none", border: "none", cursor: "pointer" }}
            className="uppercase"
          >
            A·U
          </button>

          <nav className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{ color: "var(--graphite-light)", letterSpacing: "0.14em", fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.7rem", background: "none", border: "none", cursor: "pointer" }}
                className="uppercase transition-opacity duration-200 hover:opacity-50"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              style={{
                borderColor: "var(--indigo)",
                color: "var(--cream)",
                backgroundColor: "var(--indigo)",
                letterSpacing: "0.1em",
                fontFamily: "IBM Plex Sans, sans-serif",
                fontSize: "0.7rem",
                padding: "10px 20px",
                border: "1px solid var(--indigo)",
                cursor: "pointer",
              }}
              className="uppercase transition-opacity duration-200 hover:opacity-70"
            >
              Записаться
            </button>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "var(--graphite)", background: "none", border: "none", cursor: "pointer" }}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div style={{ backgroundColor: "var(--cream)", borderTop: "1px solid var(--rule)" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.5rem 2rem" }} className="flex flex-col gap-5">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  style={{ color: "var(--graphite-light)", letterSpacing: "0.14em", fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.7rem", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                  className="uppercase"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "4rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 4rem", width: "100%" }}>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="animate-fade-in-up animate-delay-1"
                style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--graphite-light)", marginBottom: "2rem" }}
              >
                Москва&nbsp;&nbsp;/&nbsp;&nbsp;Онлайн
              </p>

              <h1
                className="animate-fade-in-up animate-delay-2"
                style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(3.5rem, 7vw, 5.5rem)", fontWeight: 300, lineHeight: 1, color: "var(--graphite)", marginBottom: "1.5rem" }}
              >
                Анна<br />Уварова
              </h1>

              <p
                className="animate-fade-in-up animate-delay-3"
                style={{ fontFamily: "Cormorant, serif", fontSize: "1.3rem", fontWeight: 300, fontStyle: "italic", color: "var(--graphite-light)", marginBottom: "2.5rem", lineHeight: 1.5 }}
              >
                Бизнес-психолог для собственников<br />и руководителей
              </p>

              <div
                className="animate-fade-in-up animate-delay-3"
                style={{ width: "40px", borderTop: "1px solid var(--indigo)", marginBottom: "2.5rem" }}
              />

              <p
                className="animate-fade-in-up animate-delay-4"
                style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.8rem", color: "var(--graphite-light)", marginBottom: "0.75rem" }}
              >
                14 лет частной практики
              </p>

              <p
                className="animate-fade-in-up animate-delay-4"
                style={{ fontFamily: "Cormorant, serif", fontSize: "1.4rem", fontWeight: 300, color: "var(--graphite)", marginBottom: "3rem", lineHeight: 1.4 }}
              >
                Индивидуальная работа<br />на уровне стратегических решений.
              </p>

              <button
                onClick={() => scrollTo("contact")}
                className="animate-fade-in-up animate-delay-5"
                style={{
                  backgroundColor: "var(--indigo)",
                  color: "var(--cream)",
                  fontFamily: "IBM Plex Sans, sans-serif",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  padding: "16px 32px",
                  border: "none",
                  cursor: "pointer",
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Запросить установочную встречу
              </button>
            </div>

            {/* Portrait */}
            <div className="animate-fade-in-up animate-delay-3" style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 0,
                  transform: "translate(16px, 16px)",
                  backgroundColor: "var(--rule)",
                }}
              />
              <img
                src={PORTRAIT}
                alt="Анна Уварова"
                style={{ width: "100%", maxHeight: "600px", objectFit: "cover", filter: "grayscale(100%)", position: "relative", zIndex: 1 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* MASSHTAB BLOCK */}
      <AnimSection style={{ borderTop: "1px solid var(--rule)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 4rem" }}>
          <div style={{ maxWidth: "600px" }}>
            <h2
              style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, lineHeight: 1.25, color: "var(--graphite)", marginBottom: "2rem" }}
            >
              Когда растёт масштаб —<br />растёт внутренняя нагрузка
            </h2>
            <p style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.875rem", lineHeight: 2, color: "var(--graphite-light)" }}>
              Помогаю принимать сложные решения, проходить личные и профессиональные
              кризисы и выстраивать устойчивую внутреннюю опору — чтобы масштабировать
              бизнес без потери себя.
            </p>
            <div style={{ marginTop: "3rem" }}>
              <button
                onClick={() => scrollTo("contact")}
                style={{
                  border: "1px solid var(--indigo)",
                  color: "var(--indigo)",
                  backgroundColor: "transparent",
                  fontFamily: "IBM Plex Sans, sans-serif",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  padding: "14px 28px",
                  cursor: "pointer",
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Запросить встречу
              </button>
            </div>
          </div>
        </div>
      </AnimSection>

      {/* ABOUT */}
      <AnimSection id="about" style={{ borderTop: "1px solid var(--rule)", backgroundColor: "var(--graphite)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 4rem" }}>
          <p style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(245,242,238,0.4)", marginBottom: "3rem" }}>
            О подходе
          </p>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, lineHeight: 1.25, color: "var(--cream)", marginBottom: "2rem" }}>
                Профессиональная позиция
              </h2>
              <p style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.875rem", lineHeight: 2, color: "rgba(245,242,238,0.6)" }}>
                Работаю в экзистенциально-гуманистическом подходе. Это означает
                внимание к смыслам, выборам и ответственности — а не к симптомам
                или техникам быстрого исправления.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[
                "Экзистенциально-гуманистический подход",
                "Психология лидерства",
                "Зрелость управленческой позиции",
                "Устойчивость при высоких ставках",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div style={{ width: "1px", height: "48px", backgroundColor: "var(--indigo)", flexShrink: 0, marginTop: "4px" }} />
                  <p style={{ fontFamily: "Cormorant, serif", fontSize: "1.2rem", fontWeight: 300, color: "var(--cream)", paddingTop: "4px", lineHeight: 1.4 }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3 steps */}
          <div style={{ marginTop: "5rem", paddingTop: "4rem", borderTop: "1px solid rgba(216,211,204,0.2)", display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
            {[
              { n: "01", title: "Запрос", text: "Формулируем, что происходит и что важно изменить." },
              { n: "02", title: "Решение", text: "Исследуем паттерны, выборы и то, что за ними стоит." },
              { n: "03", title: "Осознанность", text: "Новая устойчивость, которая остаётся после завершения работы." },
            ].map((step, i) => (
              <div
                key={i}
                style={{
                  padding: "2rem",
                  paddingLeft: i === 0 ? 0 : "2rem",
                  borderLeft: i > 0 ? "1px solid rgba(216,211,204,0.2)" : "none",
                }}
              >
                <p style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.65rem", color: "rgba(245,242,238,0.25)", letterSpacing: "0.15em", marginBottom: "1rem" }}>{step.n}</p>
                <p style={{ fontFamily: "Cormorant, serif", fontSize: "1.5rem", fontWeight: 300, color: "var(--cream)", marginBottom: "0.75rem" }}>{step.title}</p>
                <p style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.8rem", lineHeight: 1.9, color: "rgba(245,242,238,0.5)" }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimSection>

      {/* SERVICES */}
      <AnimSection id="services" style={{ borderTop: "1px solid var(--rule)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 4rem" }}>
          <p style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--graphite-light)", marginBottom: "3rem" }}>
            Услуги
          </p>

          <div className="grid md:grid-cols-2 gap-16" style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, lineHeight: 1.25, color: "var(--graphite)" }}>
              С какими задачами<br />работаю
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {TASKS.map((task, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: "16px", borderTop: "1px solid var(--indigo)", flexShrink: 0 }} />
                  <p style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.8rem", color: "var(--graphite)" }}>{task}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Manifest */}
          <div style={{ borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", padding: "4rem 0", margin: "2rem 0" }}>
            <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
              <p style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.8, color: "var(--graphite)" }}>
                «Личность. Семья. Наследие.<br />
                Три измерения, которые определяют,<br />
                какой бизнес вы строите<br />
                и кем становитесь в этом процессе.»
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16" style={{ marginTop: "4rem" }}>
            <div>
              <h3 style={{ fontFamily: "Cormorant, serif", fontSize: "1.8rem", fontWeight: 300, color: "var(--graphite)", marginBottom: "2rem" }}>Результат</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {RESULTS.map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: "24px", borderTop: "1px solid var(--indigo)" }} />
                    <p style={{ fontFamily: "Cormorant, serif", fontSize: "1.2rem", fontWeight: 300, color: "var(--graphite)" }}>{r}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: "Cormorant, serif", fontSize: "1.8rem", fontWeight: 300, color: "var(--graphite)", marginBottom: "2rem" }}>Формат</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  ["Сессия", "50 минут"],
                  ["Место", "Москва / Онлайн"],
                  ["Конфиденциальность", "Полная"],
                  ["Приём", "Ограниченное число клиентов"],
                ].map(([label, value], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", borderBottom: "1px solid var(--rule)", padding: "1rem 0" }}>
                    <p style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--graphite-light)", width: "160px", flexShrink: 0 }}>{label}</p>
                    <p style={{ fontFamily: "Cormorant, serif", fontSize: "1.1rem", fontWeight: 300, color: "var(--graphite)" }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimSection>

      {/* FAQ */}
      <AnimSection id="faq" style={{ borderTop: "1px solid var(--rule)", backgroundColor: "#EFECE8" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 4rem" }}>
          <p style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--graphite-light)", marginBottom: "3rem" }}>
            Вопросы и ответы
          </p>
          <div style={{ maxWidth: "700px" }}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} style={{ borderTop: "1px solid var(--rule)" }}>
                <button
                  style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "1.5rem 0", textAlign: "left", gap: "2rem", background: "none", border: "none", cursor: "pointer" }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <p style={{ fontFamily: "Cormorant, serif", fontSize: "1.3rem", fontWeight: 300, color: "var(--graphite)", lineHeight: 1.4, opacity: openFaq === i ? 1 : 0.85 }}>
                    {item.q}
                  </p>
                  <span style={{ color: "var(--indigo)", flexShrink: 0, marginTop: "4px", transition: "transform 0.3s ease", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)", display: "block" }}>
                    <Icon name="Plus" size={16} />
                  </span>
                </button>
                <div style={{ maxHeight: openFaq === i ? "300px" : "0", overflow: "hidden", transition: "max-height 0.4s ease, opacity 0.3s ease", opacity: openFaq === i ? 1 : 0 }}>
                  <p style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.85rem", lineHeight: 1.9, color: "var(--graphite-light)", paddingBottom: "2rem", paddingRight: "3rem" }}>
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--rule)" }} />
          </div>
        </div>
      </AnimSection>

      {/* CONTACT */}
      <AnimSection id="contact" style={{ borderTop: "1px solid var(--rule)", backgroundColor: "var(--graphite)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 4rem" }}>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(245,242,238,0.35)", marginBottom: "2rem" }}>
                Контакты
              </p>
              <h2 style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, lineHeight: 1.25, color: "var(--cream)", marginBottom: "1.5rem" }}>
                Запросить<br />установочную встречу
              </h2>
              <p style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.85rem", lineHeight: 1.9, color: "rgba(245,242,238,0.5)", marginBottom: "3rem" }}>
                Установочная встреча — 30 минут. Это возможность понять контекст
                и формат предстоящей работы. Бесплатно.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <a href="mailto:anna@uvarova.pro" style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "rgba(245,242,238,0.45)", textDecoration: "none", transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <Icon name="Mail" size={14} />
                  <span style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.85rem" }}>anna@uvarova.pro</span>
                </a>
                <a href="tel:+79991234567" style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "rgba(245,242,238,0.45)", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <Icon name="Phone" size={14} />
                  <span style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.85rem" }}>+7 999 123-45-67</span>
                </a>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { type: "text", placeholder: "Имя" },
                { type: "text", placeholder: "Telegram / WhatsApp" },
              ].map((field, i) => (
                <input
                  key={i}
                  type={field.type}
                  placeholder={field.placeholder}
                  style={{
                    width: "100%",
                    backgroundColor: "transparent",
                    borderBottom: "1px solid rgba(216,211,204,0.25)",
                    padding: "1rem 0",
                    fontFamily: "IBM Plex Sans, sans-serif",
                    fontSize: "0.85rem",
                    color: "var(--cream)",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderBottomColor = "rgba(216,211,204,0.7)")}
                  onBlur={(e) => (e.target.style.borderBottomColor = "rgba(216,211,204,0.25)")}
                />
              ))}
              <textarea
                rows={4}
                placeholder="Кратко о запросе (необязательно)"
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  borderBottom: "1px solid rgba(216,211,204,0.25)",
                  padding: "1rem 0",
                  fontFamily: "IBM Plex Sans, sans-serif",
                  fontSize: "0.85rem",
                  color: "var(--cream)",
                  outline: "none",
                  resize: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderBottomColor = "rgba(216,211,204,0.7)")}
                onBlur={(e) => (e.target.style.borderBottomColor = "rgba(216,211,204,0.25)")}
              />
              <div style={{ paddingTop: "1rem" }}>
                <button
                  style={{
                    width: "100%",
                    backgroundColor: "var(--cream)",
                    color: "var(--graphite)",
                    fontFamily: "IBM Plex Sans, sans-serif",
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    padding: "16px 32px",
                    border: "none",
                    cursor: "pointer",
                    transition: "opacity 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Отправить запрос
                </button>
              </div>
            </div>
          </div>
        </div>
      </AnimSection>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(216,211,204,0.12)", backgroundColor: "var(--graphite)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.5rem 4rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontFamily: "Cormorant, serif", fontSize: "1rem", letterSpacing: "0.18em", color: "rgba(245,242,238,0.25)" }}>A·U</p>
          <p style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.7rem", color: "rgba(245,242,238,0.2)" }}>© 2024 Анна Уварова</p>
        </div>
      </footer>
    </div>
  );
}
