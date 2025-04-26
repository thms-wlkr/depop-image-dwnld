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
    const productName = document.querySelector('h1')?.innerText.trim() || "depop-image";

    const gallery = document.querySelector('[data-testid="product-image-gallery"]');
    const images = gallery ? gallery.querySelectorAll('img') : [];

    if (images.length === 0) {
        alert('No product images found!');
        return;
    }

    let index = 1;
    images.forEach(img => {
        const url = img.src;
        if (url && (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png'))) {
            chrome.runtime.sendMessage({
                url: url,
                filename: `${productName.replace(/\s+/g, '_')}_${index}.jpg`
            });
            index++;
        }
    });

    if (index === 1) {
        alert('No valid images found!');
    }
});
