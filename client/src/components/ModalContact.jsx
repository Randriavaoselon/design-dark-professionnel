import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "../styles/ModalContact.css";

const INITIAL_FORM = { name: "", email: "", message: "" };

const ModalContact = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  // Lock body scroll + restore focus + close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") trapFocus(e);
    };

    const trapFocus = (e) => {
      const focusable = dialogRef.current?.querySelectorAll(
        "input, textarea, button"
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  // Reset internal state whenever the modal is reopened
  useEffect(() => {
    if (isOpen) {
      setFormData(INITIAL_FORM);
      setErrors({});
      setStatus("idle");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = (data) => {
    const next = {};
    if (!data.name.trim()) next.name = "Le nom est requis.";
    if (!data.email.trim()) {
      next.email = "L'email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      next.email = "Format d'email invalide.";
    }
    if (!data.message.trim() || data.message.trim().length < 10) {
      next.message = "Le message doit contenir au moins 10 caractères.";
    }
    return next;
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && status !== "loading") onClose();
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const validationErrors = validate(formData);
  //   setErrors(validationErrors);
  //   if (Object.keys(validationErrors).length > 0) return;

  //   setStatus("loading");
  //   try {
  //      const response = await fetch("http://localhost:5000/api/contact", {
  //     // const response = await fetch(
  //     //   `${import.meta.env.VITE_API_URL}/api/contact`,
  //     //   {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(formData),
  //       }
  //     );

  //     if (!response.ok) throw new Error("Request failed");

  //     setStatus("success");
  //     setTimeout(() => {
  //       onClose();
  //     }, 1600);
  //   } catch (error) {
  //     console.error("Erreur:", error);
  //     setStatus("error");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
  
    setStatus("loading");
    try {
      const apiUrl = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) throw new Error("Request failed");
  
      setStatus("success");
      setTimeout(() => {
        onClose();
      }, 1600);
    } catch (error) {
      console.error("Erreur:", error);
      setStatus("error");
    }
  };

  return createPortal(
    <div
      className="contact-modal"
      onMouseDown={handleOverlayClick}
      role="presentation"
    >
      <div
        className="contact-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        ref={dialogRef}
      >
        <div className="contact-modal__glow" aria-hidden="true" />

        <button
          type="button"
          onClick={onClose}
          className="contact-modal__close"
          aria-label="Fermer la fenêtre de contact"
          disabled={status === "loading"}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {status === "success" ? (
          <div className="contact-modal__result contact-modal__result--success">
            <div className="contact-modal__result-icon">
              <svg
                viewBox="0 0 52 52"
                width="56"
                height="56"
                aria-hidden="true"
              >
                <circle
                  className="contact-modal__check-circle"
                  cx="26"
                  cy="26"
                  r="24"
                  fill="none"
                />
                <path
                  className="contact-modal__check-mark"
                  fill="none"
                  d="M14 27l7 7 16-16"
                />
              </svg>
            </div>
            <h3>Message envoyé !</h3>
            <p>Merci, nous revenons vers vous très vite.</p>
          </div>
        ) : (
          <>
            <header className="contact-modal__header">
              <span className="contact-modal__eyebrow">Prenons contact</span>
              <h2 id="contact-modal-title">Écrivez-nous un message</h2>
              <p className="contact-modal__subtitle">
                Réponse sous 24 à 48h ouvrées.
              </p>
            </header>

            <form
              className={`contact-modal__form${
                status === "error" ? " contact-modal__form--shake" : ""
              }`}
              onSubmit={handleSubmit}
              noValidate
            >
              <div
                className={`contact-modal__field${
                  formData.name ? " contact-modal__field--filled" : ""
                }${errors.name ? " contact-modal__field--error" : ""}`}
              >
                <input
                  id="cm-name"
                  ref={firstFieldRef}
                  type="text"
                  placeholder=" "
                  value={formData.name}
                  onChange={handleChange("name")}
                  disabled={status === "loading"}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "cm-name-error" : undefined}
                />
                <label htmlFor="cm-name">Nom</label>
                {errors.name && (
                  <span className="contact-modal__error" id="cm-name-error">
                    {errors.name}
                  </span>
                )}
              </div>

              <div
                className={`contact-modal__field${
                  formData.email ? " contact-modal__field--filled" : ""
                }${errors.email ? " contact-modal__field--error" : ""}`}
              >
                <input
                  id="cm-email"
                  type="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange("email")}
                  disabled={status === "loading"}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "cm-email-error" : undefined}
                />
                <label htmlFor="cm-email">Email</label>
                {errors.email && (
                  <span className="contact-modal__error" id="cm-email-error">
                    {errors.email}
                  </span>
                )}
              </div>

              <div
                className={`contact-modal__field contact-modal__field--textarea${
                  formData.message ? " contact-modal__field--filled" : ""
                }${errors.message ? " contact-modal__field--error" : ""}`}
              >
                <textarea
                  id="cm-message"
                  placeholder=" "
                  rows={4}
                  value={formData.message}
                  onChange={handleChange("message")}
                  disabled={status === "loading"}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "cm-message-error" : undefined
                  }
                />
                <label htmlFor="cm-message">Message</label>
                {errors.message && (
                  <span className="contact-modal__error" id="cm-message-error">
                    {errors.message}
                  </span>
                )}
              </div>

              {status === "error" && (
                <div
                  className="contact-modal__banner contact-modal__banner--error"
                  role="alert"
                >
                  Une erreur est survenue. Merci de réessayer.
                </div>
              )}

              <button
                type="submit"
                className="contact-modal__submit"
                disabled={status === "loading"}
              >
                <span className="contact-modal__submit-label">
                  {status === "loading"
                    ? "Envoi en cours…"
                    : "Envoyer le message"}
                </span>
                {status === "loading" && (
                  <span className="contact-modal__spinner" aria-hidden="true" />
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ModalContact;
