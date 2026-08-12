const API_URL =
  "https://script.google.com/macros/s/AKfycbxU8VNnaouZ3JR7HhVY5SASpem0b4pFudY3EqnomO0rnOsgiIRuEfMH94WwEjLiDyo1YQ/exec";

export async function fetchGoogle(
  action: "mobil" | "motor" | "lain"
) {
  const url = `${API_URL}?action=${action}`;

  console.log("Google API URL:", url);

  try {
    const res = await fetch(url, {
      cache: "no-store",
    });

    console.log("Google API STATUS:", res.status);

    const text = await res.text();

    console.log("Google API RESPONSE:", text);

    // Jangan langsung JSON.parse
    if (!res.ok) {
      throw new Error(
        `Google API error ${res.status}: ${text.slice(0, 200)}`
      );
    }

    // Cek apakah response memang JSON
    const contentType = res.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      throw new Error(
        `Response bukan JSON. Content-Type: ${contentType}. Response: ${text.slice(
          0,
          200
        )}`
      );
    }

    try {
      return JSON.parse(text);
    } catch {
      throw new Error(
        `Response JSON tidak valid: ${text.slice(0, 200)}`
      );
    }
  } catch (error) {
    console.error("fetchGoogle gagal:", error);
    throw error;
  }
}