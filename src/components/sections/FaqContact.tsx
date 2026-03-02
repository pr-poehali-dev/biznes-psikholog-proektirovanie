import { useState } from "react";
import Icon from "@/components/ui/icon";
import { FAQ_ITEMS, useAnimSection } from "./shared";

interface FaqContactProps {
  scrollTo: (id: string) => void;
}

export default function FaqContact({ scrollTo }: FaqContactProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faq = useAnimSection();
  const contact = useAnimSection();

  return (
    <>
      {/* FAQ */}
      <section
        id="faq"
        ref={faq.ref}
        style={{ borderTop: "1px solid var(--rule)", backgroundColor: "#EFECE8", ...faq.style }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }} className="section-pad">
          <p style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--graphite-light)", marginBottom: "3rem" }}>
            Вопросы и ответы
          </p>
          <div style={{ maxWidth: "700px" }}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} style={{ borderTop: "1px solid var(--rule)" }}>
                <button
                  style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "1.5rem 0", textAlign: "left", gap: "1rem", background: "none", border: "none", cursor: "pointer" }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <p style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)", fontWeight: 300, color: "var(--graphite)", lineHeight: 1.4, opacity: openFaq === i ? 1 : 0.85 }}>
                    {item.q}
                  </p>
                  <span style={{ color: "var(--indigo)", flexShrink: 0, marginTop: "4px", transition: "transform 0.3s ease", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)", display: "block" }}>
                    <Icon name="Plus" size={16} />
                  </span>
                </button>
                <div style={{ maxHeight: openFaq === i ? "400px" : "0", overflow: "hidden", transition: "max-height 0.4s ease, opacity 0.3s ease", opacity: openFaq === i ? 1 : 0 }}>
                  <p style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.85rem", lineHeight: 1.9, color: "var(--graphite-light)", paddingBottom: "2rem", paddingRight: "1rem" }}>
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--rule)" }} />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        ref={contact.ref}
        style={{ borderTop: "1px solid var(--rule)", backgroundColor: "var(--graphite)", ...contact.style }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }} className="section-pad">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div>
              <p style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(245,242,238,0.35)", marginBottom: "2rem" }}>
                Контакты
              </p>
              <h2 style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, lineHeight: 1.25, color: "var(--cream)", marginBottom: "1.5rem" }}>
                Запросить<br />установочную встречу
              </h2>
              <p style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.85rem", lineHeight: 1.9, color: "rgba(245,242,238,0.5)", marginBottom: "3rem" }}>
                Установочная встреча — 50 минут. Это возможность понять контекст
                и формат предстоящей работы.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <a
                  href="mailto:anna.uvarova2012@yandex.ru"
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "rgba(245,242,238,0.45)", textDecoration: "none", transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <Icon name="Mail" size={14} />
                  <span style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.85rem", wordBreak: "break-all" }}>anna.uvarova2012@yandex.ru</span>
                </a>
                <a
                  href="tel:+79269191718"
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "rgba(245,242,238,0.45)", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <Icon name="Phone" size={14} />
                  <span style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.85rem" }}>+7 926 919-17-18</span>
                </a>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", color: "rgba(245,242,238,0.45)" }}>
                  <Icon name="MapPin" size={14} />
                  <span style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.85rem" }}>Москва, Цветной б-р. 26 стр. 1</span>
                </div>
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
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(216,211,204,0.12)", backgroundColor: "var(--graphite)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }} className="footer-inner">
          <p style={{ fontFamily: "Cormorant, serif", fontSize: "1rem", letterSpacing: "0.18em", color: "rgba(245,242,238,0.25)" }}>A·U</p>
          <p style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.65rem", color: "rgba(245,242,238,0.25)", textAlign: "center" }}>
            ИП Уварова А. С. · ОГРНИП 322508100398078 · Права защищены
          </p>
          <p style={{ fontFamily: "IBM Plex Sans, sans-serif", fontSize: "0.7rem", color: "rgba(245,242,238,0.2)" }}>© 2024 Анна Уварова</p>
        </div>
      </footer>
    </>
  );
}