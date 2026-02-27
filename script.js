document.addEventListener('DOMContentLoaded', function() {
    
    // ======================================================
    // 1. GIAO DIỆN CHUNG (MENU MOBILE & HEADER)
    // ======================================================
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.getElementById('main-header');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('is-active');
        });
    }

    let lastScrollTop = 0;
    window.addEventListener("scroll", function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // --- LOGIC 1: Ẩn/hiện header khi cuộn xuống/lên (Code cũ của bạn) ---
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        // --- LOGIC 2: Đổi màu kính mờ khi không ở đầu trang (Code mới) ---
        if (scrollTop > 50) {
            header.classList.add('scrolled'); // Thêm kính mờ
        } else {
            header.classList.remove('scrolled'); // Trở về trắng đặc
        }
    });

    // (Giữ nguyên các đoạn code chức năng khác ở dưới của bạn...)
// ... Giữ nguyên phần Code Menu và Countdown bên trên ...

 // ĐÂY LÀ DẤU NGOẶC ĐÓNG CỦA DOMContentLoaded - HÃY DÁN CODE DƯỚI ĐÂY SAU DẤU NÀY

// ======================================================
// YOUTUBE API - PHẢI ĐỂ NGOÀI ĐỂ LÀ HÀM TOÀN CỤC
// ======================================================
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: 'M7lc1UVf-VE', // Thử thay bằng 'M7lc1UVf-VE' để test nếu vẫn đen
        playerVars: {
        'enablejsapi': 1,
        /* CỰC KỲ QUAN TRỌNG: 
           Sử dụng window.location.origin để tự động lấy link web online của bạn */
        'origin': window.location.origin 
    },
        events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady(event) {
    console.log("YouTube Player Ready!");
}

