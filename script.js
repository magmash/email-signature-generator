// File: script.js

document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    const fullNameInput = document.getElementById('fullName');
    const jobTitleInput = document.getElementById('jobTitle');
    const phoneInput = document.getElementById('phone');
    const generateBtn = document.getElementById('generateBtn');
    const outputContainer = document.getElementById('outputContainer');
    const signaturePreview = document.getElementById('signaturePreview');
    const signatureHtml = document.getElementById('signatureHtml');
    const copyHtmlBtn = document.getElementById('copyHtmlBtn');
    const copySignatureBtn = document.getElementById('copySignatureBtn');
    const copyStatus = document.getElementById('copyStatus');
    // *** ADD Reference to Instructions Container ***
    const instructionsContainer = document.getElementById('instructionsContainer');

    // --- *** YOUR CUSTOMIZATION AREA START *** ---

    // 1. Company Logo URL & Style
    const companyLogoUrl = 'https://gaming.amplitudo.me/images/brand.svg';
    const logoStyle = "width: 130px; max-width: 130px; height: auto; border: 0; display: block; margin-bottom: 12px;";

    // 2. Define the HTML Signature Template Function (Remains the same)
    function getSignatureTemplate(data) {
        const baseFont = "font-family: Verdana, Geneva, sans-serif;";
        const nameStyle = `${baseFont} font-size: 14pt; font-weight: 700; color: #211F54; line-height: 1.3; margin: 0 0 1px 0;`;
        const titleStyle = `${baseFont} font-size: 10pt; font-weight: 400; color: #00B9AD; line-height: 1.3; margin: 0 0 12px 0;`;
        const contactStyle = `${baseFont} font-size: 10pt; font-weight: 400; color: #211F54; line-height: 1.4; margin: 0;`;
        const contactLinkStyle = `${contactStyle} color: #211F54; text-decoration: none;`;
        const iconCellStyle = "width: 20px; padding-right: 6px; vertical-align: middle;";
        const iconStyle = `${baseFont} font-size: 10pt; font-weight: 700; color: #00B9AD;`;
        const rightColStyle = `${baseFont} font-size: 10pt; font-weight: 400; color: #211F54; line-height: 1.5; margin: 0 0 4px 0;`;

        const fixedAddress = "Bulevar knjaza Danila Petrovića 13/32,<br>Podgorica, Montenegro";
        const fixedPhoneRight = "+382 20 223 244";

        return `
<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #FFFFFF; max-width: 580px; width: 100%; font-size: 10pt;">
  <tr>
    <td style="padding: 15px; vertical-align: top; width: 58%;">
      <p style="${nameStyle}">${data.fullName}</p>
      <p style="${titleStyle}">${data.jobTitle}</p>
      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
        <tr>
          <td style="${iconCellStyle}"><span style="${iconStyle}">P:</span></td>
          <td style="vertical-align: middle;"><p style="${contactStyle}">${data.phone}</p></td>
        </tr>
         <tr><td colspan="2" style="height: 6px; line-height: 6px;"> </td></tr>
        <tr>
           <td style="${iconCellStyle}"><span style="${iconStyle}">E:</span></td>
           <td style="vertical-align: middle;"><a href="mailto:${data.email}" style="${contactLinkStyle}">${data.email}</a></td>
        </tr>
        <tr><td colspan="2" style="height: 6px; line-height: 6px;"> </td></tr>
         <tr>
           <td style="${iconCellStyle}"><span style="${iconStyle}">A:</span></td>
           <td style="vertical-align: middle;"><p style="${contactStyle}">${fixedAddress}</p></td>
         </tr>
      </table>
    </td>
    <td style="width: 1px; background-color: #EEEEEE;"> </td>
    <td style="padding: 15px; vertical-align: top; width: 40%; text-align: left;">
       ${data.logoHtml ? data.logoHtml : ''}
       <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 12px;">
         <tr>
           <td style="${iconCellStyle}"><span style="${iconStyle}">T:</span></td>
           <td style="vertical-align: middle;"><p style="${contactStyle}">${fixedPhoneRight}</p></td>
         </tr>
       </table>
       <p style="${rightColStyle}">LinkedIn</p>
       <p style="${rightColStyle}">Facebook</p>
       <p style="${rightColStyle}">Instagram</p>
       <p style="${rightColStyle}">Twitter</p>
    </td>
  </tr>
</table>`;
    }
    // --- *** YOUR CUSTOMIZATION AREA END *** ---

    // Helper function to transliterate Montenegrin characters to basic Latin
    function transliterate(text) {
        const charMap = {
            'ć': 'c', 'č': 'c', 'š': 's', 'ž': 'z', 'đ': 'dj',
            'Ć': 'C', 'Č': 'C', 'Š': 'S', 'Ž': 'Z', 'Đ': 'Dj'
        };
        let result = text;
        for (const [key, value] of Object.entries(charMap)) {
            result = result.replace(new RegExp(key, 'g'), value);
        }
        return result;
    }

    // Helper function to capitalize first letter of each word
    function capitalizeFullName(fullName) {
         if (!fullName) return '';
         return fullName.split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(' ');
    }

    // --- Event Listeners ---
    generateBtn.addEventListener('click', generateSignature);
    copySignatureBtn.addEventListener('click', copySignaturePreview);
    copyHtmlBtn.addEventListener('click', copyHtmlCode);

    // --- Functions ---
    function generateSignature() {
        clearCopyStatus();
        console.log("Generate button clicked");

        const fullNameRaw = fullNameInput.value.trim();
        const jobTitle = jobTitleInput.value.trim();
        const phone = phoneInput.value.trim();

        if (!fullNameRaw || !jobTitle || !phone) {
            alert('Please fill in all fields (Full Name, Job Title, Phone Number).');
            return;
        }

        const nameParts = fullNameRaw.split(' ').filter(part => part.length > 0);
        if (nameParts.length < 2) {
            alert('Please enter at least a first name and a surname.');
            return;
        }

        const firstNameForEmail = nameParts[0];
        const surnameForEmail = nameParts[nameParts.length - 1];
        const transliteratedFirstName = transliterate(firstNameForEmail).toLowerCase();
        const transliteratedSurname = transliterate(surnameForEmail).toLowerCase();
        const emailPrefix = `${transliteratedFirstName}.${transliteratedSurname}`;
        const fullEmail = `${emailPrefix}@amplitudo.me`;
        const displayFullName = capitalizeFullName(fullNameRaw);

        const employeeData = {
            fullName: displayFullName,
            jobTitle: jobTitle,
            phone: phone,
            email: fullEmail,
            logoHtml: companyLogoUrl ? `<img src="${companyLogoUrl}" alt="Company Logo" style="${logoStyle}">` : ''
        };

        try {
            const finalSignatureHtml = getSignatureTemplate(employeeData);
            signaturePreview.innerHTML = finalSignatureHtml;
            signatureHtml.value = finalSignatureHtml;

            // *** SHOW BOTH OUTPUT AND INSTRUCTIONS ***
            if (outputContainer) {
                outputContainer.style.display = 'block';
            } else {
                console.error("Output container element not found!");
            }
            if (instructionsContainer) {
                instructionsContainer.style.display = 'block';
            } else {
                console.error("Instructions container element not found!");
            }

        } catch (error) {
             console.error("Error during signature generation:", error);
             alert("An error occurred while generating the signature. Please check the console for details.");
        }
    } // End generateSignature

    // (copySignaturePreview, copyHtmlCode, setCopyStatus, clearCopyStatus functions remain the same)
    function copySignaturePreview() {
        clearCopyStatus();
        const range = document.createRange();
        range.selectNodeContents(signaturePreview);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        try {
            const successful = document.execCommand('copy');
            setCopyStatus(successful ? 'Signature copied successfully!' : 'Failed to copy signature.', successful);
        } catch (err) {
            console.error('Failed to copy signature preview: ', err);
            setCopyStatus('Error copying signature.', false);
        }
        selection.removeAllRanges();
    }

    function copyHtmlCode() {
        clearCopyStatus();
        if (!signatureHtml.value) return;
        signatureHtml.select();
        signatureHtml.setSelectionRange(0, 99999);
        try {
            navigator.clipboard.writeText(signatureHtml.value).then(() => {
                setCopyStatus('HTML code copied!', true);
            }).catch(err => {
                console.warn('Navigator clipboard failed, trying execCommand: ', err);
                const successful = document.execCommand('copy');
                setCopyStatus(successful ? 'HTML code copied! (fallback)' : 'Failed to copy HTML code.', successful);
            });
        } catch (err) {
            console.error('Failed to copy HTML code: ', err);
            setCopyStatus('Error copying HTML code.', false);
        }
    }

    function setCopyStatus(message, success) {
        copyStatus.textContent = message;
        copyStatus.className = `copy-status ${success ? 'success' : 'error'}`;
        setTimeout(clearCopyStatus, 4000);
    }

    function clearCopyStatus() {
        copyStatus.textContent = '';
        copyStatus.className = 'copy-status';
    }

}); // End DOMContentLoaded