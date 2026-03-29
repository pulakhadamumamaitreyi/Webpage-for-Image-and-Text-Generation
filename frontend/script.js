const API = "http://localhost:3000";

/* 🔹 TEXT ENHANCE */
async function enhanceText() {
    const prompt = document.getElementById("prompt").value;

    const res = await fetch(API + "/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
    });

    const data = await res.json();

    const enhanced = data.choices[0].message.content;
    document.getElementById("enhancedText").innerText = enhanced;
}

/* 🔹 IMAGE GENERATE */
async function generateImage() {
    const prompt = document.getElementById("enhancedText").innerText;

    const res = await fetch(API + "/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
    });

    const data = await res.json();

    document.getElementById("outputImage").src =
        data.data[0].url;
}

/* 🔹 IMAGE ANALYSIS */
async function analyzeImage() {
    const file = document.getElementById("imageUpload").files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
        const base64 = reader.result;

        const res = await fetch(API + "/analyze-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ base64 })
        });

        const data = await res.json();

        document.getElementById("imageResult").innerText =
            data.choices[0].message.content;
    };
}
