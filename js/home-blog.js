// 블로그 포스트 데이터 (blog.js와 동일)
const posts = [
    {
        title: "첫 번째 포스트",
        date: "2025-10-12",
        category: "일상",
        excerpt: "안녕하세요! 첫 번째 블로그 포스트입니다. 마크다운으로 간단하게 글을 작성할 수 있어요.",
        file: "2025-10-12-first-post.md"
    },
    {
        title: "블로그 시작",
        date: "2025-10-11",
        category: "공지",
        excerpt: "개인 블로그를 시작합니다. 개발 관련 글, 프로젝트 소개, 일상 이야기를 다룰 예정입니다.",
        file: "2025-10-11-welcome.md"
    },
    {
        title: "test",
        date: "2025-10-12",
        category: "test1",
        excerpt: "test로 작성하는 글",
        file: "2025-10-12-test-post.md"
    }
];

// 날짜 순으로 정렬 (최신순)
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

let currentCategory = 'all';

// 포스트 렌더링
function renderPosts(category = 'all') {
    const blogGrid = document.getElementById('blog-posts');

    blogGrid.innerHTML = posts.map(post => `
        <article class="blog-post-card ${category === 'all' || post.category === category ? 'show' : ''}" data-category="${post.category}">
            <h3><a href="blog/post.html?file=${post.file}">${post.title}</a></h3>
            <div class="post-meta">
                <span>📅 ${post.date}</span>
                <span class="category-badge">📁 ${post.category}</span>
            </div>
            <p>${post.excerpt}</p>
            <a href="blog/post.html?file=${post.file}" class="read-more-link">더 읽기</a>
        </article>
    `).join('');
}

// 카테고리 필터
function setupCategoryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 활성 버튼 변경
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 카테고리 필터링
            const category = button.dataset.category;
            currentCategory = category;

            const cards = document.querySelectorAll('.blog-post-card');
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.classList.add('show');
                } else {
                    card.classList.remove('show');
                }
            });
        });
    });
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    setupCategoryFilter();
});
