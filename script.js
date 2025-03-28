document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const jobTitleInput = document.getElementById('jobTitle');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    // Removed photoInput, photoPreview, previewContainer, resizeCanvas
    const generateBtn = document.getElementById('generateBtn');
    const outputContainer = document.getElementById('outputContainer');
    const signaturePreview = document.getElementById('signaturePreview');
    const signatureHtml = document.getElementById('signatureHtml');
    const copyHtmlBtn = document.getElementById('copyHtmlBtn');
    const copySignatureBtn = document.getElementById('copySignatureBtn');
    const copyStatus = document.getElementById('copyStatus');

    // Removed processedPhotoDataUrl variable

    // --- *** YOUR CUSTOMIZATION AREA START *** ---

    // 1. Company Logo URL
    const companyLogoUrl = 'https://gaming.amplitudo.me/images/brand.svg';

    // Removed Photo Resize/Compression Settings

    // 2. Define the HTML Signature Template Function
    function getSignatureTemplate(data) {
        // data now only contains: firstName, lastName, jobTitle, email, phone, logoHtml
        const textStyle = "font-family: Arial, sans-serif; font-size: 10pt; color: #333333; line-height: 1.4;";
        const linkStyle = "color: #0056b3; text-decoration: none;";
        const nameStyle = "font-weight: bold; color: #0056b3; font-size: 11pt; margin: 0;";
        const titleStyle = "font-style: italic; color: #555555; margin: 0 0 5px 0;";
        const labelStyle = "font-weight: bold;";
        // Removed photoCellStyle
        const textCellStyle = "vertical-align: top;";
        const logoContainerStyle = "padding-top: 10px;";
        const logoStyle = "max-width: 150px; height: auto; border: 0; display: block;";

        // Simplified table structure - removed the first <td> for the photo
        return `
<table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; ${textStyle}">
  <tbody>
    <tr>
      <td style="${textCellStyle}">
        <p style="${nameStyle}">${data.firstName} ${data.lastName}</p>
        <p style="${titleStyle}">${data.jobTitle}</p>
        <p style="margin: 0; ${textStyle}">
          <span style="${labelStyle}">P:</span> ${data.phone}<br>
          <span style="${labelStyle}">E:</span> <a href="mailto:${data.email}" style="${linkStyle}">${data.email}</a>
          <!-- <br><span style="${labelStyle}">W:</span> <a href="https://www.yourcompany.com" style="${linkStyle}">www.yourcompany.com</a> -->
        </p>
        ${data.logoHtml ? `<div style="${logoContainerStyle}">${data.logoHtml}</div>` : ''}
      </td>
    </tr>
  </tbody>
</table>
        `;
    }

    // Removed photoImgStyle definition

    // --- *** YOUR CUSTOMIZATION AREA END *** ---


    // --- Event Listeners ---

    // Removed photoInput event listener

    // Generate Button Click
    generateBtn.addEventListener('click', generateSignature);

    // Copy Signature (Preview) Button Click
    copySignatureBtn.addEventListener('click', copySignaturePreview);

    // Copy HTML Code Button Click
    copyHtmlBtn.addEventListener('click', copyHtmlCode);


    // --- Functions ---

    // Removed handlePhotoUpload function
    // Removed resizeAndCompressImage function


    function generateSignature() {
        clearCopyStatus();

        // Simplified employeeData object
        const employeeData = {
            firstName: firstNameInput.value.trim(),
            lastName: lastNameInput.value.trim(),
            jobTitle: jobTitleInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            logoHtml: companyLogoUrl ? `<img src="${companyLogoUrl}" alt="Company Logo" style="max-width: 150px; height: auto; border:0; display: block;">` : ''
            // Removed photoHtml property
        };

        if (!employeeData.firstName || !employeeData.lastName || !employeeData.jobTitle || !employeeData.email || !employeeData.phone) {
            alert('Please fill in all required fields (First Name, Last Name, Job Title, Email, Phone).');
            return;
        }

        // Removed logic for handling photoHtml

        // Generate the final HTML signature using the template
        const finalSignatureHtml = getSignatureTemplate(employeeData);

        // Display the signature preview
        signaturePreview.innerHTML = finalSignatureHtml;

        // Display the raw HTML code
        signatureHtml.value = finalSignatureHtml;

        // Show the output section
        outputContainer.style.display = 'block';
    }


    function copySignaturePreview() {
        clearCopyStatus();
        const range = document.createRange();
        range.selectNodeContents(signaturePreview);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                setCopyStatus('Signature copied successfully!', true);
            } else {
                throw new Error('execCommand failed');
            }
        } catch (err) {
            console.error('Failed to copy signature preview: ', err);
            setCopyStatus('Could not copy signature. Try manual selection or Copy HTML.', false);
        }

        selection.removeAllRanges();
    }


    function copyHtmlCode() {
        clearCopyStatus();
        if (!signatureHtml.value) return;

        signatureHtml.select();
        signatureHtml.setSelectionRange(0, 99999); // For mobile devices

        try {
            navigator.clipboard.writeText(signatureHtml.value).then(() => {
                setCopyStatus('HTML code copied!', true);
            }).catch(err => {
                console.warn('Navigator clipboard failed, trying execCommand: ', err);
                const successful = document.execCommand('copy');
                 if (successful) {
                     setCopyStatus('HTML code copied! (fallback)', true);
                 } else {
                     throw new Error('Fallback execCommand failed');
                 }
            });
        } catch (err) {
            console.error('Failed to copy HTML code: ', err);
            setCopyStatus('Could not copy HTML code automatically.', false);
        }
    }

    function setCopyStatus(message, success) {
        copyStatus.textContent = message;
        copyStatus.style.color = success ? 'green' : 'red';
        setTimeout(clearCopyStatus, 4000);
    }

    function clearCopyStatus() {
        copyStatus.textContent = '';
    }

}); // End DOMContentLoaded