// Create the download button
const downloadButton = document.createElement('button');
downloadButton.innerText = "Download Images";
downloadButton.style.position = 'fixed';
downloadButton.style.top = '20px';
downloadButton.style.right = '20px';
downloadButton.style.zIndex = '9999';
downloadButton.style.padding = '10px 20px';
downloadButton.style.backgroundColor = '#FF5757';
downloadButton.style.color = 'white';
downloadButton.style.border = 'none';
downloadButton.style.borderRadius = '5px';
downloadButton.style.cursor = 'pointer';
downloadButton.style.fontSize = '16px';
downloadButton.style.boxShadow = '0px 2px 6px rgba(0,0,0,0.3)';

document.body.appendChild(downloadButton);

downloadButton.addEventListener('click', () => {
    // Try to extract product name
    let productName = document.querySelector('h1')?.innerText.trim() || "depop-image";

    // Find main product images (usually inside some known container)
    const imageElements = document.querySelectorAll('img');

    let index = 1;
    imageElements.forEach(img => {
        const url = img.src;

        // Filter: only grab big, real images (skip icons, small images, etc.)
        if (url.includes('cloudfront') && url.endsWith('.jpg')) {
            chrome.runtime.sendMessage({
                url: url,
                filename: `${productName.replace(/\s+/g, '_')}_${index}.jpg`
            });
            index++;
        }
    });

    if (index === 1) {
        alert('No product images found!');
    }
});
