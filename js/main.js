
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

    const submit_contack = document.querySelector("#submit-contack");

    submit_contack.addEventListener('click', function (e) {
        const inpiut_form_contact_us = document.querySelectorAll(".inpiut-form-contact-us");
        let send = true;
        let toDate = new Date();
        let obj_contack = {
            dateTime: toDate.getDate() + "/" + (toDate.getMonth() + 1) + "/" + toDate.getFullYear(),
            yourName: "",
            yourEmail: "",
            subject: "",
            message: ""
        }
        let method = "GET"; // กำหนด Method ที่จะส่ง
        let URL = "https://script.google.com/macros/s/AKfycbxE6suxB-Rtax1hurILufYl0Gulxo7jnBrhZ7Fq4xbh0zxjcW7hGa_7C7bfk8O7oDJl/exec"; // URL Server google app script API

        inpiut_form_contact_us.forEach(input => {
            if (input.value == "") {
                send = false;
            }
        })

        // send contack API App script
        if (send) {
            obj_contack.yourName = inpiut_form_contact_us[0].value
            obj_contack.yourEmail = inpiut_form_contact_us[1].value;
            obj_contack.subject = inpiut_form_contact_us[2].value;
            obj_contack.message = inpiut_form_contact_us[3].value;

            URL += "?" + new URLSearchParams(obj_contack).toString();

            const block_Spinner = document.querySelector(".block-Spinner");
            const box_alert = document.querySelector('.box-alert');

            block_Spinner.classList.remove("d-none");
            box_alert.innerHTML = '<div class="spinner-border text-info"></div>';

            let xhr = new XMLHttpRequest();
            xhr.open(method, URL, true);

            xhr.onreadystatechange = function () {
                setTimeout(function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let return_data_API = this.responseText;
                        console.log(return_data_API); // รอ server api กลับ
                        box_alert.innerHTML = '<div class="text"><span class="twxt-successfully">ส่งแบบฟอร์มแล้ว</span></div>';
                        setTimeout(function () {
                            block_Spinner.classList.add("d-none");
                            for (let i = 0; i < inpiut_form_contact_us.length; i++) {
                                inpiut_form_contact_us[i].value = "";
                            }
                        }, 2000);
                    } else {
                        box_alert.innerHTML = '<div class="text"><span class="twxt-successfully">ส่งแบบฟอร์มไม่สำเร็จ</span></div>';
                        setTimeout(function () {
                            block_Spinner.classList.add("d-none");
                            for (let i = 0; i < inpiut_form_contact_us.length; i++) {
                                inpiut_form_contact_us[i].value = "";
                            }
                        }, 2000);
                    }
                }, 3000);
            };

            xhr.send();
        } else {
            window.alert("กรุณากรอกข้อมูลในฟอร์มให้ครบ");
        }
    });
    // end form
}
