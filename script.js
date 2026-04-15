const CORRECT_PASSWORD = "你的紀念日數字"; 

// 密碼驗證
function checkPassword() {
    const input = document.getElementById('pw-input').value;
    if (input === CORRECT_PASSWORD) {
        // 隱藏封面
        document.getElementById('password-gate').style.display = 'none';
        // 顯示內容
        const mainContent = document.getElementById('main-content');
        mainContent.style.display = 'block';
        
        // 執行渲染
        render();
        
        // 自動捲動到頂部，避免看到一半的內容
        window.scrollTo(0, 0);
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
}

// 監聽 Enter 鍵
document.addEventListener('DOMContentLoaded', () => {
    
    const pwInput = document.getElementById('pw-input');
    
    if (pwInput) {
        // 使用 keyup 通常比 keypress 更穩定
        pwInput.addEventListener('keyup', function (e) {
            // 檢查是否按下 Enter (代碼 13 或字串 "Enter")
            if (e.key === 'Enter' || e.keyCode === 13) {
                e.preventDefault(); // 防止某些瀏覽器的預設行為
                checkPassword();
            }
        });
    }
});

const couponData = [
    { id: 1, title: "全身精油按摩 60min", desc: "有效解除一整天的疲勞，含肩頸加強。" },
    // ... 其他 19 張券 ...
];

function render() {
    const activeContainer = document.getElementById('active-coupons');
    const usedContainer = document.getElementById('used-coupons');
    
    activeContainer.innerHTML = '';
    usedContainer.innerHTML = '';

    const usedIds = JSON.parse(localStorage.getItem('usedCoupons') || '[]');

    couponData.forEach(coupon => {
        const isUsed = usedIds.includes(coupon.id);
        const couponHTML = `
            <div class="coupon ${isUsed ? 'used' : ''}">
                <div class="stamp">Archive / Used</div>
                <div class="coupon-content">
                    <div class="coupon-title">${coupon.title}</div>
                    <div class="coupon-desc">${coupon.desc}</div>
                </div>
                ${isUsed ? '' : `<button onclick="useCoupon(${coupon.id})">Redeem</button>`}
            </div>
        `;
        if (isUsed) {
            usedContainer.innerHTML += couponHTML;
        } else {
            activeContainer.innerHTML += couponHTML;
        }
    });
}

window.useCoupon = function(id) {
    if(confirm("Confirm redemption?")) {
        let usedIds = JSON.parse(localStorage.getItem('usedCoupons') || '[]');
        usedIds.push(id);
        localStorage.setItem('usedCoupons', JSON.stringify(usedIds));
        render();
    }
}