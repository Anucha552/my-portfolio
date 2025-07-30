
window.onload = function () {

    // start hero
    const titles = ["Web Development", "Back-end"];
    let index = 0;
    let charIndex = 0;
    let typingElement = document.querySelector('.typing');

    function type() {
        if (charIndex < titles[index].length) {
            typingElement.textContent += titles[index].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingElement.textContent = titles[index].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            index = (index + 1) % titles.length;
            setTimeout(type, 500);
        }
    }

    type();
    // end hero

    // start gallery
    const elm_gallery = document.querySelectorAll('.btn-gallery');

    const iso = new Isotope('.all-item-gallery', {
        itemSelector: '.item-gallery',
        layoutMode: 'masonry' // หรือ fitRows
    });

    elm_gallery.forEach(btn => {
        btn.addEventListener('click', function (e) {
            elm_gallery.forEach(b => {
                b.classList.remove('color-bg-btn-active');
            })

            this.classList.add('color-bg-btn-active');
            const filterValue = this.getAttribute('data-filter');
            iso.arrange({ filter: filterValue });
        })
    })
    // end gallery

    // start form

    const submit_contack = document.getElementById('submit-contack');
    const input_form_contact_us = document.getElementsByClassName('input-form-contact-us');
    const block_Spinner = document.getElementsByClassName('block-Spinner')[0];
    const box_alert = document.getElementsByClassName('box-alert')[0];
    const service_ID = 'service_o52q39p'; // service ID ต้องเปลี่ยนเป็นของตัวเอง
    const template__ID = 'template_df0zu02'; // template ID ต้องเปลี่ยนเป็นของตัวเอง

    function sendEmail(serviceID, templateID, dataForm) {
        emailjs.send(serviceID, templateID, dataForm)
            .then(function (response) {
                box_alert.innerHTML = '<div class="text-successfully">ทำการบันทึกข้อมูลของท่านเรียบร้อย</div>'
                setTimeout(function () {
                    block_Spinner.classList.add('d-none');
                    for (let i = 0; i < input_form_contact_us.length; i++) {
                        input_form_contact_us[i].value = "";
                    }
                }, 2000);
            }, function (error) {
                alert("ส่งข้อมูลฟอร์มไม่สำเร็จ: " + error);
            });
    }

    submit_contack.addEventListener('click', function () {

        let send = true;

        for (let i = 0; i < input_form_contact_us.length; i++) {
            if (!input_form_contact_us[i].value.trim()) {
                send = false;
            }
        }

        if (send) {

            block_Spinner.classList.remove('d-none');
            box_alert.innerHTML = '<div class="spinner-border text-info spinner-border"></div>';

            sendEmail(service_ID, template__ID, {
                "dateTime": new Date().toLocaleDateString('th-TH'),
                "yourName": input_form_contact_us[0].value,
                "yourEmail": input_form_contact_us[1].value,
                "subject": input_form_contact_us[2].value,
                "message": input_form_contact_us[3].value
            });
        } else {
            alert('กรุณากรอกข้อมูลให้ครบ');
        }

    });
    // end form
}
