/** Method is necessary, because navigator.clipboard.writeText doesn't work on smartphones */
async function copySummary() {
    let textToCopy = document.getElementById("summary-table").innerText;

    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "absolute";
    textArea.style.left = "-999999px";
    document.body.prepend(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
    } catch (error) {
        console.error(error);
    } finally {
        textArea.remove();
    }

    showSuccessMark();
}

function showSuccessMark() {
    const arrow = document.getElementById("success-mark");
    arrow.classList.remove("hidden");
    setTimeout(() => {
        arrow.classList.add("hidden");
    }, 2000);
}
