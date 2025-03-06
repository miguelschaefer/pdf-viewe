"use client"

import React, { useState } from "react";

const PdfViewer: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBase64Input = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const base64String = event.target.value.trim();

    // Verifica e remove o prefixo, se presente
    const base64Data = base64String.includes("base64,")
      ? base64String.split("base64,")[1]
      : base64String;

    try {
      // Converter Base64 para Blob
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Uint8Array([...byteCharacters].map((char) => char.charCodeAt(0)));
      const blob = new Blob([byteNumbers], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setPdfUrl(url);
      setError(null); // Limpa erros se a conversão for bem-sucedida
    } catch (e) {
      setError("Erro ao processar o arquivo. Verifique se a string Base64 é válida.");
      setPdfUrl(null);
    }
  };

  return (
    <div>
      <h2>Visualizador de PDF</h2>
      <textarea
        placeholder="Cole aqui o código Base64 do PDF"
        onChange={handleBase64Input}
        rows={5}
        style={{ width: "100%" }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          title="PDF Viewer"
          width="100%"
          height="800px"
          style={{ border: "none", marginTop: "20px" }}
        ></iframe>
      )}
    </div>
  );
};

export { PdfViewer };
