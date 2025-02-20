function updateTextStyle() {
    const textInput = document.getElementById("textInput").value;
    const result = document.getElementById("textResult");
    const fontStyle = document.getElementById("fontStyleDropdown").value;
    const fontSize = document.getElementById("fontSizeDropdown").value;
    const fontColor = document.getElementById("fontColorPicker").value;

    result.style.fontFamily = fontStyle;
    result.style.fontSize = fontSize;
    result.style.color = fontColor;
    result.innerHTML = textInput; // Show updated content
}

    function applyStyle(style) {
    const textInput = document.getElementById("textInput");
    const result = document.getElementById("textResult");
    let text = textInput.value;

    // Get the selected text
    const start = textInput.selectionStart;
    const end = textInput.selectionEnd;
    const selectedText = text.slice(start, end);

    // Apply the selected style to the selected text
    let formattedText;
    if (style === "bold") formattedText = `<b>${selectedText}</b>`;
    if (style === "italic") formattedText = `<i>${selectedText}</i>`;
    if (style === "underline") formattedText = `<u>${selectedText}</u>`;

    // Update the textarea and result with formatted text
    textInput.value = text.slice(0, start) + formattedText + text.slice(end);
    result.innerHTML = textInput.value;
}

    function alignText(alignment) {
        document.getElementById("textResult").style.textAlign = alignment;
    }

    function addList(type) {
        const textInput = document.getElementById("textInput").value.split('\n');
        const result = document.getElementById("textResult");

        if (type === 'unordered') {
            result.innerHTML = '<ul>' + textInput.map(line => `<li>${line}</li>`).join('') + '</ul>';
        } else if (type === 'ordered') {
            result.innerHTML = '<ol>' + textInput.map(line => `<li>${line}</li>`).join('') + '</ol>';
        }
    }

    function replaceText() {
        const findText = document.getElementById("findText").value;
        const replaceText = document.getElementById("replaceText").value;
        const result = document.getElementById("textResult");

        if (findText) {
            const textContent = result.innerHTML;
            const regex = new RegExp(findText, "g");
            result.innerHTML = textContent.replace(regex, replaceText);
        }
    }

    function loadFile() {
        const fileInput = document.getElementById('fileInput');
        const textInput = document.getElementById("textInput");
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            textInput.value = e.target.result;
            updateTextStyle();
        };
        reader.readAsText(file);
    }
let debounceTimer;

function debounce(callback, delay) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(callback, delay);
}

function updateTextStyle() {
    const textInput = document.getElementById("textInput").value;
    const result = document.getElementById("textResult");
    const fontStyle = document.getElementById("fontStyleDropdown").value;
    const fontSize = document.getElementById("fontSizeDropdown").value;
    const fontColor = document.getElementById("fontColorPicker").value;

    // Check if text length is large
    if (textInput.length > 10000) {
        result.innerText = "Text is too large to preview. Download the text to see full formatting.";
        result.style.fontFamily = fontStyle;
        result.style.fontSize = fontSize;
        result.style.color = fontColor;
        return;
    }
    
    // Debounce rendering to prevent slowdowns
    debounce(() => {
        result.style.fontFamily = fontStyle;
        result.style.fontSize = fontSize;
        result.style.color = fontColor;
        result.innerHTML = textInput;
    }, 300);
};

// Ensure both PC and mobile compatibility with click and touchstart events
document.addEventListener("DOMContentLoaded", function() {
    const clipboard = new ClipboardJS('#copyButton');
    clipboard.on('success', function(e) {
        alert('Text copied to clipboard!');
        e.clearSelection();
    });
    clipboard.on('error', function(e) {
        alert('Failed to copy text.');
    });
    

    // Download file function
    document.getElementById("downloadButton").addEventListener("click", function downloadFile() {
        const textResult = document.getElementById("textResult").innerText;
        const blob = new Blob([textResult], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "formatted_text.txt";
        a.click();
        URL.revokeObjectURL(url); // Clean up
    });
});

document.getElementById("downloadButton").addEventListener("click", downloadFile);
document.getElementById("downloadButton").addEventListener("touchstart", downloadFile);

// home page design
    // FAQ Toggle Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener("click", function () {
        this.nextElementSibling.classList.toggle("active");
    });
});

