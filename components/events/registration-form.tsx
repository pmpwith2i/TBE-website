"use client";

import { useMemo, useState, type FormEvent } from "react";
import { CRONOSCALATA } from "@/constants/events";
import { useClientPair } from "@/lib/use-client-value";

const R = CRONOSCALATA.registration;

export function RegistrationForm() {
  const [sesso, setSesso] = useState("");

  // Client-only antispam captcha (a + b). 0/0 until mounted.
  const captcha = useClientPair();

  // Filter categories by the selected gender suffix (-M / -W), like the original.
  const categories = useMemo(() => {
    const suffix =
      sesso === "Maschile" ? "-M" : sesso === "Femminile" ? "-W" : null;
    if (!suffix) return R.categories;
    return R.categories.filter((c) => c.endsWith(suffix));
  }, [sesso]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const expected = captcha.a + captcha.b;
    if (parseInt(data.txtCaptcha ?? "", 10) !== expected) {
      alert("La verifica antispam non è corretta. Riprova.");
      return;
    }
    alert(
      `Iscrizione registrata!\n\n${data.txtNome} ${data.txtCognome}\n` +
        `Categoria: ${data.ddlCategoria}\n` +
        `Tessera: ${data.ddlTipoTessera} n° ${data.txtNumeroTessera}\n\n` +
        `Modulo di esempio — in produzione i dati verranno inviati al gestionale.`
    );
  }

  const numStyle: React.CSSProperties = {
    color: "var(--accent)",
    fontFamily: "var(--font-display)",
    fontStyle: "italic",
    fontWeight: 900,
    fontSize: 20,
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="display display-m" style={{ marginBottom: 8 }}>
        {R.formTitle}
      </h3>
      <p style={{ opacity: 0.65, fontSize: 14, marginBottom: 32 }}>
        I campi contrassegnati con <span className="req">*</span> sono
        obbligatori.
      </p>

      <div className="form-grid">
        <div className="field">
          <label>
            Nome <span className="req">*</span>
          </label>
          <input name="txtNome" type="text" required />
        </div>
        <div className="field">
          <label>
            Cognome <span className="req">*</span>
          </label>
          <input name="txtCognome" type="text" required />
        </div>

        <div className="field">
          <label>
            Email <span className="req">*</span>
          </label>
          <input name="txtEmail" type="email" required />
        </div>
        <div className="field">
          <label>
            Telefono <span className="req">*</span>
          </label>
          <input name="txtTelefono" type="tel" required />
        </div>

        <div className="field">
          <label>
            Anno di nascita <span className="req">*</span>
          </label>
          <input
            name="txtAnnoNascita"
            type="number"
            min={1930}
            max={2012}
            placeholder="es. 1985"
            required
          />
        </div>
        <div className="field">
          <label>
            Sesso <span className="req">*</span>
          </label>
          <select
            name="ddlSesso"
            required
            value={sesso}
            onChange={(e) => setSesso(e.target.value)}
          >
            <option value="">Seleziona</option>
            <option value="Maschile">Maschile</option>
            <option value="Femminile">Femminile</option>
          </select>
        </div>

        <div className="field full">
          <label>
            Categoria <span className="req">*</span>
          </label>
          <select name="ddlCategoria" required defaultValue="">
            <option value="">Seleziona categoria</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="field-hint">
            L&apos;elenco si filtra in base al sesso selezionato.
          </div>
        </div>

        <div className="field">
          <label>
            Tipo tessera <span className="req">*</span>
          </label>
          <select name="ddlTipoTessera" required defaultValue="">
            <option value="">Seleziona</option>
            {R.tessere.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>
            Numero tessera <span className="req">*</span>
          </label>
          <input name="txtNumeroTessera" type="text" required />
        </div>

        <div className="field full">
          <label>
            Società <span className="req">*</span>
          </label>
          <input
            name="txtSocieta"
            type="text"
            placeholder={'Es. "Teramo Bike Experience" o "Individuale"'}
            required
          />
        </div>

        <div className="field full">
          <label>
            Verifica antispam: quanto fa{" "}
            <span style={numStyle}>{captcha.a || "—"}</span> +{" "}
            <span style={numStyle}>{captcha.b || "—"}</span> ?{" "}
            <span className="req">*</span>
          </label>
          <input
            name="txtCaptcha"
            type="number"
            required
            style={{ maxWidth: 200 }}
          />
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <label
          style={{
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            fontSize: 14,
            opacity: 0.9,
            cursor: "pointer",
          }}
        >
          <input
            name="chkPrivacy"
            type="checkbox"
            required
            style={{
              marginTop: 4,
              accentColor: "var(--accent)",
              width: 18,
              height: 18,
            }}
          />
          <span>
            Autorizzo il trattamento dei miei dati personali ai fini
            dell&apos;iscrizione alla gara, ai sensi del Regolamento UE 2016/679
            GDPR. <span className="req">*</span>
          </span>
        </label>
      </div>

      <div
        style={{
          marginTop: 48,
          paddingTop: 32,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div className="caption" style={{ color: "rgba(255,255,255,0.5)" }}>
            {R.feeLabel}
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 900,
              fontSize: 48,
              color: "var(--accent)",
              lineHeight: 1,
            }}
          >
            {R.fee}
          </div>
          <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>
            {R.feeNote}
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ fontSize: 18 }}
        >
          {R.submitLabel}
        </button>
      </div>

      <p
        style={{
          opacity: 0.55,
          fontSize: 12,
          marginTop: 24,
          textAlign: "center",
        }}
      >
        {R.footnoteBefore}
        <a
          href={`mailto:${R.footnoteEmail}`}
          style={{ color: "var(--accent)" }}
        >
          {R.footnoteEmail}
        </a>
      </p>
    </form>
  );
}