function onPlayerError(event) {
    console.log("YouTube Error: " + event.data);
}
    
    // ======================================================
    // 2. ĐỒNG HỒ SỰ KIỆN (ĐẾM NGƯỢC)
    // ======================================================
    const eventDate = new Date("2027-06-19T18:00:00").getTime();
    
    if(document.getElementById("days")) {
        setInterval(function() {
            const now = new Date().getTime();
            const distance = eventDate - now;

            const d = Math.floor(distance / (1000 * 60 * 60 * 24));
            const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distance % (1000 * 60)) / 1000);

            if(document.getElementById("days")) document.getElementById("days").innerText = d < 10 ? "0" + d : d;
            if(document.getElementById("hours")) document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
            if(document.getElementById("minutes")) document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
            if(document.getElementById("seconds")) document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
        }, 1000);
    }

    // ======================================================
    // 3. XỬ LÝ LOẠI VÉ & FORM NGƯỜI THỨ 2 (QUAN TRỌNG)
    // ======================================================
    const ticketTypeSelect = document.getElementById('ticketType');
    const totalSpan = document.getElementById('totalAmount');
    const secondPersonSection = document.getElementById('secondPersonSection');
    
    // Các ô input của người thứ 2
    const inputName2 = document.getElementById('fullname2');
    const inputMSSV2 = document.getElementById('studentID2');
    const inputEmail2 = document.getElementById('email2');

    // Hàm xử lý khi đổi loại vé
    function handleTicketChange() {
        if (!ticketTypeSelect) return;

        // 1. Cập nhật giá tiền hiển thị
        const price = parseInt(ticketTypeSelect.options[ticketTypeSelect.selectedIndex].getAttribute('data-price'));
        if(totalSpan) totalSpan.innerText = new Intl.NumberFormat('vi-VN').format(price);

        // 2. Ẩn/Hiện form người thứ 2
        const type = ticketTypeSelect.value;
        
        if (type === 'couple') {
            // Hiện form người 2
            if(secondPersonSection) secondPersonSection.style.display = 'block';
            
            // BẮT BUỘC điền thông tin người 2 (Thêm thuộc tính required)
            if(inputName2) inputName2.setAttribute('required', 'true');
            if(inputMSSV2) inputMSSV2.setAttribute('required', 'true');
            if(inputEmail2) inputEmail2.setAttribute('required', 'true');
        } else {
            // Ẩn form người 2
            if(secondPersonSection) secondPersonSection.style.display = 'none';
            
            // BỎ bắt buộc điền (Xóa thuộc tính required)
            if(inputName2) inputName2.removeAttribute('required');
            if(inputMSSV2) inputMSSV2.removeAttribute('required');
            if(inputEmail2) inputEmail2.removeAttribute('required');
            
            // Xóa sạch dữ liệu cũ để tránh gửi nhầm
            if(inputName2) inputName2.value = "";
            if(inputMSSV2) inputMSSV2.value = "";
            if(inputEmail2) inputEmail2.value = "";
        }
    }

    // Gắn sự kiện lắng nghe
    if (ticketTypeSelect) {
        ticketTypeSelect.addEventListener('change', handleTicketChange);
        // Chạy 1 lần ngay khi tải trang để set trạng thái đúng
        handleTicketChange();
    }

    // ======================================================
    // 4. XỬ LÝ THANH TOÁN & GỬI ĐƠN HÀNG (FULL)
    // ======================================================
    const ticketForm = document.getElementById('ticketForm');
    const paymentPopup = document.getElementById('paymentPopup');
    const qrImage = document.getElementById('qrImage');
    const paymentTimerDisplay = document.getElementById('paymentTimer');
    const qrExpiredOverlay = document.getElementById('qrExpiredOverlay');
    const btnRefreshQR = document.getElementById('btnRefreshQR');
    const btnCancel = document.getElementById('btnCancel');
    // Biến lưu bộ đếm
    let paymentCountdownInterval; 
    let checkPaymentInterval;

    // --- Hàm tạo link QR Code ---
    function generateQR() {
        if (!ticketTypeSelect) return null;
        
        // Lấy giá tiền hiện tại (Standard hoặc Couple)
        const currentPrice = ticketTypeSelect.options[ticketTypeSelect.selectedIndex].getAttribute('data-price');
        const mssv = document.getElementById('studentID').value;
        
        if (!mssv) return null;
        
        const contentCK = "PROM " + mssv; // Nội dung CK
        const bankCode = "TECHCOMBANK"; 
        const accNumber = "26102006797979"; // !!! THAY STK CỦA BẠN !!!
        
        return `https://img.vietqr.io/image/${bankCode}-${accNumber}-compact.jpg?amount=${currentPrice}&addInfo=${contentCK}`;
    }

    // --- Hàm đếm ngược 10 phút ---
    function startPaymentTimer(duration) {
        let timer = duration, minutes, seconds;
        
        clearInterval(paymentCountdownInterval); // Reset timer cũ
        if(qrExpiredOverlay) qrExpiredOverlay.style.display = 'none'; // Ẩn lớp che

        paymentCountdownInterval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            if(paymentTimerDisplay) paymentTimerDisplay.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(paymentCountdownInterval);
                if(qrExpiredOverlay) qrExpiredOverlay.style.display = 'flex'; // Hiện lớp che khi hết giờ
            }
        }, 1000);
    }

    // --- Hàm tự động kiểm tra thanh toán (Mỗi 3 giây) ---
    function checkPaymentStatus(contentCK) {
        // !!! THAY LINK SCRIPT CỦA BẠN VÀO ĐÂY !!!
        const scriptURL = 'https://script.google.com/macros/s/AKfycby6wt-EmIobQQ3NQ-w_w-N0tNFlmXaJ9diwvvsnAecjNKtD7bqCa08US1dulVKqFiKaZg/exec'; 
        
        fetch(scriptURL + `?action=check_payment&content=${contentCK}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Nếu thấy tiền vào: Dừng hết đồng hồ & Gửi đơn
                clearInterval(checkPaymentInterval);
                clearInterval(paymentCountdownInterval);
                submitOrderToSheet(); 
            }
        })
        .catch(err => console.log("Đang chờ thanh toán..."));
    }

    // --- Hàm gửi đơn hàng về Google Sheet (UPDATE NGƯỜI 2) ---
    function submitOrderToSheet() {
        // Gom dữ liệu (Bao gồm cả người 2 nếu có)
        const formData = {
            fullname: document.getElementById('fullname').value,
            studentID: document.getElementById('studentID').value,
            email: document.getElementById('email').value,
            ticketType: document.getElementById('ticketType').value,
            total: document.getElementById('totalAmount').innerText,
            
            // Dữ liệu người 2 (Nếu không có thì gửi chuỗi rỗng)
            fullname2: document.getElementById('fullname2') ? document.getElementById('fullname2').value : "",
            studentID2: document.getElementById('studentID2') ? document.getElementById('studentID2').value : "",
            email2: document.getElementById('email2') ? document.getElementById('email2').value : ""
        };

        // !!! THAY LINK SCRIPT CỦA BẠN VÀO ĐÂY !!!
        const scriptURL = 'https://script.google.com/macros/s/AKfycby6wt-EmIobQQ3NQ-w_w-N0tNFlmXaJ9diwvvsnAecjNKtD7bqCa08US1dulVKqFiKaZg/exec'; 

        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(formData)
        })
        .then(() => {
            alert("Thanh toán thành công! Vé điện tử đã được gửi vào email.");
            window.location.href = "index.html";
        })
        .catch(error => {
            alert("Lỗi kết nối: " + error);
        });
    }

    // --- SỰ KIỆN: BẤM NÚT XÁC NHẬN ---
    if (ticketForm) {
        ticketForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Chặn load lại trang
            
            const qrLink = generateQR();
            if(qrLink) {
                // 1. Hiện Popup QR
                qrImage.src = qrLink;
                paymentPopup.style.display = 'flex';
                
                // 2. Chạy đồng hồ 10 phút (600 giây)
                startPaymentTimer(600);

                // 3. Chạy auto check tiền (3 giây/lần)
                const mssv = document.getElementById('studentID').value;
                if(checkPaymentInterval) clearInterval(checkPaymentInterval);
                
                checkPaymentInterval = setInterval(() => {
                    checkPaymentStatus("PROM " + mssv); // Tìm nội dung "PROM [MSSV]"
                }, 3000);
            } else {
                alert("Vui lòng kiểm tra lại thông tin!");
            }
        });
    }

    // --- SỰ KIỆN: LẤY MÃ MỚI ---
    if (btnRefreshQR) {
        btnRefreshQR.addEventListener('click', function() {
            qrImage.style.opacity = '0.5';
            setTimeout(() => qrImage.style.opacity = '1', 300);
            
            const qrLink = generateQR();
            qrImage.src = qrLink;
            startPaymentTimer(600); // Reset lại 10 phút
        });
    }

    // --- SỰ KIỆN: HỦY BỎ ---
    if (btnCancel) {
        btnCancel.addEventListener('click', function() {
            paymentPopup.style.display = 'none';
            clearInterval(paymentCountdownInterval);
            clearInterval(checkPaymentInterval); // Dừng check tiền
        });
    }
});