// 初始化 Swiper 轮播
const swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    }
});

// 初始化 AOS 动画
AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
    offset: 100
});

// 计算在一起的天数
function calculateLoveDays() {
    const startDate = new Date('2024-08-12');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById('days').textContent = diffDays;
}

calculateLoveDays();

// 照片数组
const remainingPhotos = [
    // 所有照片
    '1729565207499.jpg',
    '1729565207479.jpg',
    '1729565207447.jpg',
    '1729565207540.jpg',
    '1729565207529.jpg',
    '1729565207520.jpg',
    '1729565207510.jpg',
    '1729565207416.jpg',
    '1729565207489.jpg',
    '1729565207470.jpg',
    '1729565207403.jpg',
    '1729565207459.jpg',
    '1729565207372.jpg',
    '1729565207438.jpg',
    '1729565207427.jpg',
    '1729565207393.jpg',
    '1729565207353.jpg',
    '1729565207382.jpg',
    '1729565207362.jpg',
    '1729565207335.jpg',
    '1729565207344.jpg',
    '1729565207324.jpg',
    '1729565207308.jpg',
    '1729565207316.jpg',
    '微信图片_20241021193245.jpg'
];

// 初始化照片墙
function initializeGallery() {
    console.log('初始化照片墙...');
    const gallery = document.querySelector('.masonry-grid');
    
    // 清空现有内容
    gallery.innerHTML = `
        <div class="grid-column" id="column1"></div>
        <div class="grid-column" id="column2"></div>
        <div class="grid-column" id="column3"></div>
    `;
}

// 加载照片
function loadPhotos(isInitial = true) {
    console.log('开始加载照片...');
    
    const columns = [
        document.getElementById('column1'),
        document.getElementById('column2'),
        document.getElementById('column3')
    ];
    
    // 检查列是否存在
    if (!columns[0] || !columns[1] || !columns[2]) {
        console.error('找不到照片墙的列元素');
        return;
    }
    
    // 初始加载12张（每列4张），点击加载更多时加载所有
    const photosToLoad = isInitial ? 
        remainingPhotos.splice(0, 12) : 
        remainingPhotos.splice(0, remainingPhotos.length);
    
    console.log('准备加载的照片:', photosToLoad);
    
    if (photosToLoad.length > 0) {
        // 如果是加载更多，给列添加expanded类
        if (!isInitial) {
            columns.forEach(col => col.classList.add('expanded'));
        }
        
        // 按列处理照片，确保每列的照片从上到下依次显示
        const columnPhotos = [[], [], []];
        photosToLoad.forEach((photo, index) => {
            const columnIndex = index % 3;
            columnPhotos[columnIndex].push(photo);
        });
        
        // 为每列创建照片元素
        columnPhotos.forEach((photos, columnIndex) => {
            photos.forEach((photo, rowIndex) => {
                const div = document.createElement('div');
                div.className = 'grid-item';
                
                // 添加渐入动画属性，延迟时间基于行索引
                div.setAttribute('data-aos', 'fade-down');  // 改为向下渐入
                div.setAttribute('data-aos-duration', '800');
                div.setAttribute('data-aos-delay', (rowIndex * 200).toString());  // 增加延迟时间
                
                const img = document.createElement('img');
                img.src = `picture/${photo}`;
                img.alt = "照片";
                img.loading = "lazy";
                
                // 直接添加图片到 div
                div.appendChild(img);
                
                // 添加到对应的列
                columns[columnIndex].appendChild(div);
                
                // 添加点击事件，支持查看大图
                div.addEventListener('click', function() {
                    const viewer = new Viewer(img, {
                        navbar: false,
                        toolbar: {
                            zoomIn: true,
                            zoomOut: true,
                            oneToOne: false,
                            reset: true,
                            prev: false,
                            next: false,
                            rotateLeft: true,
                            rotateRight: true,
                        }
                    });
                    viewer.show();
                });
            });
        });
        
        // 刷新 AOS 动画
        AOS.refresh();
    }
    
    // 如果没有更多照片了，隐藏按钮
    if (remainingPhotos.length === 0) {
        const loadMoreBtn = document.getElementById('loadMore');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }
}

// 页面加载完成后初始化并加载照片
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成...');
    initializeGallery();
    loadPhotos(true);  // 初始加载
});

// 绑定加载更多按钮事件
const loadMoreBtn = document.getElementById('loadMore');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => loadPhotos(false));  // 加载所有剩余照片
}

// 音乐播放控制
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');

// 尝试自动播放
async function tryAutoplay() {
    try {
        // 设置音量为0.3
        bgMusic.volume = 0.3;
        // 尝试播放
        await bgMusic.play();
        musicToggle.classList.add('active');
        console.log('自动播放成功');
    } catch (err) {
        console.log('自动播放失败，需要用户手动播放');
        // 添加提示动画
        musicToggle.classList.add('pulse');
    }
}

// 页面加载完成后尝试自动播放
document.addEventListener('DOMContentLoaded', tryAutoplay);

// 点击播放/暂停
musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.volume = 0.3;  // 设置音量
        bgMusic.play();
        musicToggle.classList.add('active');
        musicToggle.classList.remove('pulse');
    } else {
        bgMusic.pause();
        musicToggle.classList.remove('active');
    }
});

// 留言板功能
const messageForm = document.getElementById('messageForm');
const messagesContainer = document.querySelector('.messages-container');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageForm.querySelector('textarea').value;
    if (message.trim()) {
        addMessage(message);
        messageForm.reset();
    }
});

function addMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerHTML = `
        <p>${text}</p>
        <small>${new Date().toLocaleString()}</small>
    `;
    messagesContainer.prepend(messageDiv);
} 